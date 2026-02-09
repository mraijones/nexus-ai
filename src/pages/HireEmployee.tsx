  {
    id: 'maria',
    name: 'Maria',
    role: 'Customer Success Manager',
    description: 'Ensures customer satisfaction, manages onboarding, and handles feedback.',
    image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Maria',
    skills: ['Onboarding', 'Customer Feedback', 'Retention', 'Support', 'CRM'],
    hourlyRate: 18,
    rating: 4.8,
    tasksCompleted: 6800,
    responseTime: '< 2 min',
    icon: Star,
    color: 'from-pink-500 to-purple-500',
    isAvailable: true,
  },
  {
    id: 'taylor',
    name: 'Taylor',
    role: 'Accessibility Specialist',
    description: 'Reviews products for accessibility and inclusivity.',
    image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Taylor',
    skills: ['Accessibility Audits', 'WCAG', 'Inclusive Design', 'Testing', 'User Experience'],
    hourlyRate: 19,
    rating: 4.9,
    tasksCompleted: 6500,
    responseTime: '< 1 min',
    icon: Check,
    color: 'from-yellow-500 to-blue-500',
    isAvailable: true,
  },
  {
    id: 'amara',
    name: 'Amara',
    role: 'Diversity & Inclusion Officer',
    description: 'Promotes diversity, equity, and inclusion in the workplace.',
    image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Amara',
    skills: ['DEI Training', 'Policy', 'Mediation', 'Culture Building', 'Workshops'],
    hourlyRate: 20,
    rating: 4.9,
    tasksCompleted: 6000,
    responseTime: '< 2 min',
    icon: Loader2,
    color: 'from-orange-500 to-pink-500',
    isAvailable: true,
  },
  {
    id: 'ivan',
    name: 'Ivan',
    role: 'Cybersecurity Analyst',
    description: 'Protects systems from threats and ensures data privacy.',
    image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Ivan',
    skills: ['Threat Detection', 'Security Audits', 'Incident Response', 'Encryption', 'Network Security'],
    hourlyRate: 22,
    rating: 4.8,
    tasksCompleted: 7200,
    responseTime: '< 1 min',
    icon: Clock,
    color: 'from-blue-700 to-gray-500',
    isAvailable: true,
  },
  {
    id: 'priya2',
    name: 'Priya',
    role: 'Product Manager',
    description: 'Oversees product development and aligns teams with business goals.',
    image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Priya2',
    skills: ['Roadmapping', 'User Research', 'Agile', 'Feature Planning', 'Strategy'],
    hourlyRate: 23,
    rating: 5.0,
    tasksCompleted: 8000,
    responseTime: '< 1 min',
    icon: TrendingUp,
    color: 'from-green-500 to-yellow-500',
    isAvailable: true,
  },
  {
    id: 'jamal2',
    name: 'Jamal',
    role: 'Social Media Influencer',
    description: 'Grows brand presence and engagement on social platforms.',
    image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Jamal2',
    skills: ['Content Creation', 'Engagement', 'Analytics', 'Campaigns', 'Branding'],
    hourlyRate: 17,
    rating: 4.7,
    tasksCompleted: 9000,
    responseTime: '< 2 min',
    icon: Zap,
    color: 'from-red-500 to-yellow-500',
    isAvailable: true,
  },
  {
    id: 'chen2',
    name: 'Chen',
    role: 'Operations Specialist',
    description: 'Optimizes workflows and manages logistics.',
    image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Chen2',
    skills: ['Process Improvement', 'Logistics', 'Scheduling', 'Reporting', 'Optimization'],
    hourlyRate: 18,
    rating: 4.8,
    tasksCompleted: 6700,
    responseTime: '< 1 min',
    icon: Star,
    color: 'from-teal-500 to-green-500',
    isAvailable: true,
  },
  {
    id: 'fatima2',
    name: 'Fatima',
    role: 'Technical Writer',
    description: 'Creates clear documentation and user guides.',
    image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Fatima2',
    skills: ['Documentation', 'Tutorials', 'Editing', 'Communication', 'User Guides'],
    hourlyRate: 19,
    rating: 4.9,
    tasksCompleted: 7100,
    responseTime: '< 2 min',
    icon: MessageSquare,
    color: 'from-purple-700 to-pink-500',
    isAvailable: true,
  },
  {
    id: 'diego',
    name: 'Diego',
    role: 'Data Scientist',
    description: 'Builds predictive models and analyzes complex data.',
    image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Diego',
    skills: ['Machine Learning', 'Data Mining', 'Python', 'Visualization', 'Big Data'],
    hourlyRate: 24,
    rating: 5.0,
    tasksCompleted: 8500,
    responseTime: '< 1 min',
    icon: Code2,
    color: 'from-blue-500 to-indigo-500',
    isAvailable: true,
  },
  {
    id: 'grace2',
    name: 'Grace',
    role: 'Community Manager',
    description: 'Builds and nurtures online communities.',
    image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Grace2',
    skills: ['Moderation', 'Engagement', 'Event Planning', 'Social Listening', 'Community Building'],
    hourlyRate: 18,
    rating: 4.8,
    tasksCompleted: 7800,
    responseTime: '< 2 min',
    icon: Loader2,
    color: 'from-pink-500 to-green-500',
    isAvailable: true,
  },
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/lib/auth';
import {
  ArrowLeft,
  Check,
  Clock,
  Code2,
  Loader2,
  MessageSquare,
  Palette,
  Star,
  TrendingUp,
  Zap
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Employee {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
  skills: string[];
  hourlyRate: number;
  rating: number;
  tasksCompleted: number;
  responseTime: string;
  icon: React.ElementType;
  color: string;
  isAvailable: boolean;
}

const employees: Employee[] = [
  {
    id: 'aisha',
    name: 'Aisha',
    role: 'Content Strategist',
    description: 'AI content strategist specializing in SEO and digital marketing.',
    image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Aisha',
    skills: ['SEO', 'Content Planning', 'Copywriting', 'Blogging', 'Brand Voice'],
    hourlyRate: 16,
    rating: 4.9,
    tasksCompleted: 12000,
    responseTime: '< 1 min',
    icon: MessageSquare,
    color: 'from-blue-500 to-cyan-500',
    isAvailable: true,
  },
  {
    id: 'hiroshi',
    name: 'Hiroshi',
    role: 'Developer',
    description: 'Full-stack AI developer with expertise in web and mobile apps.',
    image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Hiroshi',
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'APIs'],
    hourlyRate: 24,
    rating: 5.0,
    tasksCompleted: 11000,
    responseTime: '< 30 sec',
    icon: Code2,
    color: 'from-green-500 to-emerald-500',
    isAvailable: true,
  },
  {
    id: 'priya',
    name: 'Priya',
    role: 'Data Analyst',
    description: 'AI data analyst who uncovers insights and trends for business growth.',
    image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Priya',
    skills: ['Data Analysis', 'Visualization', 'SQL', 'Reporting', 'Statistics'],
    hourlyRate: 19,
    rating: 4.8,
    tasksCompleted: 9500,
    responseTime: '< 2 min',
    icon: Star,
    color: 'from-purple-500 to-pink-500',
    isAvailable: true,
  },
  {
    id: 'juan',
    name: 'Juan',
    role: 'Project Manager',
    description: 'AI project manager who tracks tasks, deadlines, and team progress.',
    image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Juan',
    skills: ['Task Tracking', 'Scheduling', 'Team Management', 'Agile', 'Scrum'],
    hourlyRate: 21,
    rating: 4.7,
    tasksCompleted: 8700,
    responseTime: '< 1 min',
    icon: TrendingUp,
    color: 'from-orange-500 to-red-500',
    isAvailable: true,
  },
  {
    id: 'fatima',
    name: 'Fatima',
    role: 'Designer',
    description: 'Creative AI designer with expertise in branding and UI/UX.',
    image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Fatima',
    skills: ['UI/UX Design', 'Brand Identity', 'Illustrations', 'Prototyping', 'Motion Graphics'],
    hourlyRate: 20,
    rating: 4.8,
    tasksCompleted: 9000,
    responseTime: '< 2 min',
    icon: Palette,
    color: 'from-pink-500 to-yellow-500',
    isAvailable: true,
  },
  {
    id: 'chen',
    name: 'Chen',
    role: 'QA Tester',
    description: 'AI QA tester who reviews code, tests features, and reports bugs.',
    image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Chen',
    skills: ['Testing', 'Bug Reports', 'Automation', 'Regression', 'Quality Assurance'],
    hourlyRate: 18,
    rating: 4.9,
    tasksCompleted: 8000,
    responseTime: '< 1 min',
    icon: Check,
    color: 'from-teal-500 to-blue-500',
    isAvailable: true,
  },
  {
    id: 'grace',
    name: 'Grace',
    role: 'HR Assistant',
    description: 'AI HR assistant who screens resumes, schedules interviews, and manages onboarding.',
    image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Grace',
    skills: ['Screening', 'Scheduling', 'Onboarding', 'Policy', 'HR Support'],
    hourlyRate: 17,
    rating: 4.8,
    tasksCompleted: 7800,
    responseTime: '< 2 min',
    icon: Loader2,
    color: 'from-yellow-500 to-orange-500',
    isAvailable: true,
  },
  {
    id: 'samir',
    name: 'Samir',
    role: 'Finance Assistant',
    description: 'AI finance assistant who tracks expenses, generates invoices, and manages budgets.',
    image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Samir',
    skills: ['Expenses', 'Invoices', 'Budgets', 'Reports', 'Finance'],
    hourlyRate: 19,
    rating: 4.7,
    tasksCompleted: 7600,
    responseTime: '< 1 min',
    icon: Clock,
    color: 'from-green-700 to-lime-500',
    isAvailable: true,
  },
  {
    id: 'mei',
    name: 'Mei',
    role: 'Legal Assistant',
    description: 'AI legal assistant who drafts contracts, reviews documents, and ensures compliance.',
    image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Mei',
    skills: ['Contracts', 'Compliance', 'Document Review', 'Legal Research', 'Law'],
    hourlyRate: 20,
    rating: 4.9,
    tasksCompleted: 7400,
    responseTime: '< 2 min',
    icon: Star,
    color: 'from-indigo-500 to-purple-500',
    isAvailable: true,
  },
  {
    id: 'jamal',
    name: 'Jamal',
    role: 'Sales Assistant',
    description: 'AI sales assistant who generates leads, drafts emails, and manages CRM.',
    image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Jamal',
    skills: ['Lead Gen', 'CRM', 'Outreach', 'Follow-up', 'Sales'],
    hourlyRate: 18,
    rating: 4.8,
    tasksCompleted: 7200,
    responseTime: '< 1 min',
    icon: Zap,
    color: 'from-red-500 to-pink-500',
    isAvailable: true,
  },
  {
    id: 'sofia',
    name: 'Sofia',
    role: 'Translator',
    description: 'AI translator who translates text between languages and localizes content.',
    image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Sofia',
    skills: ['Translation', 'Localization', 'Proofreading', 'Editing', 'Languages'],
    hourlyRate: 17,
    rating: 4.9,
    tasksCompleted: 7000,
    responseTime: '< 2 min',
    icon: Code2,
    color: 'from-yellow-500 to-green-500',
    isAvailable: true,
  },
];

