import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Check, Zap, Crown, Building2 } from 'lucide-react';

interface PricingTier {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  icon: React.ElementType;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

const tiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for individuals and small projects',
    monthlyPrice: 29,
    yearlyPrice: 290,
    icon: Zap,
    features: [
      '1 AI Employee',
      '100 tasks/month',
      'Email support',
      'Basic analytics',
      'API access',
    ],
    cta: 'Get Started',
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Best for growing teams and businesses',
    monthlyPrice: 99,
    yearlyPrice: 990,
    icon: Crown,
    features: [
      '5 AI Employees',
      'Unlimited tasks',
      'Priority support',
      'Advanced analytics',
      'API access',
      'Custom training',
      'Team collaboration',
    ],
    highlighted: true,
    cta: 'Start Free Trial',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large organizations with custom needs',
    monthlyPrice: 299,
    yearlyPrice: 2990,
    icon: Building2,
    features: [
      'Unlimited AI Employees',
      'Unlimited tasks',
      '24/7 dedicated support',
      'Enterprise analytics',
      'Full API access',
      'Custom AI training',
      'SSO & Security',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
  },
];

export function Pricing() {
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [animatingPrices, setAnimatingPrices] = useState(false);
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

  const handleToggle = () => {
    setAnimatingPrices(true);
    setIsYearly(!isYearly);
    setTimeout(() => setAnimatingPrices(false), 300);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section ref={sectionRef} className="relative py-24 bg-nexus-dark overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 network-grid opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-nexus-purple/10 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full glass-light text-nexus-cyan text-sm mb-4">
            Pricing
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Simple <span className="gradient-text">pricing</span>
          </h2>
          <p className="text-lg text-nexus-gray max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include a 14-day free trial.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm transition-colors ${!isYearly ? 'text-white' : 'text-nexus-gray'}`}>
            Monthly
          </span>
          <Switch
            checked={isYearly}
            onCheckedChange={handleToggle}
            className="data-[state=checked]:bg-nexus-gradient"
          />
          <span className={`text-sm transition-colors ${isYearly ? 'text-white' : 'text-nexus-gray'}`}>
            Yearly
          </span>
          {isYearly && (
            <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded-full">
              Save 20%
            </span>
          )}
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, index) => {
            const Icon = tier.icon;
            const price = isYearly ? tier.yearlyPrice : tier.monthlyPrice;
            
            return (
              <div
                key={tier.id}
                className={`relative transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Highlighted badge */}
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-nexus-gradient text-white text-sm font-medium rounded-full">
                    Most Popular
                  </div>
                )}

                <div className={`relative h-full rounded-2xl p-8 transition-all duration-300 ${
                  tier.highlighted
                    ? 'bg-gradient-to-b from-white/10 to-white/5 border-2 border-nexus-cyan/30'
                    : 'glass hover:bg-white/10'
                }`}>
                  {/* Icon */}
                  <div className={`inline-flex p-3 rounded-xl ${
                    tier.highlighted
                      ? 'bg-nexus-gradient'
                      : 'bg-white/10'
                  } mb-6`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Name & description */}
                  <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                  <p className="text-nexus-gray text-sm mb-6">{tier.description}</p>

                  {/* Price */}
                  <div className="mb-8">
                    <div className={`text-4xl font-bold text-white transition-all duration-300 ${
                      animatingPrices ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
                    }`}>
                      {formatPrice(price)}
                    </div>
                    <div className="text-nexus-gray text-sm">
                      /{isYearly ? 'year' : 'month'}
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          tier.highlighted ? 'bg-nexus-cyan/20' : 'bg-white/10'
                        }`}>
                          <Check className={`w-3 h-3 ${
                            tier.highlighted ? 'text-nexus-cyan' : 'text-white'
                          }`} />
                        </div>
                        <span className="text-nexus-gray text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    onClick={() => navigate('/auth')}
                    className={`w-full py-6 ${
                      tier.highlighted
                        ? 'bg-nexus-gradient text-white hover:opacity-90'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {tier.cta}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <div className="text-center mt-12">
          <p className="text-nexus-gray text-sm">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
}