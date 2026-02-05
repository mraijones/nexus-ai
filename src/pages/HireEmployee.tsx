import { supabase } from '../lib/supabaseClient';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/lib/auth';
import { 
  ArrowLeft, 
  MessageSquare, 
  Palette, 
  Code2, 
  TrendingUp,
  Check,
  Clock,
  Zap,
  Star,
  Loader2
} from 'lucide-react';

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
    id: 'alex',
    name: 'Alex',
    role: 'Copywriter',
    description: 'AI-powered content creator specializing in compelling copy, blog posts, marketing materials, and brand storytelling.',
    image: '/alex-copywriter.png',
    skills: ['Blog Writing', 'Ad Copy', 'Email Campaigns', 'SEO Content', 'Social Media'],
    hourlyRate: 15,
    rating: 4.9,
    tasksCompleted: 15420,
    responseTime: '< 1 min',
    icon: MessageSquare,
    color: 'from-blue-500 to-cyan-500',
    isAvailable: true,
  },
  {
    id: 'bob',
    name: 'Bob',
    role: 'Designer',
    description: 'Creative AI designer with expertise in UI/UX, branding, illustrations, and marketing materials.',
    image: '/bob-designer.png',
    skills: ['UI/UX Design', 'Brand Identity', 'Illustrations', 'Motion Graphics', 'Prototyping'],
    hourlyRate: 20,
    rating: 4.8,
    tasksCompleted: 8930,
    responseTime: '< 2 min',
    icon: Palette,
    color: 'from-purple-500 to-pink-500',
    isAvailable: true,
  },
  {
    id: 'charlie',
    name: 'Charlie',
    role: 'Developer',
    description: 'Full-stack AI developer proficient in multiple languages and frameworks. Builds robust, scalable applications.',
    image: '/charlie-developer.png',
    skills: ['React/Next.js', 'Python', 'API Development', 'Database Design', 'DevOps'],
    hourlyRate: 25,
    rating: 5.0,
    tasksCompleted: 12350,
    responseTime: '< 30 sec',
    icon: Code2,
    color: 'from-green-500 to-emerald-500',
    isAvailable: true,
  },
  {
    id: 'david',
    name: 'David',
    role: 'Marketer',
    description: 'Strategic AI marketer who analyzes trends, optimizes campaigns, and drives growth.',
    image: '/david-marketer.png',
    skills: ['Campaign Management', 'Analytics', 'A/B Testing', 'Growth Strategy', 'CRM'],
    hourlyRate: 18,
    rating: 4.7,
    tasksCompleted: 18760,
    responseTime: '< 1 min',
    icon: TrendingUp,
    color: 'from-orange-500 to-red-500',
    isAvailable: true,
  },
];

export function HireEmployeePage() {
  const navigate = useNavigate();
  useAuth(); // Ensure user is authenticated
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isHiring, setIsHiring] = useState(false);
  const [hiredEmployee, setHiredEmployee] = useState<Employee | null>(null);

  async function handleHire(employee: Employee) {
    setIsHiring(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setHiredEmployee(employee);
    setIsHiring(false);
    setSelectedEmployee(null);
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

        {/* Employee cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {employees.map((employee) => {
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
