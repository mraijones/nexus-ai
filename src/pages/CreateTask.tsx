import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/lib/auth';
import {
  ArrowLeft,
  Calendar,
  Check,
  Loader2,
  Send,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';

interface Employee {
  id: string;
  name: string;
  role: string;
  image: string;
  icon: React.ElementType;
  color: string;
}

import { employees as allEmployees } from '@/sections/AIEmployees';

// Refined mapping: multiple keywords per employee, fuzzy matching, fallback to least busy
const templateToEmployee: Record<string, string> = {
  blog: 'alex',
  social: 'mia',
  design: 'bob',
  code: 'charlie',
  marketing: 'david',
  custom: 'alex',
};

const employeeKeywordMap: Array<{ id: string; keywords: string[] }> = [
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

function fuzzyIncludes(text: string, keyword: string) {
  // Partial match, ignore case
  return text.includes(keyword);
}

function autoAssignEmployee(template: string, title: string, description: string): string {
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
  // Fallback: least busy employee (random for now, could query task counts)
  return allEmployees[Math.floor(Math.random() * allEmployees.length)]?.id || '';
}

const myEmployees: Employee[] = allEmployees.map((e) => ({
  id: e.id,
  name: e.name,
  role: e.role,
  image: e.image,
  icon: e.icon,
  color: e.color,
}))

const taskTemplates = [
  { id: 'blog', label: 'Blog Post', description: 'Write an SEO-optimized blog article' },
  { id: 'social', label: 'Social Media', description: 'Create engaging social media content' },
  { id: 'design', label: 'Graphic Design', description: 'Design visuals, logos, or marketing materials' },
  { id: 'code', label: 'Development', description: 'Build features, fix bugs, or write code' },
  { id: 'marketing', label: 'Marketing Campaign', description: 'Plan and execute marketing strategies' },
  { id: 'custom', label: 'Custom Task', description: 'Describe your own task' },
];

export default function CreateTaskPage() { 
  const navigate = useNavigate();
  const { user } = useAuth(); // Ensure user is authenticated
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [runMode, setRunMode] = useState<'auto' | 'manual'>('auto');
  // Load user's profile default run mode and auto-assign employee
  useEffect(() => {
    async function loadProfile() {
      if (!user) return;
      if (!supabase) return;
      try {
        const { data } = await supabase.from('profiles').select('auto_run_tasks').eq('id', user.id).single();
        if (data && typeof data.auto_run_tasks === 'boolean') {
          setRunMode(data.auto_run_tasks ? 'auto' : 'manual');
        }
      } catch (err) {
        console.error('Error loading profile', err);
      }
    }
    loadProfile();
  }, [user]);

  // Auto-assign employee when template, title, or description changes (unless user overrides)
    useEffect(() => {
    if (!selectedEmployee) {
      setSelectedEmployee(autoAssignEmployee(selectedTemplate, title, description));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTemplate, title, description]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      navigate('/auth');
      return;
    }

    setIsSubmitting(true);

    try {
      const resp = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': user.id },
        body: JSON.stringify({
          user_id: user.id,
          employee_id: selectedEmployee,
          title,
          description,
          priority,
          run_mode: runMode,
        }),
      });

      const data = await resp.json();
      if (!resp.ok) {
        throw new Error(data?.error || 'Failed to create task');
      }

    setIsSubmitting(false);
    setIsSuccess(true);
    } catch (err) {
      console.error("Createtask failed", err);
    }
  };
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-nexus-dark flex items-center justify-center p-4">
        <Card className="glass border-0 max-w-md w-full text-center p-8">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Task Created!</h2>
          <p className="text-nexus-gray mb-6">
            Your AI employee will start working on this immediately. You'll be notified when it's complete.
          </p>
          <div className="flex gap-4">
            <Button 
              className="flex-1 bg-nexus-gradient text-white"
              onClick={() => navigate('/dashboard')}
            >
              View Dashboard
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 border-white/20 text-white hover:bg-white/10"
              onClick={() => {
                setIsSuccess(false);
                setTitle('');
                setDescription('');
                setSelectedEmployee('');
              }}
            >
              Create Another
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nexus-dark">
      {/* Header */}
      <header className="border-b border-white/5 bg-nexus-dark/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-white">Create New Task</h1>
                <p className="text-sm text-nexus-gray hidden sm:block">Assign work to your AI team</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Task Templates */}
              <Card className="glass border-0">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Choose Task Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {taskTemplates.map((template) => (
                      <button
                        key={template.id}
                        type="button"
                        onClick={() => setSelectedTemplate(template.id)}
                        className={`p-4 rounded-xl text-left transition-all ${
                          selectedTemplate === template.id
                            ? 'bg-nexus-gradient text-white'
                            : 'bg-white/5 text-white hover:bg-white/10'
                        }`}
                      >
                        <div className="font-medium">{template.label}</div>
                        <div className={`text-sm ${selectedTemplate === template.id ? 'text-white/80' : 'text-nexus-gray'}`}>
                          {template.description}
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Task Details */}
              <Card className="glass border-0">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Task Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-white">Task Title</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Write a blog post about AI trends"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-nexus-gray"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-white">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what you need in detail..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      rows={6}
                      className="bg-white/5 border-white/10 text-white placeholder:text-nexus-gray resize-none"
                    />
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1 space-y-2">
                      <Label className="text-white">Priority</Label>
                      <div className="flex gap-2">
                        {['low', 'medium', 'high'].map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => setPriority(p)}
                            className={`flex-1 py-2 px-4 rounded-lg capitalize transition-all ${
                              priority === p
                                ? 'bg-nexus-gradient text-white'
                                : 'bg-white/5 text-nexus-gray hover:bg-white/10'
                            }`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex-1 space-y-2">
                      <Label className="text-white">Due Date</Label>
                      <div className="flex items-center gap-2 p-2 bg-white/5 rounded-lg border border-white/10">
                        <Calendar className="w-5 h-5 text-nexus-gray" />
                        <span className="text-nexus-gray">ASAP (AI works 24/7)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Assign Employee */}
              <Card className="glass border-0">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Assign To</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {myEmployees.map((employee) => {
                      const isSelected = selectedEmployee === employee.id;
                      
                      return (
                        <button
                          key={employee.id}
                          type="button"
                          onClick={() => setSelectedEmployee(employee.id)}
                          className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                            isSelected
                              ? 'bg-nexus-gradient'
                              : 'bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          <img
                            src={employee.image}
                            alt={employee.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1 text-left">
                            <div className="font-medium text-white">{employee.name}</div>
                            <div className={`text-sm ${isSelected ? 'text-white/80' : 'text-nexus-gray'}`}>
                              {employee.role}
                            </div>
                          </div>
                          <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-white' : 'bg-green-400'} animate-pulse`} />
                        </button>
                      );
                    })}
                  </div>

                  {/* Run mode */}
                  <div className="mt-4">
                    <Label className="text-white">Run Mode</Label>
                    <div className="flex gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => setRunMode('auto')}
                        className={`py-2 px-4 rounded-lg ${runMode === 'auto' ? 'bg-nexus-gradient text-white' : 'bg-white/5 text-nexus-gray hover:bg-white/10'}`}>
                        Auto
                      </button>
                      <button
                        type="button"
                        onClick={() => setRunMode('manual')}
                        className={`py-2 px-4 rounded-lg ${runMode === 'manual' ? 'bg-nexus-gradient text-white' : 'bg-white/5 text-nexus-gray hover:bg-white/10'}`}>
                        Manual (Require approval)
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Submit */}
              <Card className="glass border-0">
                <CardContent className="p-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting || !selectedEmployee || !title || !description}
                    className="w-full bg-nexus-gradient text-white py-6"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    ) : (
                      <Send className="w-5 h-5 mr-2" />
                    )}
                    {isSubmitting ? 'Creating Task...' : 'Create Task'}
                  </Button>
                  <p className="text-center text-nexus-gray text-sm mt-4">
                    Your AI employee will start working immediately
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

