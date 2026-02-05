import { Building2, Rocket, Zap, Globe, Cpu } from 'lucide-react';

const logos = [
  { name: 'TechCorp', icon: Cpu },
  { name: 'InnovateLabs', icon: Rocket },
  { name: 'FutureSystems', icon: Zap },
  { name: 'GlobalAI', icon: Globe },
  { name: 'EnterpriseX', icon: Building2 },
  { name: 'TechCorp', icon: Cpu },
  { name: 'InnovateLabs', icon: Rocket },
  { name: 'FutureSystems', icon: Zap },
  { name: 'GlobalAI', icon: Globe },
  { name: 'EnterpriseX', icon: Building2 },
];

export function LogoMarquee() {
  return (
    <section className="relative py-16 bg-nexus-dark overflow-hidden">
      {/* Gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-nexus-dark to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-nexus-dark to-transparent z-10" />

      <div className="container mx-auto px-4 mb-8">
        <p className="text-center text-nexus-gray text-sm uppercase tracking-wider">
          Trusted by leading companies
        </p>
      </div>

      {/* Marquee container */}
      <div className="relative flex overflow-hidden">
        <div className="flex gap-16 animate-marquee whitespace-nowrap">
          {logos.map((logo, index) => {
            const Icon = logo.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 px-6 py-3 glass-light rounded-xl hover:bg-white/10 transition-colors cursor-pointer group"
              >
                <Icon className="w-6 h-6 text-nexus-gray group-hover:text-nexus-cyan transition-colors" />
                <span className="text-nexus-gray font-medium group-hover:text-white transition-colors">
                  {logo.name}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex gap-16 animate-marquee whitespace-nowrap" aria-hidden>
          {logos.map((logo, index) => {
            const Icon = logo.icon;
            return (
              <div
                key={`dup-${index}`}
                className="flex items-center gap-3 px-6 py-3 glass-light rounded-xl hover:bg-white/10 transition-colors cursor-pointer group"
              >
                <Icon className="w-6 h-6 text-nexus-gray group-hover:text-nexus-cyan transition-colors" />
                <span className="text-nexus-gray font-medium group-hover:text-white transition-colors">
                  {logo.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
