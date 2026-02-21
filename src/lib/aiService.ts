// AI Service - Unified interface for multiple AI providers
// Supports OpenAI, Anthropic Claude, and Google Gemini

export type AIProvider = 'openai' | 'anthropic' | 'gemini';

export interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AIStreamChunk {
  text: string;
  done: boolean;
}

export interface AIConfig {
  provider?: AIProvider;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

// Default models for each provider
const DEFAULT_MODELS = {
  openai: 'gpt-4o-mini',
  anthropic: 'claude-3-5-sonnet-20241022',
  gemini: 'gemini-1.5-flash',
};

/**
 * Get AI configuration from environment variables
 */
export function getAIConfig(): AIConfig {
  // Check which provider is configured
  const openaiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const anthropicKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
  const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;

  let provider: AIProvider = 'openai'; // default
  if (geminiKey) provider = 'gemini';
  else if (anthropicKey) provider = 'anthropic';
  else if (openaiKey) provider = 'openai';

  return {
    provider,
    model: DEFAULT_MODELS[provider],
    temperature: 0.7,
    maxTokens: 2000,
  };
}

/**
 * Stream AI responses from OpenAI
 */
async function* streamOpenAI(
  messages: AIMessage[],
  config: AIConfig,
): AsyncGenerator<AIStreamChunk> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OpenAI API key not configured');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: config.model || DEFAULT_MODELS.openai,
      messages: messages.map(m => ({ role: m.role, content: m.content })),
      temperature: config.temperature,
      max_tokens: config.maxTokens,
      stream: true,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`OpenAI API error: ${error.error?.message || response.statusText}`);
  }

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();

  if (!reader) throw new Error('No response body');

  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (!line.trim() || line.trim() === 'data: [DONE]') continue;
      if (!line.startsWith('data: ')) continue;

      try {
        const json = JSON.parse(line.slice(6));
        const content = json.choices?.[0]?.delta?.content;
        if (content) {
          yield { text: content, done: false };
        }
      } catch {
        // Skip malformed SSE lines
      }
    }
  }

  yield { text: '', done: true };
}

/**
 * Stream AI responses from Anthropic Claude
 */
async function* streamAnthropic(
  messages: AIMessage[],
  config: AIConfig,
): AsyncGenerator<AIStreamChunk> {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('Anthropic API key not configured');
  }

  // Anthropic requires system message separately
  const systemMessage = messages.find(m => m.role === 'system')?.content || '';
  const conversationMessages = messages
    .filter(m => m.role !== 'system')
    .map(m => ({ role: m.role, content: m.content }));

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: config.model || DEFAULT_MODELS.anthropic,
      messages: conversationMessages,
      system: systemMessage,
      temperature: config.temperature,
      max_tokens: config.maxTokens || 4096,
      stream: true,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Anthropic API error: ${error.error?.message || response.statusText}`);
  }

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();

  if (!reader) throw new Error('No response body');

  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (!line.trim() || !line.startsWith('data: ')) continue;

      try {
        const json = JSON.parse(line.slice(6));
        if (json.type === 'content_block_delta' && json.delta?.text) {
          yield { text: json.delta.text, done: false };
        }
      } catch {
        // Skip malformed SSE lines
      }
    }
  }

  yield { text: '', done: true };
}

/**
 * Stream AI responses from Google Gemini
 */
async function* streamGemini(
  messages: AIMessage[],
  config: AIConfig,
): AsyncGenerator<AIStreamChunk> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Gemini API key not configured');
  }

  // Convert messages to Gemini format
  const contents = messages
    .filter(m => m.role !== 'system')
    .map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

  const systemInstruction = messages.find(m => m.role === 'system')?.content;

  const model = config.model || DEFAULT_MODELS.gemini;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents,
      systemInstruction: systemInstruction ? { parts: [{ text: systemInstruction }] } : undefined,
      generationConfig: {
        temperature: config.temperature,
        maxOutputTokens: config.maxTokens,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Gemini API error: ${error.error?.message || response.statusText}`);
  }

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();

  if (!reader) throw new Error('No response body');

  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    
    // Gemini returns JSON array of chunks
    try {
      // Try to parse complete JSON objects
      const lines = buffer.split('\n').filter(l => l.trim());
      for (let i = 0; i < lines.length - 1; i++) {
        const line = lines[i];
        try {
          const json = JSON.parse(line);
          const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            yield { text, done: false };
          }
        } catch {
          // Skip malformed lines
        }
      }
      buffer = lines[lines.length - 1] || '';
    } catch {
      // Keep accumulating buffer
    }
  }

  // Try to parse any remaining buffer
  if (buffer.trim()) {
    try {
      const json = JSON.parse(buffer);
      const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        yield { text, done: false };
      }
    } catch {
      // Ignore malformed buffer
    }
  }

  yield { text: '', done: true };
}

/**
 * Main streaming function - routes to appropriate provider
 */
export async function* streamAIResponse(
  messages: AIMessage[],
  config: Partial<AIConfig> = {},
): AsyncGenerator<AIStreamChunk> {
  const fullConfig = { ...getAIConfig(), ...config };
  const provider = fullConfig.provider || 'openai';

  try {
    switch (provider) {
      case 'openai':
        yield* streamOpenAI(messages, fullConfig);
        break;
      case 'anthropic':
        yield* streamAnthropic(messages, fullConfig);
        break;
      case 'gemini':
        yield* streamGemini(messages, fullConfig);
        break;
      default:
        throw new Error(`Unsupported provider: ${provider}`);
    }
  } catch (error) {
    console.error('AI streaming error:', error);
    throw error;
  }
}

/**
 * Non-streaming version - returns complete response
 */
export async function getAIResponse(
  messages: AIMessage[],
  config: Partial<AIConfig> = {},
): Promise<string> {
  let fullText = '';
  
  for await (const chunk of streamAIResponse(messages, config)) {
    if (!chunk.done) {
      fullText += chunk.text;
    }
  }
  
  return fullText;
}

/**
 * Helper to create employee-specific AI responses
 */
export function createEmployeeMessages(
  employeeName: string,
  employeeRole: string,
  task: string,
  context?: string,
): AIMessage[] {
  const systemPrompt = `You are ${employeeName}, a ${employeeRole} working for Nexus AI.

Your responsibilities:
- Provide professional, high-quality work
- Be concise but thorough
- Match the tone appropriate for ${employeeRole}
- Focus on actionable results

${context ? `Additional context: ${context}` : ''}

Respond in a professional manner as this ${employeeRole} would, completing the task with excellence.`;

  return [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: task },
  ];
}
