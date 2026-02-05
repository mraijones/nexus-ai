import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, ClipboardList, CheckCircle, Users, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Choose Your Employee',
    description: 'Browse our roster of AI specialists and select the perfect match for your needs. Each employee has unique skills and expertise.',
    icon: UserPlus,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    number: '02',
    title: 'Assign Tasks',
    description: 'Simply describe what you need. Our AI employees understand natural language and can break down complex projects into actionable steps.',
    icon: ClipboardList,
    color: 'from-purple-500 to-pink-500',
  },
  {
    number: '03',
    title: 'Review & Iterate',
    description: 'Get results in minutes, not days. Provide feedback and watch your AI employee learn and improve with every iteration.',
    icon: CheckCircle,
    color: 'from-green-500 to-emerald-500',
  },
  {
    number: '04',
    title: 'Scale Your Team',
    description: 'Need more help? Hire additional AI employees instantly. No onboarding, no training, no delays.',
    icon: Users,
    color: 'from-orange-500 to-red-500',
  },
];

export function HowItWorks() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveStep((step) => (step + 1) % steps.length);
          return 0;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="relative py-24 bg-nexus-dark overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 network-grid opacity-20" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-nexus-purple/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-nexus-blue/10 rounded-full blur-3xl -translate-y-1/2" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full glass-light text-nexus-cyan text-sm mb-4">
            Process
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            How they <span className="gradient-text">work</span>
          </h2>
          <p className="text-lg text-nexus-gray max-w-2xl mx-auto">
            Getting started is simple. Hire your AI team in minutes and start seeing results immediately.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Central line - desktop only */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2">
            {/* Animated progress line */}
            <div 
              className="absolute top-0 left-0 w-full bg-nexus-gradient transition-all duration-300"
              style={{ height: `${((activeStep + progress / 100) / steps.length) * 100}%` }}
            />
            
            {/* Flowing particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-nexus-cyan rounded-full animate-float"
                  style={{
                    left: '50%',
                    top: `${i * 25}%`,
                    transform: 'translateX(-50%)',
                    animationDelay: `${i * 0.5}s`,
                    opacity: 0.6,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Steps grid */}
          <div className="space-y-12 lg:space-y-24">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === activeStep;
              const isPast = index < activeStep;
              
              return (
                <div
                  key={step.number}
                  className={`relative grid lg:grid-cols-2 gap-8 items-center transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  {/* Content - alternating sides */}
                  <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className={`relative p-8 rounded-2xl glass transition-all duration-500 ${
                      isActive ? 'bg-white/10 scale-105' : ''
                    }`}>
                      {/* Step number */}
                      <div className={`absolute -top-4 -left-4 w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-lg`}>
                        {step.number}
                      </div>

                      {/* Icon */}
                      <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${step.color} mb-4 mt-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>

                      {/* Description */}
                      <p className="text-nexus-gray">{step.description}</p>

                      {/* Progress indicator for active step */}
                      {isActive && (
                        <div className="mt-6">
                          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className={`h-full bg-gradient-to-r ${step.color} transition-all duration-100`}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Status indicator */}
                      <div className="absolute top-4 right-4">
                        {isPast ? (
                          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                          </div>
                        ) : isActive ? (
                          <div className="w-8 h-8 rounded-full bg-nexus-cyan/20 flex items-center justify-center animate-pulse">
                            <div className="w-3 h-3 rounded-full bg-nexus-cyan" />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  {/* Visual - alternating sides */}
                  <div className={`${index % 2 === 1 ? 'lg:order-1' : ''} hidden lg:flex justify-center`}>
                    <div className={`relative w-48 h-48 rounded-2xl bg-gradient-to-br ${step.color} opacity-20 flex items-center justify-center`}>
                      <div className="absolute inset-4 rounded-xl bg-nexus-card flex items-center justify-center">
                        <Icon className="w-16 h-16 text-white/50" />
                      </div>
                      
                      {/* Orbiting elements */}
                      <div className="absolute inset-0 animate-spin" style={{ animationDuration: '10s' }}>
                        <div className={`absolute top-0 left-1/2 w-3 h-3 rounded-full bg-gradient-to-br ${step.color} -translate-x-1/2 -translate-y-1/2`} />
                      </div>
                    </div>
                  </div>

                  {/* Connection arrow - mobile only */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center">
                      <ArrowRight className="w-6 h-6 text-nexus-gray rotate-90" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-nexus-gray mb-4">Ready to transform your workflow?</p>
          <button 
            onClick={() => navigate('/auth')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-nexus-gradient text-white font-semibold rounded-xl hover:opacity-90 transition-opacity group"
          >
            Start Hiring
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}