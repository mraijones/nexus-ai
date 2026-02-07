import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MessageSquare, Code, Palette, TrendingUp, Check, Clock, Zap } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
  skills: string[];
  stats: {
    tasksCompleted: number;
    satisfaction: number;
    responseTime: string;
  };
  icon: React.ElementType;
  color: string;
}

export const employees: Employee[] = [
  {
    id: 'alex',
    name: 'Alex',
    role: 'Copywriter',
    description: 'AI-powered content creator specializing in compelling copy, blog posts, marketing materials, and brand storytelling. Alex crafts words that convert.',
    image: '/alex-copywriter.png',
    skills: ['Blog Writing', 'Ad Copy', 'Email Campaigns', 'SEO Content', 'Social Media'],
    stats: { tasksCompleted: 15420, satisfaction: 98, responseTime: '< 1 min' },
    icon: MessageSquare,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'bob',
    name: 'Bob',
    role: 'Designer',
    description: 'Creative AI designer with expertise in UI/UX, branding, illustrations, and visual identity. Bob brings your vision to life with stunning visuals.',
    image: '/bob-designer.png',
    skills: ['UI/UX Design', 'Brand Identity', 'Illustrations', 'Motion Graphics', 'Prototyping'],
    stats: { tasksCompleted: 8930, satisfaction: 97, responseTime: '< 2 min' },
    icon: Palette,
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'charlie',
    name: 'Charlie',
    role: 'Developer',
    description: 'Full-stack AI developer proficient in multiple languages and frameworks. Charlie builds robust, scalable applications with clean code.',
    image: '/charlie-developer.png',
    skills: ['React/Next.js', 'Python', 'API Development', 'Database Design', 'DevOps'],
    stats: { tasksCompleted: 12350, satisfaction: 99, responseTime: '< 30 sec' },
    icon: Code,
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'david',
    name: 'David',
    role: 'Marketer',
    description: 'Strategic AI marketer who analyzes trends, optimizes campaigns, and drives growth. David knows how to reach your target audience.',
    image: '/david-marketer.png',
    skills: ['Campaign Management', 'Analytics', 'A/B Testing', 'Growth Strategy', 'CRM'],
    stats: { tasksCompleted: 18760, satisfaction: 96, responseTime: '< 1 min' },
    icon: TrendingUp,
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 'eve',
    name: 'Eve',
    role: 'Data Analyst',
    description: 'AI data analyst who uncovers insights, visualizes trends, and helps you make data-driven decisions.',
    image: '/eve-analyst.png',
    skills: ['Data Analysis', 'Visualization', 'Reporting', 'SQL', 'Dashboards'],
    stats: { tasksCompleted: 10200, satisfaction: 97, responseTime: '< 2 min' },
    icon: Check,
    color: 'from-cyan-500 to-blue-500',
  },
  {
    id: 'sam',
    name: 'Sam',
    role: 'Customer Support',
    description: 'AI support agent who answers questions, resolves issues, and keeps your customers happy 24/7.',
    image: '/sam-support.png',
    skills: ['Support Tickets', 'Live Chat', 'FAQ', 'Troubleshooting', 'Feedback'],
    stats: { tasksCompleted: 15800, satisfaction: 99, responseTime: '< 1 min' },
    icon: Clock,
    color: 'from-teal-500 to-blue-400',
  },
  {
    id: 'sophia',
    name: 'Sophia',
    role: 'SEO Specialist',
    description: 'AI SEO expert who optimizes your content, audits your site, and boosts your search rankings.',
    image: '/sophia-seo.png',
    skills: ['SEO Audit', 'Keyword Research', 'Content Optimization', 'Backlinks', 'Analytics'],
    stats: { tasksCompleted: 8900, satisfaction: 96, responseTime: '< 2 min' },
    icon: Zap,
    color: 'from-green-400 to-blue-600',
  },
  {
    id: 'mia',
    name: 'Mia',
    role: 'Social Media Manager',
    description: 'AI social media manager who schedules posts, engages your audience, and analyzes performance.',
    image: '/mia-social.png',
    skills: ['Scheduling', 'Engagement', 'Analytics', 'Content Creation', 'Brand Voice'],
    stats: { tasksCompleted: 11200, satisfaction: 98, responseTime: '< 1 min' },
    icon: Palette,
    color: 'from-pink-500 to-yellow-500',
  },
  {
    id: 'paul',
    name: 'Paul',
    role: 'Project Manager',
    description: 'AI project manager who tracks tasks, deadlines, and team progress to keep you on schedule.',
    image: '/paul-pm.png',
    skills: ['Task Tracking', 'Scheduling', 'Reminders', 'Team Coordination', 'Reporting'],
    stats: { tasksCompleted: 9700, satisfaction: 97, responseTime: '< 2 min' },
    icon: Clock,
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 'quinn',
    name: 'Quinn',
    role: 'QA Tester',
    description: 'AI QA tester who reviews code, tests features, and reports bugs to ensure quality.',
    image: '/quinn-qa.png',
    skills: ['Testing', 'Bug Reports', 'Regression', 'Automation', 'Documentation'],
    stats: { tasksCompleted: 8300, satisfaction: 98, responseTime: '< 1 min' },
    icon: Check,
    color: 'from-gray-500 to-blue-700',
  },
  {
    id: 'riley',
    name: 'Riley',
    role: 'Sales Assistant',
    description: 'AI sales assistant who generates leads, drafts outreach, and manages your CRM.',
    image: '/riley-sales.png',
    skills: ['Lead Gen', 'CRM', 'Outreach', 'Follow-up', 'Reporting'],
    stats: { tasksCompleted: 7600, satisfaction: 97, responseTime: '< 2 min' },
    icon: TrendingUp,
    color: 'from-red-500 to-pink-600',
  },
  {
    id: 'harper',
    name: 'Harper',
    role: 'HR Assistant',
    description: 'AI HR assistant who screens resumes, schedules interviews, and answers HR questions.',
    image: '/harper-hr.png',
    skills: ['Screening', 'Scheduling', 'Interviewing', 'HR Policy', 'Onboarding'],
    stats: { tasksCompleted: 6900, satisfaction: 96, responseTime: '< 2 min' },
    icon: Clock,
    color: 'from-purple-400 to-pink-400',
  },
  {
    id: 'luna',
    name: 'Luna',
    role: 'Legal Assistant',
    description: 'AI legal assistant who drafts contracts, reviews documents, and summarizes legal info.',
    image: '/luna-legal.png',
    skills: ['Contracts', 'Document Review', 'Summaries', 'Compliance', 'Research'],
    stats: { tasksCompleted: 5400, satisfaction: 97, responseTime: '< 2 min' },
    icon: Check,
    color: 'from-blue-800 to-gray-600',
  },
  {
    id: 'finley',
    name: 'Finley',
    role: 'Finance Assistant',
    description: 'AI finance assistant who tracks expenses, generates invoices, and summarizes financial data.',
    image: '/finley-finance.png',
    skills: ['Expenses', 'Invoices', 'Summaries', 'Budgeting', 'Reporting'],
    stats: { tasksCompleted: 6100, satisfaction: 98, responseTime: '< 2 min' },
    icon: TrendingUp,
    color: 'from-green-700 to-blue-900',
  },
  {
    id: 'sage',
    name: 'Sage',
    role: 'Researcher',
    description: 'AI researcher who gathers information, summarizes articles, and creates research briefs.',
    image: '/sage-research.png',
    skills: ['Research', 'Summarization', 'Briefs', 'Fact-Checking', 'Analysis'],
    stats: { tasksCompleted: 7200, satisfaction: 97, responseTime: '< 2 min' },
    icon: Zap,
    color: 'from-indigo-500 to-blue-400',
  },
  {
    id: 'taylor',
    name: 'Taylor',
    role: 'Translator',
    description: 'AI translator who translates text between languages and localizes your content.',
    image: '/taylor-translator.png',
    skills: ['Translation', 'Localization', 'Proofreading', 'Multilingual', 'Editing'],
    stats: { tasksCompleted: 6800, satisfaction: 98, responseTime: '< 2 min' },
    icon: Palette,
    color: 'from-yellow-400 to-green-400',
  },
];

