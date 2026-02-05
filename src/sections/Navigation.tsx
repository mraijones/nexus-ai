import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Zap } from 'lucide-react';

const navLinks = [
  { label: 'Employees', href: '#employees' },
  { label: 'Services', href: '#services' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Help', href: '/help', isRoute: true },
  { label: 'Contact', href: '/contact', isRoute: true },
];

export function Navigation() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-nexus-dark/80 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-nexus-gradient flex items-center justify-center">
                <span className="text-white font-bold">N</span>
              </div>
              <span className="text-lg font-bold text-white">Nexus</span>
            </a>

            {/* Desktop navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                link.isRoute ? (
                  <button
                    key={link.label}
                    onClick={() => navigate(link.href)}
                    className="text-nexus-gray hover:text-white transition-colors text-sm font-medium"
                  >
                    {link.label}
                  </button>
                ) : (
                  <button
                    key={link.label}
                    onClick={() => scrollToSection(link.href)}
                    className="text-nexus-gray hover:text-white transition-colors text-sm font-medium"
                  >
                    {link.label}
                  </button>
                )
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <Button
                onClick={() => navigate('/auth')}
                variant="ghost"
                className="text-nexus-gray hover:text-white hover:bg-white/10"
              >
                Sign in
              </Button>
              <Button 
                onClick={() => navigate('/auth')}
                className="bg-nexus-gradient text-white hover:opacity-90"
              >
                <Zap className="w-4 h-4 mr-2" />
                Get started
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-lg glass-light flex items-center justify-center text-white"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-nexus-dark/95 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu content */}
        <div
          className={`absolute top-20 left-4 right-4 glass rounded-2xl p-6 transition-all duration-500 ${
            isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          <div className="space-y-4">
            {navLinks.map((link) => (
              link.isRoute ? (
                <button
                  key={link.label}
                  onClick={() => { setIsMobileMenuOpen(false); navigate(link.href); }}
                  className="block w-full text-left text-white text-lg font-medium py-3 border-b border-white/5 last:border-0"
                >
                  {link.label}
                </button>
              ) : (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="block w-full text-left text-white text-lg font-medium py-3 border-b border-white/5 last:border-0"
                >
                  {link.label}
                </button>
              )
            ))}
          </div>

          <div className="mt-6 space-y-3">
            <Button
              variant="outline"
              className="w-full border-white/20 text-white hover:bg-white/10"
              onClick={() => navigate('/auth')}
            >
              Sign in
            </Button>
            <Button className="w-full bg-nexus-gradient text-white" onClick={() => navigate('/auth')}>  
            <Zap className="w-4 h-4 mr-2" />
              Get started
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}