import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';

export function CTA() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [decodedText, setDecodedText] = useState('');
  const sectionRef = useRef<HTMLDivElement>(null);
  const finalText = 'Ready to hire your AI team?';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Decoder effect
  useEffect(() => {
    if (!isVisible) return;

    let iteration = 0;
    const interval = setInterval(() => {
      setDecodedText(
        finalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) return finalText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      iteration += 1 / 3;

      if (iteration >= finalText.length) {
        clearInterval(interval);
        setDecodedText(finalText);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="relative py-24 bg-nexus-dark overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        {/* Grid */}
        <div className="absolute inset-0 network-grid opacity-30" />

        {/* Central glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
          <div className="absolute inset-0 bg-nexus-gradient opacity-20 blur-3xl animate-pulse-glow" />
        </div>

        {/* Orbiting particles */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-nexus-cyan rounded-full"
              style={{
                left: '50%',
                top: '50%',
                transform: `rotate(${i * 45}deg) translateX(${200 + (i % 2) * 100}px)`,
                animation: `orbit ${8 + i * 2}s linear infinite`,
                opacity: 0.6,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-8">
            <Sparkles className="w-4 h-4 text-nexus-cyan" />
            <span className="text-sm text-nexus-gray">Start your free trial today</span>
          </div>

          {/* Headline with decoder effect */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 min-h-[1.2em]">
            {decodedText || '\u00A0'}
          </h2>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-nexus-gray mb-10 max-w-xl mx-auto">
            Join 10,000+ companies already building their AI workforce.
            No credit card required. Cancel anytime.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/auth')}
              size="lg"
              className="magnetic-btn bg-nexus-gradient text-white font-semibold px-10 py-7 text-lg rounded-xl hover:opacity-90 transition-opacity group relative overflow-hidden"
            >
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center">
                <Zap className="mr-2 w-5 h-5" />
                Get started now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
            <Button
              onClick={() => navigate('/auth')}
              size="lg"
              variant="outline"
              className="magnetic-btn border-white/20 text-white hover:bg-white/10 px-10 py-7 text-lg rounded-xl"
            >
              Schedule a demo
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-nexus-gray text-sm">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-green-400" />
              </div>
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-green-400" />
              </div>
              <span>No credit card</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-green-400" />
              </div>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for orbit animation */}
      <style>{`
        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(250px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(250px) rotate(-360deg);
          }
        }
      `}</style>
    </section>
  );
}