export function AIEmployees() {
  const navigate = useNavigate();
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
          if (entry.isIntersecting && index !== -1) {
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 bg-nexus-dark overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 network-grid opacity-20" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-nexus-purple/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-nexus-blue/10 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full glass-light text-nexus-cyan text-sm mb-4">
            Your AI Workforce
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Meet your <span className="gradient-text">AI employees</span>
          </h2>
          <p className="text-lg text-nexus-gray max-w-2xl mx-auto">
            Hire specialized AI agents that work 24/7, never take breaks, and continuously improve. 
            Build your dream team today.
          </p>
        </div>

        {/* Employee cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {employees.map((employee, index) => {
            const Icon = employee.icon;
            const isVisible = visibleCards.has(index);
            return (
              <div
                key={employee.id}
                ref={(el) => { cardRefs.current[index] = el; }}
                className={`group relative transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative h-full gradient-border p-0.5 rounded-xl">
                  <div className="relative h-full bg-nexus-card rounded-xl overflow-hidden card-lift cursor-pointer"
                       onClick={() => setSelectedEmployee(employee)}>
                    {/* Holographic overlay */}
                    <div className="holographic absolute inset-0 z-10 pointer-events-none" />
                    {/* Image container */}
                    <div className="relative h-32 overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${employee.color} opacity-20`} />
                      <img
                        src={employee.image}
                        alt={employee.name}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Status indicator */}
                      <div className="absolute top-2 right-2 flex items-center gap-2 px-2 py-0.5 glass rounded-full">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-xs text-white">Available</span>
                      </div>
                    </div>
                    {/* Content */}
                    <div className="p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`p-1 rounded-lg bg-gradient-to-br ${employee.color}`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-white">{employee.name}</h3>
                          <p className="text-xs text-nexus-cyan">{employee.role}</p>
                        </div>
                      </div>
                      <p className="text-nexus-gray text-xs line-clamp-2 mb-2">
                        {employee.description}
                      </p>
                      {/* Skills tags */}
                      <div className="flex flex-wrap gap-1">
                        {employee.skills.slice(0, 2).map((skill) => (
                          <span
                            key={skill}
                            className="px-1.5 py-0.5 text-[10px] bg-white/5 text-nexus-gray rounded"
                          >
                            {skill}
                          </span>
                        ))}
                        {employee.skills.length > 2 && (
                          <span className="px-1.5 py-0.5 text-[10px] bg-white/5 text-nexus-gray rounded">
                            +{employee.skills.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                    {/* Hover glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${employee.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Employee Detail Dialog */}
      <Dialog open={!!selectedEmployee} onOpenChange={() => setSelectedEmployee(null)}>
        <DialogContent className="max-w-2xl bg-nexus-card border-white/10 text-white">
          {selectedEmployee && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-4">
                  <img
                    src={selectedEmployee.image}
                    alt={selectedEmployee.name}
                    className="w-16 h-16 rounded-xl object-cover"
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
                      <Check className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {selectedEmployee.stats.tasksCompleted.toLocaleString()}
                    </div>
                    <div className="text-xs text-nexus-gray">Tasks Completed</div>
                  </div>
                  <div className="glass p-4 rounded-xl text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-nexus-cyan" />
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {selectedEmployee.stats.satisfaction}%
                    </div>
                    <div className="text-xs text-nexus-gray">Satisfaction</div>
                  </div>
                  <div className="glass p-4 rounded-xl text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-nexus-purple" />
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {selectedEmployee.stats.responseTime}
                    </div>
                    <div className="text-xs text-nexus-gray">Response Time</div>
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

                {/* Actions */}
                <div className="flex gap-4">
                  <Button 
                    onClick={() => navigate('/auth')}
                    className="flex-1 bg-nexus-gradient text-white"
                  >
                    <Zap className="mr-2 w-4 h-4" />
                    Hire {selectedEmployee.name}
                  </Button>
                  <Button 
                    onClick={() => navigate('/auth')}
                    variant="outline" 
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <MessageSquare className="mr-2 w-4 h-4" />
                    Chat First
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}