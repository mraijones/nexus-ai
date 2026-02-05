import { useRef, useEffect, useState } from 'react';
import { FileText, Palette, Code2, TrendingUp, ArrowUpRight } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: React.ElementType;
  gradient: string;
}

const services: Service[] = [
  {
    id: 'content',
    title: 'Content Writing',
    description: 'AI-powered content creation that engages your audience and drives conversions. From blog posts to ad copy.',
    features: ['SEO-optimized articles', 'Social media content', 'Email campaigns', 'Product descriptions'],
    icon: FileText,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'design',
    title: 'Graphic Design',
    description: 'Stunning visuals created by AI designers. Logos, branding, UI/UX, and marketing materials.',
    features: ['Brand identity', 'UI/UX design', 'Marketing assets', 'Illustrations'],
    icon: Palette,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 'development',
    title: 'Software Development',
    description: 'Full-stack development by AI engineers. Build scalable applications with clean, efficient code.',
    features: ['Web applications', 'API development', 'Database design', 'Cloud deployment'],
    icon: Code2,
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    id: 'marketing',
    title: 'Marketing',
    description: 'Data-driven marketing strategies executed by AI marketers. Grow your business intelligently.',
    features: ['Campaign management', 'Analytics & reporting', 'A/B testing', 'Growth hacking'],
    icon: TrendingUp,
    gradient: 'from-orange-500 to-red-500',
  },
];

export function Services() {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
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
      {/* Background */}
      <div className="absolute inset-0 network-grid opacity-20" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-nexus-blue/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-nexus-purple/10 rounded-full blur-3xl animate-float-delayed" />

      {/* SVG connecting lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1d6ee7" />
            <stop offset="50%" stopColor="#7921ed" />
            <stop offset="100%" stopColor="#00e0ff" />
          </linearGradient>
        </defs>
        <path
          d="M 200 200 Q 400 100 600 200 T 1000 200"
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          strokeDasharray="5,5"
          className="animate-pulse"
        />
        <path
          d="M 200 400 Q 400 500 600 400 T 1000 400"
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          strokeDasharray="5,5"
          className="animate-pulse"
          style={{ animationDelay: '0.5s' }}
        />
      </svg>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full glass-light text-nexus-cyan text-sm mb-4">
            Capabilities
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            What they can <span className="gradient-text">do</span>
          </h2>
          <p className="text-lg text-nexus-gray max-w-2xl mx-auto">
            Our AI employees are trained on millions of tasks across various domains. 
            They deliver professional-grade work at scale.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isVisible = visibleCards.has(index);
            const isHovered = hoveredCard === service.id;
            
            return (
              <div
                key={service.id}
                ref={(el) => { cardRefs.current[index] = el; }}
                className={`group relative transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`relative h-full p-8 rounded-2xl glass transition-all duration-500 ${
                  isHovered ? 'bg-white/10 scale-[1.02]' : ''
                }`}>
                  {/* Gradient border on hover */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${service.gradient} mb-6`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Title */}
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                      <ArrowUpRight className={`w-5 h-5 text-nexus-gray transition-all duration-300 ${
                        isHovered ? 'text-white translate-x-1 -translate-y-1' : ''
                      }`} />
                    </div>

                    {/* Description */}
                    <p className="text-nexus-gray mb-6">{service.description}</p>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-3">
                      {service.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-2 text-sm text-nexus-gray"
                        >
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${service.gradient}`} />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pulse effect on hover */}
                  {isHovered && (
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-10 animate-pulse`} />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '50M+', label: 'Tasks Completed' },
            { value: '99.9%', label: 'Accuracy Rate' },
            { value: '24/7', label: 'Availability' },
            { value: '< 1min', label: 'Avg Response' },
          ].map((stat, index) => (
            <div key={index} className="text-center glass p-6 rounded-xl">
              <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
              <div className="text-sm text-nexus-gray">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
