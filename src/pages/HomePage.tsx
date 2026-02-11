
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Zap, Loader2 } from 'lucide-react';

// Featured employees (IDs must match those in HireEmployee.tsx)
const featured = [
  {
    id: 'kahlynn',
    name: 'Kahlynn',
    role: 'Social Media Influencer',
    image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Kahlynn&hair=long&hairColor=brown&skinColor=light',
    desc: 'Caucasian female with long brown hair. Grows brand presence and engagement on social platforms.',
    icon: Zap,
  },
  {
    id: 'kierra',
    name: 'Kierra',
    role: 'Community Manager',
    image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Kierra&hair=curly&hairColor=brown&skinColor=light',
    desc: 'Caucasian female with curly brown hair. Builds and nurtures online communities.',
    icon: Loader2,
  },
  // ...add 8 more featured employees from your employees array...
];
const TOTAL_EMPLOYEES = 15; // Update this to match your real total


export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-nexus-dark flex flex-col items-center px-4 py-8">
      {/* Banner */}
      <div className="w-full max-w-3xl mx-auto text-center mb-10">
        <div className="bg-gradient-to-r from-nexus-cyan to-nexus-pink rounded-xl py-5 px-6 shadow-lg mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
            {TOTAL_EMPLOYEES}+ AI Employees Available
          </h2>
          <div className="text-lg font-bold text-white/90">Empower your business with the world’s most diverse AI workforce.</div>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Welcome to Nexus AI Business Hub</h1>
        <p className="text-nexus-gray mb-8">
          Manage your business, employees, and membership all in one place.
        </p>
      </div>

      {/* Featured Employees */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
        {featured.map(emp => {
          const Icon = emp.icon;
          return (
            <Card key={emp.id} className="bg-nexus-card border-white/5 shadow-xl">
              <CardContent className="flex flex-col items-center p-6">
                <img src={emp.image} alt={emp.name} className="w-20 h-20 rounded-full mb-3 border-4 border-nexus-cyan object-cover" />
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="w-5 h-5 text-nexus-cyan" />
                  <span className="text-lg font-semibold text-white">{emp.name}</span>
                </div>
                <div className="text-nexus-cyan font-medium mb-2">{emp.role}</div>
                <div className="text-nexus-gray text-sm text-center">{emp.desc}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="w-full max-w-md flex flex-col gap-6">
        <Button className="w-full bg-nexus-gradient text-white text-lg py-4" onClick={() => navigate('/my-business')}>
          My Business
        </Button>
        <Button className="w-full bg-nexus-gradient text-white text-lg py-4" onClick={() => navigate('/directory')}>
          Employee Directory
        </Button>
        <Button className="w-full bg-nexus-gradient text-white text-lg py-4" onClick={() => navigate('/membership')}>
          Membership / Upgrade
        </Button>
      </div>
    </div>
  );
}

export default HomePage;
