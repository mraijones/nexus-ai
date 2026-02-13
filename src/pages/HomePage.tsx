
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Star, Clock, ArrowRight } from 'lucide-react';
import { tier4Roles, roles } from '@/data/employees';


export function HomePage() {
  const navigate = useNavigate();

  // Get 2 from each tier (1-3)
  const tier1Employees = roles.filter((emp) => emp.authorityTier === 1).slice(0, 2);
  const tier2Employees = roles.filter((emp) => emp.authorityTier === 2).slice(0, 2);
  const tier3Employees = roles.filter((emp) => emp.authorityTier === 3).slice(0, 2);

  // Get all Tier 4 employees with persona names
  const tier4Featured = tier4Roles
    .map((emp) => {
      const persona = emp.personas?.[0] || { persona_name: 'TBD' };
      return { ...emp, persona };
    })
    .slice(0, 8);

  const featuredEmployees = [...tier1Employees, ...tier2Employees, ...tier3Employees];

  const getTierLabel = (tier: number) => {
    const tierMap: Record<number, string> = {
      1: 'Tier 1',
      2: 'Tier 2',
      3: 'Tier 3',
      4: 'Tier 4',
    };
    return tierMap[tier] || 'Enterprise';
  };

  const getTierColor = (tier: number) => {
    const colorMap: Record<number, string> = {
      1: 'from-blue-500 to-cyan-500',
      2: 'from-purple-500 to-pink-500',
      3: 'from-orange-500 to-red-500',
      4: 'from-nexus-cyan to-nexus-pink',
    };
    return colorMap[tier] || 'from-nexus-cyan to-nexus-pink';
  };

  return (
    <div className="min-h-screen bg-nexus-dark flex flex-col items-center px-4 py-8">
      {/* Banner */}
      <div className="w-full max-w-3xl mx-auto text-center mb-10">
        <div className="bg-gradient-to-r from-nexus-cyan to-nexus-pink rounded-xl py-5 px-6 shadow-lg mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
            Tier 4 Employees — Coming Soon
          </h2>
          <div className="text-lg font-bold text-white/90">Empower your business with the world’s most diverse AI workforce.</div>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Welcome to Nexus AI Business Hub</h1>
        <p className="text-nexus-gray mb-8">
          Manage your business, employees, and membership all in one place.
        </p>
      </div>

      {/* Featured Employees (Tiers 1-3) */}
      <div className="w-full max-w-5xl mx-auto mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Star className="w-6 h-6 text-nexus-cyan" />
          <h3 className="text-2xl font-bold text-white">Featured Employees</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredEmployees.map((emp) => (
            <Card key={emp.id} className="bg-nexus-card border-white/5 shadow-xl hover:border-nexus-cyan/50 transition">
              <CardContent className="flex flex-col items-center p-6">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getTierColor(emp.authorityTier)} mb-3 flex items-center justify-center`}>
                  <span className="text-2xl font-bold text-white">
                    {emp.display_name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-lg font-semibold text-white text-center mb-2">{emp.display_name}</span>
                <div className="flex gap-2 mb-3">
                  <span className="px-2 py-1 bg-nexus-cyan/20 rounded text-nexus-cyan text-xs font-semibold">
                    {getTierLabel(emp.authorityTier)}
                  </span>
                  <span className="px-2 py-1 bg-nexus-pink/20 rounded text-nexus-pink text-xs font-semibold">
                    {emp.status === 'available' ? 'Available' : 'Coming Soon'}
                  </span>
                </div>
                <div className="text-nexus-gray text-sm text-center leading-relaxed">
                  {emp.description || 'Professional role'}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Coming Soon Banner */}
      <div className="w-full max-w-5xl mx-auto mb-12">
        <div className="bg-gradient-to-r from-nexus-pink/20 to-nexus-cyan/20 border border-nexus-pink/50 rounded-xl py-8 px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Clock className="w-8 h-8 text-nexus-pink" />
            <h3 className="text-3xl font-bold text-white">Coming Soon</h3>
            <Clock className="w-8 h-8 text-nexus-pink" />
          </div>
          <p className="text-nexus-gray text-lg">
            Introducing our Strategic Tier 4 Operators — Enterprise-grade AI partners for your most critical initiatives.
          </p>
        </div>
      </div>

      {/* Tier 4 Strategic Partners */}
      <div className="w-full max-w-5xl mx-auto mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Star className="w-6 h-6 text-nexus-pink" />
          <h3 className="text-2xl font-bold text-white">Strategic Partners</h3>
          <span className="text-nexus-pink font-semibold">(Enterprise Tier)</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {tier4Featured.map((emp) => (
            <Card key={emp.id} className="bg-nexus-card border-nexus-pink/30 shadow-xl hover:border-nexus-pink/70 transition">
              <CardContent className="flex flex-col items-center p-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-nexus-cyan to-nexus-pink mb-3 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {emp.persona?.persona_name?.charAt(0).toUpperCase() || '?'}
                  </span>
                </div>
                <span className="text-lg font-semibold text-white text-center mb-1">
                  {emp.persona?.persona_name || '[Details TBD]'}
                </span>
                <div className="text-nexus-cyan font-medium text-sm mb-3 text-center">{emp.display_name}</div>
                <div className="text-nexus-gray text-xs text-center leading-relaxed mb-4">
                  {emp.tasks?.coreResponsibilities?.[0] || 'Strategic executive role'}
                </div>
                <div className="px-3 py-1 bg-nexus-pink/20 rounded text-nexus-pink text-xs font-semibold">
                  Enterprise
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
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
