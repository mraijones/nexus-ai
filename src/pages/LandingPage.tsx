import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ParticleBackground } from '@/components/ParticleBackground';
import { EmployeeCard } from '@/components/EmployeeCard';
import AgentTerminal from '@/components/AgentTerminal';
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Clock, 
  Users, 
  Target, 
  TrendingUp,
  Shield,
  ChevronDown,
  Check,
  X,
  Star,
  Mail,
} from 'lucide-react';
import { all60Employees, getTier4Personas } from '@/data/complete60Employees';
import type { Employee } from '@/data/complete60Employees';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

export function LandingPage() {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [email, setEmail] = useState('');

  const tier4Employees = getTier4Personas();
  
  // Get employees by tier for the grid
  const tier1Employees = all60Employees.filter(e => e.tier === 1);
  const tier2Employees = all60Employees.filter(e => e.tier === 2);
  const tier3Employees = all60Employees.filter(e => e.tier === 3);

  const features = [
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Your AI employees never sleep, take breaks, or go on vacation',
    },
    {
      icon: Zap,
      title: 'No Training Required',
      description: 'Instantly productive from day one with pre-trained expertise',
    },
    {
      icon: Target,
      title: 'Instant Deploy',
      description: 'Hire and deploy in seconds, not weeks or months',
    },
    {
      icon: Users,
      title: 'Diversity',
      description: 'Access diverse perspectives and specialized skills instantly',
    },
    {
      icon: Shield,
      title: 'Consistent Quality',
      description: 'Every task completed to the same high standard, every time',
    },
    {
      icon: TrendingUp,
      title: 'Infinite Scalability',
      description: 'Scale your workforce up or down instantly as needs change',
    },
  ];

  const howItWorksSteps = [
    {
      number: 1,
      title: 'Browse',
      description: 'Explore our diverse AI workforce across 4 tiers',
      icon: Users,
    },
    {
      number: 2,
      title: 'Hire',
      description: 'Select your employee and activate with one click',
      icon: Zap,
    },
    {
      number: 3,
      title: 'Assign',
      description: 'Give tasks and watch them get done perfectly',
      icon: Target,
    },
    {
      number: 4,
      title: 'Profit',
      description: 'Save time, reduce costs, and grow your business',
      icon: TrendingUp,
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'CEO, TechStart',
      avatar: 'SC',
      content: 'NEXUS AI transformed our operations. We hired 5 employees and productivity went through the roof!',
      rating: 5,
    },
    {
      name: 'Michael Rodriguez',
      role: 'Founder, GrowthCo',
      avatar: 'MR',
      content: 'Best investment ever. Our AI marketing director generates more leads than our entire team did before.',
      rating: 5,
    },
    {
      name: 'Emily Watson',
      role: 'VP Operations, ScaleUp',
      avatar: 'EW',
      content: 'The 30-day guarantee gave us confidence. Now we cannot imagine running without our AI workforce.',
      rating: 5,
    },
  ];

  const pricingTiers = [
    {
      tier: 'Tier 1',
      name: 'Entry Level',
      description: 'Perfect for getting started',
      monthlyPrice: 150,
      annualPrice: 1620,
      employees: '15 roles',
      features: [
        'Basic AI employees',
        'Email & chat support',
        'Standard response times',
        'Core functionality',
        'Monthly billing',
      ],
      popular: false,
    },
    {
      tier: 'Tier 2',
      name: 'Professional',
      description: 'Best for growing teams',
      monthlyPrice: 450,
      annualPrice: 4860,
      employees: '20 roles',
      features: [
        'Advanced AI employees',
        'Priority support',
        'Faster response times',
        'Advanced features',
        'Team collaboration',
        'Analytics dashboard',
      ],
      popular: true,
    },
    {
      tier: 'Tier 3',
      name: 'Expert',
      description: 'For serious businesses',
      monthlyPrice: 800,
      annualPrice: 8640,
      employees: '17 roles',
      features: [
        'Senior AI employees',
        '24/7 dedicated support',
        'Instant response',
        'All features',
        'Custom integrations',
        'Advanced analytics',
        'API access',
      ],
      popular: false,
    },
    {
      tier: 'Tier 4',
      name: 'Executive',
      description: 'Enterprise leadership',
      monthlyPrice: 1299,
      annualPrice: 14029,
      employees: '8 named personas',
      features: [
        'Executive AI leaders',
        'White-glove support',
        'Strategic consultation',
        'Everything included',
        'Custom development',
        'SLA guarantee',
        'Dedicated success manager',
      ],
      popular: false,
    },
  ];

  const faqItems = [
    {
      question: 'How does the 30-day lock-in work?',
      answer: 'When you hire an AI employee, you commit to keeping them for at least 30 days. This ensures proper integration and allows you to see the full value. After 30 days, you can fire them at any time with no penalty.',
    },
    {
      question: 'Can I hire multiple employees?',
      answer: 'Absolutely! You can hire as many AI employees as you need across all tiers. Each employee is billed separately based on their tier pricing.',
    },
    {
      question: 'What happens if I am not satisfied?',
      answer: 'We offer a satisfaction guarantee. If you are not happy with an employee\'s performance, contact our support team and we will work with you to find a solution or provide a credit.',
    },
    {
      question: 'How do I assign tasks to my employees?',
      answer: 'Simply log into your dashboard, select an employee, and describe the task you need completed. Our AI will understand and execute it perfectly.',
    },
    {
      question: 'Are there any setup fees?',
      answer: 'No! There are no setup fees, hidden costs, or long-term contracts. Pay only for the employees you hire on a monthly basis.',
    },
    {
      question: 'Can I upgrade or downgrade tiers?',
      answer: 'Yes! You can change your employees at any time. Higher tier employees offer more advanced capabilities and strategic thinking.',
    },
  ];

  const competitorComparison = [
    { feature: 'Number of employees', nexus: '60', sintra: '~20', lindy: '~15', noca: '~10' },
    { feature: '30-day lock-in', nexus: true, sintra: false, lindy: false, noca: false },
    { feature: 'Named executive personas', nexus: true, sintra: false, lindy: false, noca: false },
    { feature: 'Tier-based pricing', nexus: true, sintra: false, lindy: true, noca: false },
    { feature: '24/7 Support', nexus: true, sintra: false, lindy: true, noca: false },
    { feature: 'Custom integrations', nexus: true, sintra: true, lindy: true, noca: false },
  ];

  const handleQuickView = (employee: Employee) => {
    setSelectedEmployee(employee);
    setQuickViewOpen(true);
  };

  const handleHire = (employee: Employee) => {
    // Navigate to checkout with employee details
    navigate('/checkout', { state: { employee } });
  };

  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-nexus-dark text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ParticleBackground />
        
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-radial from-nexus-cyan/20 via-transparent to-transparent opacity-50 animate-pulse-slow" />
        <div className="absolute inset-0 bg-gradient-radial from-nexus-pink/20 via-transparent to-transparent opacity-30 animate-pulse-slow" style={{ animationDelay: '1s' }} />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light backdrop-blur-lg animate-fade-in">
              <Sparkles className="w-4 h-4 text-nexus-cyan animate-pulse" />
              <span className="text-sm text-white font-medium">Elite AI Workforce for Serious Business</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <span className="text-white">Meet Your</span>
              <br />
              <span className="bg-gradient-to-r from-nexus-cyan via-nexus-pink to-nexus-cyan bg-clip-text text-transparent animate-gradient">
                AI Workforce Revolution
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl sm:text-2xl text-nexus-gray max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              60 elite AI employees across specialized roles. No training required. Deploy instantly. <span className="text-nexus-cyan font-semibold">Scale your business 10x.</span>
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <Button
                onClick={() => navigate('/auth')}
                size="lg"
                className="magnetic-btn bg-nexus-gradient text-white font-bold px-8 py-6 text-lg rounded-xl hover:scale-105 transition-transform shadow-2xl shadow-nexus-cyan/50 group"
              >
                Get Started Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={() => document.getElementById('employees')?.scrollIntoView({ behavior: 'smooth' })}
                size="lg"
                variant="outline"
                className="magnetic-btn border-2 border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl backdrop-blur-lg"
              >
                Browse Elite Employees
                <ChevronDown className="ml-2 w-5 h-5" />
              </Button>
            </div>

            {/* Value proposition badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-nexus-cyan/20 border border-nexus-cyan/30 backdrop-blur-lg animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
              <span className="text-sm text-nexus-cyan font-medium">✓ Premium AI workforce • ✓ 30-day commitment • ✓ Professional results guaranteed</span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-8 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-nexus-cyan to-nexus-pink bg-clip-text text-transparent">60+</div>
                <div className="text-sm text-nexus-gray mt-1">Elite AI Employees</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-nexus-cyan to-nexus-pink bg-clip-text text-transparent">24/7</div>
                <div className="text-sm text-nexus-gray mt-1">Always Available</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-nexus-cyan to-nexus-pink bg-clip-text text-transparent">10x</div>
                <div className="text-sm text-nexus-gray mt-1">Productivity Boost</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-nexus-cyan" />
        </div>
      </section>

      {/* Agent Terminal Showcase - Live Demo */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-nexus-dark/80">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="bg-nexus-cyan/20 text-nexus-cyan border-nexus-cyan/30 text-sm px-4 py-2 mb-4 inline-block">
              LIVE DEMONSTRATION
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
              Watch AI Employees in Action
            </h2>
            <p className="text-xl text-nexus-gray max-w-3xl mx-auto">
              See how our AI workforce executes tasks in real-time with precision and professionalism
            </p>
          </div>

          <AgentTerminal
            agentName="AURORA-7"
            missionContext="Enterprise client communication strategy"
            workType="STRATEGIC OUTREACH"
            liveOutput={`> ANALYZING TARGET AUDIENCE DEMOGRAPHICS...
> CRAFTING PERSONALIZED MESSAGE FRAMEWORK...
> OPTIMIZING FOR CONVERSION AND ENGAGEMENT...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Subject: Transforming Your Enterprise Operations

Dear Leadership Team,

I've completed a comprehensive analysis of your current 
operational infrastructure and identified three critical 
optimization opportunities:

1. WORKFLOW AUTOMATION
   • 47% efficiency gain potential
   • ROI projection: 312% within 6 months
   
2. STRATEGIC RESOURCE ALLOCATION  
   • Reallocate $2.3M in redundant processes
   • Deploy to high-impact growth initiatives

3. COMPETITIVE POSITIONING
   • Market gap identified in Q2 expansion
   • First-mover advantage window: 90 days

Our AI workforce stands ready to execute these initiatives
with precision, 24/7 availability, and zero overhead costs.

Next steps: Schedule 30-minute strategy session to discuss
implementation roadmap and expected outcomes.

Best regards,
Aurora-7 | Strategic Operations Director
NEXUS AI Workforce Division

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

> TASK COMPLETED IN 2.3 SECONDS
> QUALITY SCORE: 98.7%
> READY FOR NEXT ASSIGNMENT...`}
          />

          <div className="text-center mt-8">
            <p className="text-nexus-gray text-sm">
              This is a live example of how our Tier 4 Strategic Executives operate in real business scenarios
            </p>
          </div>
        </div>
      </section>

      {/* Feature Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-nexus-dark via-nexus-dark/95 to-nexus-dark" />
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
              Why Choose NEXUS AI?
            </h2>
            <p className="text-xl text-nexus-gray max-w-3xl mx-auto">
              Revolutionary advantages that traditional hiring simply cannot match
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <Card
                key={idx}
                className="bg-nexus-card border-white/10 hover:border-nexus-cyan/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-nexus-cyan/20 group"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-nexus-cyan to-nexus-pink flex items-center justify-center group-hover:scale-110 transition-transform">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                    <p className="text-nexus-gray">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 60 Employees Grid - Organized by Tier */}
      <section id="employees" className="py-20 px-4 sm:px-6 lg:px-8 bg-nexus-dark/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
              Meet Your Elite Workforce
            </h2>
            <p className="text-xl text-nexus-gray max-w-3xl mx-auto">
              60 elite AI employees across 4 tiers, ready to transform your business
            </p>
          </div>

          {/* Tier 1 */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-lg px-4 py-2">
                Tier 1 - Entry Level
              </Badge>
              <span className="text-nexus-gray">$150-280/mo • 15 roles</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tier1Employees.slice(0, 8).map((employee) => (
                <EmployeeCard
                  key={employee.id}
                  employee={employee}
                  onQuickView={handleQuickView}
                  onHire={handleHire}
                  variant="default"
                />
              ))}
            </div>
            {tier1Employees.length > 8 && (
              <div className="text-center mt-6">
                <Button
                  variant="outline"
                  onClick={() => navigate('/directory', { state: { tier: 1 } })}
                  className="border-white/20 hover:bg-white/10"
                >
                  View All {tier1Employees.length} Tier 1 Employees
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Tier 2 */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-lg px-4 py-2">
                Tier 2 - Professional
              </Badge>
              <span className="text-nexus-gray">$350-600/mo • 20 roles</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tier2Employees.slice(0, 8).map((employee) => (
                <EmployeeCard
                  key={employee.id}
                  employee={employee}
                  onQuickView={handleQuickView}
                  onHire={handleHire}
                  variant="default"
                />
              ))}
            </div>
            {tier2Employees.length > 8 && (
              <div className="text-center mt-6">
                <Button
                  variant="outline"
                  onClick={() => navigate('/directory', { state: { tier: 2 } })}
                  className="border-white/20 hover:bg-white/10"
                >
                  View All {tier2Employees.length} Tier 2 Employees
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Tier 3 */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-lg px-4 py-2">
                Tier 3 - Expert
              </Badge>
              <span className="text-nexus-gray">$740-980/mo • 17 roles</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tier3Employees.slice(0, 8).map((employee) => (
                <EmployeeCard
                  key={employee.id}
                  employee={employee}
                  onQuickView={handleQuickView}
                  onHire={handleHire}
                  variant="default"
                />
              ))}
            </div>
            {tier3Employees.length > 8 && (
              <div className="text-center mt-6">
                <Button
                  variant="outline"
                  onClick={() => navigate('/directory', { state: { tier: 3 } })}
                  className="border-white/20 hover:bg-white/10"
                >
                  View All {tier3Employees.length} Tier 3 Employees
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Tier 4 Spotlight */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-nexus-dark to-nexus-dark/80 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-radial from-nexus-pink/10 via-transparent to-transparent opacity-50" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-nexus-cyan to-transparent" />
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-12">
            <Badge className="bg-nexus-cyan/20 text-nexus-cyan border-nexus-cyan/30 text-sm px-4 py-2 mb-4">
              LIMITED AVAILABILITY
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
              <span className="bg-gradient-to-r from-nexus-cyan via-nexus-pink to-nexus-cyan bg-clip-text text-transparent">
                Tier 4 Strategic Executives
              </span>
            </h2>
            <p className="text-xl text-nexus-gray max-w-3xl mx-auto">
              Meet our elite C-suite AI leaders. 8 named personas bringing executive-level strategic thinking to your business.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {tier4Employees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onQuickView={handleQuickView}
                onHire={handleHire}
                variant="featured"
              />
            ))}
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-nexus-pink/20 border border-nexus-pink/30 rounded-lg text-nexus-pink">
              <Star className="w-5 h-5" />
              <span className="font-semibold">Only 100 Tier 4 spots available globally</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-nexus-dark">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
              How It Works
            </h2>
            <p className="text-xl text-nexus-gray max-w-3xl mx-auto">
              Get started in minutes, not months
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step, idx) => (
              <div key={idx} className="relative">
                {idx < howItWorksSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-nexus-cyan to-nexus-pink" />
                )}
                <Card className="bg-nexus-card border-white/10 hover:border-nexus-cyan/50 transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-nexus-cyan to-nexus-pink flex items-center justify-center">
                          <step.icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-nexus-pink flex items-center justify-center text-white font-bold text-sm">
                          {step.number}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white">{step.title}</h3>
                      <p className="text-nexus-gray">{step.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-nexus-dark/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
              Trusted by Forward-Thinking Leaders
            </h2>
            <p className="text-xl text-nexus-gray max-w-3xl mx-auto">
              Join thousands of businesses transforming their operations with NEXUS AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="bg-nexus-card border-white/10 hover:border-nexus-cyan/30 transition-all">
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-nexus-pink text-nexus-pink" />
                      ))}
                    </div>
                    <p className="text-white italic">{testimonial.content}</p>
                    <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-nexus-cyan to-nexus-pink flex items-center justify-center text-white font-bold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="text-white font-semibold">{testimonial.name}</div>
                        <div className="text-nexus-gray text-sm">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing / Tier Comparison */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-nexus-dark">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-nexus-gray max-w-3xl mx-auto mb-8">
              Pay per employee. No hidden fees. Cancel anytime after 30 days.
            </p>
            
            {/* Billing toggle */}
            <div className="inline-flex items-center gap-4 p-1 bg-nexus-card rounded-lg border border-white/10">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-md transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-nexus-gradient text-white font-semibold'
                    : 'text-nexus-gray hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-6 py-2 rounded-md transition-all relative ${
                  billingCycle === 'annual'
                    ? 'bg-nexus-gradient text-white font-semibold'
                    : 'text-nexus-gray hover:text-white'
                }`}
              >
                Annual
                <Badge className="absolute -top-2 -right-2 bg-nexus-pink text-white text-xs">
                  Save 10%
                </Badge>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingTiers.map((tier, idx) => (
              <Card
                key={idx}
                className={`relative ${
                  tier.popular
                    ? 'bg-nexus-card border-nexus-cyan shadow-2xl shadow-nexus-cyan/20 scale-105'
                    : 'bg-nexus-card border-white/10'
                } transition-all duration-300 hover:scale-105 hover:shadow-xl`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-nexus-gradient text-white font-bold px-4 py-1">
                      MOST POPULAR
                    </Badge>
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">{tier.name}</h3>
                      <p className="text-sm text-nexus-gray">{tier.description}</p>
                    </div>
                    
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-white">
                          ${billingCycle === 'monthly' ? tier.monthlyPrice : Math.round(tier.annualPrice / 12)}
                        </span>
                        <span className="text-nexus-gray">/mo</span>
                      </div>
                      <div className="text-sm text-nexus-gray mt-1">
                        {billingCycle === 'annual' && `$${tier.annualPrice}/year billed annually`}
                      </div>
                      <div className="text-sm text-nexus-cyan mt-1">{tier.employees}</div>
                    </div>

                    <Button
                      onClick={() => navigate('/auth')}
                      className={
                        tier.popular
                          ? 'w-full bg-nexus-gradient hover:opacity-90'
                          : 'w-full bg-white/10 hover:bg-white/20'
                      }
                    >
                      Get Started
                    </Button>

                    <div className="space-y-3 pt-4 border-t border-white/10">
                      {tier.features.map((feature, featureIdx) => (
                        <div key={featureIdx} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-nexus-cyan flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-nexus-gray">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-nexus-gray">
              All plans include 30-day lock-in period • Cancel anytime after • No setup fees
            </p>
          </div>
        </div>
      </section>

      {/* Why NEXUS AI / Competitive Advantages */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-nexus-dark/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
              Why NEXUS AI Wins
            </h2>
            <p className="text-xl text-nexus-gray max-w-3xl mx-auto">
              Compare us to the competition and see why we are the clear choice
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Card className="bg-nexus-card border-white/10">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left p-4 text-white font-semibold">Feature</th>
                        <th className="text-center p-4">
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-nexus-cyan font-bold">NEXUS AI</span>
                            <Badge className="bg-nexus-gradient text-white text-xs">Best</Badge>
                          </div>
                        </th>
                        <th className="text-center p-4 text-nexus-gray">Sintra</th>
                        <th className="text-center p-4 text-nexus-gray">Lindy</th>
                        <th className="text-center p-4 text-nexus-gray">Noca</th>
                      </tr>
                    </thead>
                    <tbody>
                      {competitorComparison.map((row, idx) => (
                        <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-white">{row.feature}</td>
                          <td className="text-center p-4">
                            {typeof row.nexus === 'boolean' ? (
                              row.nexus ? (
                                <Check className="w-6 h-6 text-nexus-cyan mx-auto" />
                              ) : (
                                <X className="w-6 h-6 text-red-500 mx-auto" />
                              )
                            ) : (
                              <span className="text-nexus-cyan font-semibold">{row.nexus}</span>
                            )}
                          </td>
                          <td className="text-center p-4">
                            {typeof row.sintra === 'boolean' ? (
                              row.sintra ? (
                                <Check className="w-6 h-6 text-green-500 mx-auto" />
                              ) : (
                                <X className="w-6 h-6 text-nexus-gray mx-auto" />
                              )
                            ) : (
                              <span className="text-nexus-gray">{row.sintra}</span>
                            )}
                          </td>
                          <td className="text-center p-4">
                            {typeof row.lindy === 'boolean' ? (
                              row.lindy ? (
                                <Check className="w-6 h-6 text-green-500 mx-auto" />
                              ) : (
                                <X className="w-6 h-6 text-nexus-gray mx-auto" />
                              )
                            ) : (
                              <span className="text-nexus-gray">{row.lindy}</span>
                            )}
                          </td>
                          <td className="text-center p-4">
                            {typeof row.noca === 'boolean' ? (
                              row.noca ? (
                                <Check className="w-6 h-6 text-green-500 mx-auto" />
                              ) : (
                                <X className="w-6 h-6 text-nexus-gray mx-auto" />
                              )
                            ) : (
                              <span className="text-nexus-gray">{row.noca}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-nexus-dark">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-nexus-gray">
              Everything you need to know about NEXUS AI
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="bg-nexus-card border border-white/10 rounded-lg px-6 data-[state=open]:border-nexus-cyan/50"
              >
                <AccordionTrigger className="text-left text-white hover:text-nexus-cyan transition-colors">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-nexus-gray">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-nexus-dark to-nexus-dark/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-nexus-cyan/10 via-transparent to-transparent" />
        
        <div className="container mx-auto max-w-4xl relative z-10">
          <Card className="bg-nexus-card border-nexus-cyan/30 shadow-2xl shadow-nexus-cyan/20">
            <CardContent className="p-12">
              <div className="text-center space-y-6">
                <Mail className="w-16 h-16 text-nexus-cyan mx-auto" />
                <h2 className="text-3xl sm:text-4xl font-bold text-white">
                  Stay Updated
                </h2>
                <p className="text-lg text-nexus-gray max-w-2xl mx-auto">
                  Join our newsletter to get updates on new AI employees, features, and exclusive offers
                </p>
                
                <form onSubmit={handleNewsletterSignup} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 bg-nexus-dark border-white/20 text-white placeholder:text-nexus-gray focus:border-nexus-cyan"
                  />
                  <Button type="submit" className="bg-nexus-gradient hover:opacity-90 px-8">
                    Subscribe
                  </Button>
                </form>
                
                <p className="text-sm text-nexus-gray">
                  No spam. Unsubscribe anytime.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-nexus-dark text-center">
        <div className="container mx-auto max-w-4xl space-y-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-nexus-gray">
            Join successful businesses already using NEXUS AI to scale faster and work smarter
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/auth')}
              size="lg"
              className="bg-nexus-gradient text-white font-bold px-12 py-6 text-lg rounded-xl hover:scale-105 transition-transform shadow-2xl shadow-nexus-cyan/50"
            >
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              onClick={() => navigate('/directory')}
              size="lg"
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white/10 px-12 py-6 text-lg rounded-xl"
            >
              Browse All 60 Employees
            </Button>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      <Dialog open={quickViewOpen} onOpenChange={setQuickViewOpen}>
        <DialogContent className="bg-nexus-card border-white/20 text-white max-w-2xl">
          {selectedEmployee && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  {selectedEmployee.persona || selectedEmployee.role}
                </DialogTitle>
                <DialogDescription className="text-nexus-gray">
                  {selectedEmployee.role}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${
                    selectedEmployee.tier === 1 ? 'from-blue-500 to-cyan-500' :
                    selectedEmployee.tier === 2 ? 'from-purple-500 to-pink-500' :
                    selectedEmployee.tier === 3 ? 'from-orange-500 to-red-500' :
                    'from-nexus-cyan to-nexus-pink'
                  } flex items-center justify-center`}>
                    <span className="text-3xl font-bold text-white">
                      {selectedEmployee.persona?.charAt(0) || selectedEmployee.role.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <Badge className="mb-2">Tier {selectedEmployee.tier} - ${selectedEmployee.pricing}/mo</Badge>
                    <p className="text-nexus-gray">{selectedEmployee.authorityLevel} Authority</p>
                    <p className="text-nexus-gray">{selectedEmployee.availability}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2">Description</h4>
                  <p className="text-nexus-gray">{selectedEmployee.description}</p>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedEmployee.skills.map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="bg-white/5 border-white/20">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2">Responsibilities</h4>
                  <ul className="list-disc list-inside space-y-1 text-nexus-gray">
                    {selectedEmployee.responsibilities.map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2">Boundaries</h4>
                  <ul className="list-disc list-inside space-y-1 text-nexus-gray">
                    {selectedEmployee.boundaries.map((boundary, idx) => (
                      <li key={idx}>{boundary}</li>
                    ))}
                  </ul>
                </div>

                <Button
                  onClick={() => {
                    setQuickViewOpen(false);
                    handleHire(selectedEmployee);
                  }}
                  className="w-full bg-nexus-gradient hover:opacity-90"
                  size="lg"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Hire {selectedEmployee.persona || selectedEmployee.role} Now
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default LandingPage;