export function HireEmployeePage() {
  const navigate = useNavigate();
  useAuth(); // Ensure user is authenticated
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isHiring, setIsHiring] = useState(false);
  const [hiredEmployee, setHiredEmployee] = useState<Employee | null>(null);
  const [search, setSearch] = useState('');

  async function handleHire(employee: Employee) {
    setIsHiring(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setHiredEmployee(employee);
    setIsHiring(false);
    setSelectedEmployee(null);
  }

  const filteredEmployees = employees.filter(e => {
    const q = search.toLowerCase();
    return (
      e.name.toLowerCase().includes(q) ||
      e.role.toLowerCase().includes(q) ||
      e.skills.some(skill => skill.toLowerCase().includes(q))
    );
  });

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
                <h1 className="text-xl font-bold text-white">Hire AI Employee</h1>
                <p className="text-sm text-nexus-gray hidden sm:block">Add talent to your team</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Introduction */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Choose Your <span className="gradient-text">AI Employee</span>
          </h2>
          <p className="text-nexus-gray max-w-2xl mx-auto">
            Each AI employee is specialized in their field and ready to work 24/7. 
            Hire them instantly - no interviews, no onboarding.
          </p>
        </div>

        {/* Search bar */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, role, or skill..."
            className="w-full max-w-md px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-nexus-gray focus:outline-none focus:ring-2 focus:ring-nexus-cyan"
          />
        </div>

        {/* Employee cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {filteredEmployees.map((employee) => {
            const Icon = employee.icon;
            return (
              <Card 
                key={employee.id} 
                className="glass border-0 overflow-hidden card-lift cursor-pointer group"
                onClick={() => setSelectedEmployee(employee)}
              >
                <CardContent className="p-0">
                  <div className="flex">
                    {/* Image */}
                    <div className="relative w-1/3 min-h-[200px]">
                      <div className={`absolute inset-0 bg-gradient-to-br ${employee.color} opacity-20`} />
                      <img
                        src={employee.image}
                        alt={employee.name}
                        className="w-full h-full object-cover object-top"
                      />
                      {/* Status */}
                      <div className="absolute top-3 left-3 flex items-center gap-2 px-2 py-1 glass rounded-full">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-xs text-white">Available</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-white">{employee.name}</h3>
                          <p className="text-nexus-cyan">{employee.role}</p>
                        </div>
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${employee.color}`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                      </div>

                      <p className="text-nexus-gray text-sm mb-4 line-clamp-2">
                        {employee.description}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-white">{employee.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Check className="w-4 h-4 text-green-400" />
                          <span className="text-nexus-gray">{employee.tasksCompleted.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-nexus-cyan" />
                          <span className="text-nexus-gray">{employee.responseTime}</span>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {employee.skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="secondary" className="bg-white/10 text-nexus-gray">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      {/* Rate */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-white">${employee.hourlyRate}</span>
                          <span className="text-nexus-gray text-sm">/hour</span>
                        </div>
                        <Button size="sm" className="bg-nexus-gradient text-white">
                          <Zap className="w-4 h-4 mr-2" />
                          Hire Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Employee Detail Dialog */}
      <Dialog open={!!selectedEmployee && !hiredEmployee} onOpenChange={() => setSelectedEmployee(null)}>
        <DialogContent className="max-w-2xl bg-nexus-card border-white/10 text-white">
          {selectedEmployee && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-4">
                  <img
                    src={selectedEmployee.image}
                    alt={selectedEmployee.name}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <div>
                    <h3 className="text-2xl font-bold">{selectedEmployee.name}</h3>
                    <p className="text-nexus-cyan">{selectedEmployee.role}</p>
                  </div>
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                <p className="text-nexus-gray">{selectedEmployee.description}</p>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="glass p-4 rounded-xl text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">{selectedEmployee.rating}</div>
                    <div className="text-xs text-nexus-gray">Rating</div>
                  </div>
                  <div className="glass p-4 rounded-xl text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Check className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {selectedEmployee.tasksCompleted.toLocaleString()}
                    </div>
                    <div className="text-xs text-nexus-gray">Tasks Done</div>
                  </div>
                  <div className="glass p-4 rounded-xl text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-nexus-purple" />
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {selectedEmployee.responseTime}
                    </div>
                    <div className="text-xs text-nexus-gray">Response</div>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-3">Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedEmployee.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-2 text-sm bg-white/10 text-white rounded-lg"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div className="glass p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-nexus-gray text-sm">Hourly Rate</p>
                      <p className="text-3xl font-bold text-white">${selectedEmployee.hourlyRate}<span className="text-lg text-nexus-gray">/hr</span></p>
                    </div>
                    <div className="text-right">
                      <p className="text-nexus-gray text-sm">Monthly (160 hrs)</p>
                      <p className="text-xl font-bold text-nexus-cyan">${selectedEmployee.hourlyRate * 160}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <Button 
                    className="flex-1 bg-nexus-gradient text-white"
                    onClick={() => handleHire(selectedEmployee)}
                    disabled={isHiring}
                  >
                    {isHiring ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <Zap className="w-4 h-4 mr-2" />
                    )}
                    {isHiring ? 'Hiring...' : `Hire ${selectedEmployee.name}`}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={!!hiredEmployee} onOpenChange={() => setHiredEmployee(null)}>
        <DialogContent className="max-w-md bg-nexus-card border-white/10 text-white text-center">
          <div className="py-8">
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Welcome to the team, {hiredEmployee?.name}!
            </h3>
            <p className="text-nexus-gray mb-6">
              {hiredEmployee?.name} has been hired and is ready to work. You can assign tasks immediately.
            </p>
            <div className="flex gap-4">
              <Button 
                className="flex-1 bg-nexus-gradient text-white"
                onClick={() => navigate('/tasks/new')}
              >
                Create First Task
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 border-white/20 text-white hover:bg-white/10"
                onClick={() => navigate('/dashboard')}
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
