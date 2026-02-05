import { useRef, useEffect, useState } from 'react';
import { Quote, Star } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'CEO',
    company: 'TechStart Inc.',
    image: '/testimonial-sarah.jpg',
    quote: 'Nexus has completely transformed how we operate. Our AI team handles content creation, design, and customer support 24/7. We have scaled our output by 10x without adding headcount.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'CTO',
    company: 'InnovateLabs',
    image: '/testimonial-michael.jpg',
    quote: 'The quality of work from our AI employees is remarkable. Charlie, our AI developer, shipped a complete API integration in under 2 hours. What used to take days now takes minutes.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Marketing Director',
    company: 'GrowthCo',
    image: '/testimonial-emily.jpg',
    quote: 'David, our AI marketer, manages campaigns across 5 channels simultaneously. The ROI has been incredible. We have cut our marketing costs by 60% while doubling our reach.',
    rating: 5,
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 bg-nexus-dark overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-nexus-purple/20 via-transparent to-transparent opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-nexus-blue/10 rounded-full blur-3xl" />
      </div>

      {/* Glass panels floating effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute glass rounded-2xl animate-float"
            style={{
              width: `${100 + Math.random() * 200}px`,
              height: `${100 + Math.random() * 200}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.05,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full glass-light text-nexus-cyan text-sm mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            What clients <span className="gradient-text">say</span>
          </h2>
          <p className="text-lg text-nexus-gray max-w-2xl mx-auto">
            Join thousands of companies already transforming their business with AI employees.
          </p>
        </div>

        {/* Testimonials carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main testimonial card */}
          <div className={`relative transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <div className="glass rounded-3xl p-8 md:p-12">
              {/* Quote icon */}
              <div className="absolute -top-6 left-8 w-12 h-12 rounded-xl bg-nexus-gradient flex items-center justify-center">
                <Quote className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <div className="pt-4">
                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-xl md:text-2xl text-white leading-relaxed mb-8 transition-all duration-500">
                  "{testimonials[activeIndex].quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonials[activeIndex].image}
                    alt={testimonials[activeIndex].name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-nexus-cyan/30"
                  />
                  <div>
                    <div className="font-semibold text-white">{testimonials[activeIndex].name}</div>
                    <div className="text-sm text-nexus-gray">
                      {testimonials[activeIndex].role} at {testimonials[activeIndex].company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'bg-nexus-gradient w-8'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          {/* Side preview cards */}
          <div className="hidden lg:flex justify-between mt-8 gap-4">
            {testimonials.map((testimonial, index) => {
              if (index === activeIndex) return null;
              return (
                <button
                  key={testimonial.id}
                  onClick={() => setActiveIndex(index)}
                  className="flex-1 glass rounded-xl p-4 text-left hover:bg-white/10 transition-all duration-300 opacity-60 hover:opacity-100"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium text-white text-sm">{testimonial.name}</div>
                      <div className="text-xs text-nexus-gray">{testimonial.company}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-16 text-center">
          <p className="text-nexus-gray text-sm mb-6">Trusted by teams at</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-50">
            {['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple'].map((company) => (
              <span key={company} className="text-white font-semibold text-lg">
                {company}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
