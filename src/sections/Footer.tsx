import { Github, Twitter, Linkedin, Youtube, Mail, MapPin, Phone } from 'lucide-react';

const footerLinks = {
  product: [
    { label: 'AI Employees', href: '#employees' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'API', href: '#api' },
    { label: 'Integrations', href: '#integrations' },
  ],
  company: [
    { label: 'About', href: '#about' },
    { label: 'Blog', href: '#blog' },
    { label: 'Careers', href: '#careers' },
    { label: 'Press', href: '#press' },
  ],
  resources: [
    { label: 'Documentation', href: '#docs' },
    { label: 'Help Center', href: '#help' },
    { label: 'Community', href: '#community' },
    { label: 'Templates', href: '#templates' },
  ],
  legal: [
    { label: 'Privacy', href: '#privacy' },
    { label: 'Terms', href: '#terms' },
    { label: 'Security', href: '#security' },
    { label: 'Cookies', href: '#cookies' },
  ],
};

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export function Footer() {
  return (
    <footer className="relative bg-nexus-dark border-t border-white/5">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-nexus-gradient" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-nexus-gradient flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="text-xl font-bold text-white">Nexus</span>
            </div>
            <p className="text-nexus-gray text-sm mb-6 max-w-xs">
              Build your AI team with Nexus. Hire AI employees to automate your business and scale without limits.
            </p>
            
            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-nexus-gray text-sm">
                <Mail className="w-4 h-4" />
                <span>hello@nexus.ai</span>
              </div>
              <div className="flex items-center gap-3 text-nexus-gray text-sm">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-nexus-gray text-sm">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-nexus-gray text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-nexus-gray text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-nexus-gray text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-nexus-gray text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-nexus-gray text-sm">
            © {new Date().getFullYear()} Nexus AI. All rights reserved.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg glass-light flex items-center justify-center text-nexus-gray hover:text-white hover:bg-white/10 transition-all"
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
