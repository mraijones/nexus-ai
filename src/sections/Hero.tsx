import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePos({ x, y });
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      if (hero) {
        hero.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  useEffect(() => {
    if (imageRef.current) {
      const rotateX = mousePos.y * -10;
      const rotateY = mousePos.x * 10;
      imageRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  }, [mousePos]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-nexus-dark"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-nexus-blue/20 via-transparent to-transparent opacity-50" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 network-grid opacity-30" />
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-nexus-purple/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-nexus-blue/20 rounded-full blur-3xl animate-float-delayed" />
      <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-nexus-cyan/10 rounded-full blur-3xl animate-float" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full py-20">
          {/* Left content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light">
              <Sparkles className="w-4 h-4 text-nexus-cyan" />
              <span className="text-sm text-nexus-gray">The Future of Work is Here</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <span className="text-white">Meet your</span>
              <br />
              <span className="gradient-text">AI employees</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-nexus-gray max-w-xl mx-auto lg:mx-0">
              Build your AI team with Nexus. Hire AI employees to automate your business 
              and get more done. Scale without limits.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                onClick={() => navigate('/auth')}
                size="lg" 
                className="magnetic-btn bg-nexus-gradient text-white font-semibold px-8 py-6 text-lg rounded-xl hover:opacity-90 transition-opacity group"
              >
                Get started
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                onClick={() => navigate('/auth')}
                size="lg" 
                variant="outline" 
                className="magnetic-btn border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl"
              >
                Learn more
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-4">
              <div>
                <div className="text-3xl font-bold text-white">10K+</div>
                <div className="text-sm text-nexus-gray">AI Employees Hired</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-sm text-nexus-gray">Companies</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">99.9%</div>
                <div className="text-sm text-nexus-gray">Uptime</div>
              </div>
            </div>
          </div>

          {/* Right content - AI Figures */}
          <div className="relative flex justify-center lg:justify-end">
            <div 
              ref={imageRef}
              className="relative w-full max-w-lg lg:max-w-xl transition-transform duration-300 ease-out"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-nexus-gradient opacity-30 blur-3xl scale-110 animate-pulse-glow" />
              
              {/* Main AI figures image */}
              <img
                src="/hero-ai-figures.png"
                alt="AI Employees"
                className="relative z-10 w-full h-auto drop-shadow-2xl"
              />
              
              {/* Scanline effect */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-nexus-cyan/50 to-transparent animate-scanline" />
              </div>

              {/* Floating badges */}
              <div className="absolute -left-4 top-1/4 glass px-4 py-2 rounded-lg animate-float">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs text-white">Online 24/7</span>
                </div>
              </div>

              <div className="absolute -right-4 bottom-1/4 glass px-4 py-2 rounded-lg animate-float-delayed">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-nexus-cyan rounded-full animate-pulse" />
                  <span className="text-xs text-white">Learning...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-nexus-dark to-transparent" />
    </section>
  );
}
