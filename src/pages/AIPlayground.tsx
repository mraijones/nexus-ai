import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import AgentTerminal from '@/components/AgentTerminal';
import { ArrowLeft, Play, StopCircle, Sparkles } from 'lucide-react';
import { streamAIResponse, createEmployeeMessages, getAIConfig } from '@/lib/aiService';
import { toast } from 'sonner';

const sampleEmployees = [
  { id: 'aurora', name: 'Aurora-7', role: 'Strategic Operations Director', tier: 4 },
  { id: 'alex', name: 'Alex Chen', role: 'Content Writer', tier: 1 },
  { id: 'sophia', name: 'Sophia Rodriguez', role: 'SEO Specialist', tier: 2 },
  { id: 'charlie', name: 'Charlie Kim', role: 'Senior Developer', tier: 3 },
  { id: 'david', name: 'David Park', role: 'Marketing Strategist', tier: 2 },
];

const sampleTasks = [
  'Write a professional email to a potential client about our AI workforce solution',
  'Create a social media post announcing a new product feature',
  'Analyze our Q4 revenue trends and provide strategic recommendations',
  'Write a blog post about the future of AI in business',
  'Develop a marketing campaign strategy for product launch',
];

export function AIPlayground() {
  const navigate = useNavigate();
  const [selectedEmployee, setSelectedEmployee] = useState(sampleEmployees[0]);
  const [task, setTask] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamContent, setStreamContent] = useState('');
  const aiConfig = getAIConfig();

  const handleStreamAI = async () => {
    if (!task.trim()) {
      toast.error('Please enter a task');
      return;
    }

    // Check if API key is configured
    if (!import.meta.env.VITE_OPENAI_API_KEY && 
        !import.meta.env.VITE_ANTHROPIC_API_KEY && 
        !import.meta.env.VITE_GEMINI_API_KEY) {
      toast.error('No AI API key configured. Please set VITE_OPENAI_API_KEY, VITE_ANTHROPIC_API_KEY, or VITE_GEMINI_API_KEY in your .env file');
      return;
    }

    setIsStreaming(true);
    setStreamContent('');

    try {
      const messages = createEmployeeMessages(
        selectedEmployee.name,
        selectedEmployee.role,
        task,
        `You are a Tier ${selectedEmployee.tier} employee at Nexus AI.`
      );

      let fullText = '';
      
      for await (const chunk of streamAIResponse(messages)) {
        if (!chunk.done) {
          fullText += chunk.text;
          setStreamContent(fullText);
        }
      }

      toast.success('Task completed successfully!');
    } catch (error) {
      console.error('AI streaming error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to connect to AI service';
      toast.error(`AI Error: ${errorMessage}`);
      setStreamContent(`ERROR: ${errorMessage}\n\nPlease check:\n- API key is set correctly\n- You have API credits/quota\n- Network connection is working`);
    } finally {
      setIsStreaming(false);
    }
  };

  const handleStop = () => {
    setIsStreaming(false);
  };

  const loadSampleTask = (sampleTask: string) => {
    setTask(sampleTask);
  };

  return (
    <div className="min-h-screen bg-nexus-dark text-white">
      {/* Header */}
      <header className="border-b border-white/5 bg-nexus-dark/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-nexus-cyan" />
                  AI Playground
                </h1>
                <p className="text-sm text-nexus-gray hidden sm:block">
                  Test AI employees in real-time
                </p>
              </div>
            </div>
            <div className="text-sm text-nexus-gray">
              Provider: <span className="text-nexus-cyan font-semibold">{aiConfig.provider}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Controls */}
          <div className="space-y-6">
            <Card className="bg-nexus-card border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Select Employee</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-nexus-gray mb-2 block">AI Employee</Label>
                  <Select
                    value={selectedEmployee.id}
                    onValueChange={(id) => {
                      const emp = sampleEmployees.find(e => e.id === id);
                      if (emp) setSelectedEmployee(emp);
                    }}
                  >
                    <SelectTrigger className="bg-nexus-dark border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-nexus-dark border-white/20">
                      {sampleEmployees.map((emp) => (
                        <SelectItem key={emp.id} value={emp.id} className="text-white">
                          {emp.name} - {emp.role} (Tier {emp.tier})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-4 bg-nexus-dark/50 rounded-lg border border-white/10">
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-nexus-gray">Name:</span>
                      <span className="text-white font-semibold">{selectedEmployee.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-nexus-gray">Role:</span>
                      <span className="text-white">{selectedEmployee.role}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-nexus-gray">Tier:</span>
                      <span className="text-nexus-cyan font-bold">Tier {selectedEmployee.tier}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-nexus-card border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Task Assignment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-nexus-gray mb-2 block">Describe the task</Label>
                  <Textarea
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Example: Write a professional email to a client about our new AI features..."
                    className="bg-nexus-dark border-white/20 text-white min-h-[120px] resize-none"
                    disabled={isStreaming}
                  />
                </div>

                <div>
                  <Label className="text-nexus-gray mb-2 block">Quick Templates</Label>
                  <div className="space-y-2">
                    {sampleTasks.map((sampleTask, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        size="sm"
                        onClick={() => loadSampleTask(sampleTask)}
                        disabled={isStreaming}
                        className="w-full justify-start text-left border-white/20 hover:bg-white/10 text-white text-xs"
                      >
                        {sampleTask}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  {!isStreaming ? (
                    <Button
                      onClick={handleStreamAI}
                      className="flex-1 bg-nexus-gradient text-white font-bold"
                      size="lg"
                      disabled={!task.trim()}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Execute Task
                    </Button>
                  ) : (
                    <Button
                      onClick={handleStop}
                      variant="destructive"
                      className="flex-1"
                      size="lg"
                    >
                      <StopCircle className="w-4 h-4 mr-2" />
                      Stop
                    </Button>
                  )}
                </div>

                <div className="text-xs text-nexus-gray p-3 bg-nexus-dark/50 rounded border border-white/10">
                  <strong className="text-white">Note:</strong> This playground uses real AI API 
                  calls. Current provider: <span className="text-nexus-cyan">{aiConfig.provider}</span>
                  {' '}({aiConfig.model})
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Terminal Output */}
          <div className="space-y-6">
            <AgentTerminal
              agentName={selectedEmployee.name.toUpperCase().replace(/\s+/g, '-')}
              missionContext={task || 'Awaiting task assignment...'}
              workType={selectedEmployee.role.toUpperCase()}
              isStreaming={isStreaming}
              streamContent={streamContent}
              liveOutput={
                streamContent || 
                `> Waiting for task assignment...\n\nSelect an employee, describe a task, and click "Execute Task" to see real-time AI processing.\n\nSupported providers:\n• OpenAI (GPT-4)\n• Anthropic (Claude)\n• Google (Gemini)\n\nSet VITE_OPENAI_API_KEY, VITE_ANTHROPIC_API_KEY, or VITE_GEMINI_API_KEY in your .env file to get started.`
              }
            />

            {streamContent && !isStreaming && (
              <Card className="bg-nexus-card border-green-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-green-400">
                    <Sparkles className="w-5 h-5" />
                    <span className="font-semibold">Task completed successfully!</span>
                  </div>
                  <p className="text-sm text-nexus-gray mt-2">
                    The AI employee has finished processing your request.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIPlayground;
