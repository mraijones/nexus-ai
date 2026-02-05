import { describe, it, expect } from 'vitest';

// Simulate the refined mapping logic from CreateTask.tsx
const employeeKeywordMap = [
  { id: 'alex', keywords: ['blog', 'copy', 'write', 'content', 'article', 'post', 'story'] },
  { id: 'bob', keywords: ['design', 'ui', 'ux', 'visual', 'logo', 'illustration', 'brand'] },
  { id: 'charlie', keywords: ['code', 'develop', 'build', 'app', 'feature', 'bug', 'python', 'react', 'api'] },
  { id: 'david', keywords: ['marketing', 'campaign', 'growth', 'crm', 'ad', 'analytics'] },
  { id: 'eve', keywords: ['data', 'analy', 'report', 'dashboard', 'sql', 'trend'] },
  { id: 'sam', keywords: ['support', 'ticket', 'help', 'faq', 'customer', 'chat'] },
  { id: 'sophia', keywords: ['seo', 'search', 'optimiz', 'keyword', 'backlink'] },
  { id: 'mia', keywords: ['social', 'media', 'engage', 'post', 'brand', 'schedule'] },
  { id: 'paul', keywords: ['project', 'manage', 'task', 'deadline', 'remind', 'team'] },
  { id: 'quinn', keywords: ['test', 'qa', 'bug', 'regress', 'automation'] },
  { id: 'riley', keywords: ['sales', 'lead', 'crm', 'outreach', 'follow'] },
  { id: 'harper', keywords: ['hr', 'resume', 'interview', 'onboard', 'policy'] },
  { id: 'luna', keywords: ['legal', 'contract', 'review', 'compliance', 'law'] },
  { id: 'finley', keywords: ['finance', 'expense', 'invoice', 'budget', 'summary'] },
  { id: 'sage', keywords: ['research', 'summary', 'brief', 'fact', 'analy'] },
  { id: 'taylor', keywords: ['translate', 'localiz', 'language', 'proofread', 'edit'] },
];

const templateToEmployee: { [key: string]: string } = {
  blog: 'alex',
  social: 'mia',
  design: 'bob',
  code: 'charlie',
  marketing: 'david',
  custom: 'alex',
};

function fuzzyIncludes(text: string, keyword: string) {
  return text.includes(keyword);
}

function autoAssignEmployee(template: string, title: string, description: string, allEmployees: {id: string}[]): string {
  if (templateToEmployee[template]) return templateToEmployee[template];
  const text = `${title} ${description}`.toLowerCase();
  let bestMatch = '';
  let bestScore = 0;
  for (const { id, keywords } of employeeKeywordMap) {
    let score = 0;
    for (const kw of keywords) {
      if (fuzzyIncludes(text, kw)) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = id;
    }
  }
  if (bestMatch) return bestMatch;
  return allEmployees[Math.floor(Math.random() * allEmployees.length)]?.id || '';
}

describe('autoAssignEmployee', () => {
  const allEmployees = employeeKeywordMap.map(e => ({ id: e.id }));

  it('assigns by template', () => {
    expect(autoAssignEmployee('blog', '', '', allEmployees)).toBe('alex');
    expect(autoAssignEmployee('design', '', '', allEmployees)).toBe('bob');
  });

  it('assigns by keyword in title', () => {
    expect(autoAssignEmployee('', 'Bug in app', '', allEmployees)).toBe('charlie');
    expect(autoAssignEmployee('', 'SEO audit needed', '', allEmployees)).toBe('sophia');
    expect(autoAssignEmployee('', 'Translate this', '', allEmployees)).toBe('taylor');
  });

  it('assigns by keyword in description', () => {
    expect(autoAssignEmployee('', '', 'Please analyze this data', allEmployees)).toBe('eve');
    expect(autoAssignEmployee('', '', 'We need a new logo', allEmployees)).toBe('bob');
  });

  it('falls back to random if no match', () => {
    const result = autoAssignEmployee('', 'Unrelated', 'Nothing matches', allEmployees);
    expect(allEmployees.map(e => e.id)).toContain(result);
  });
});
