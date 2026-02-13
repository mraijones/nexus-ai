import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Clock, Briefcase, Users } from 'lucide-react';
import { roles, tier4Roles } from '@/data/employees';

export function HomePage() {
  const navigate = useNavigate();

  // Select 2 employees from each tier (1, 2) and 1 from tier 3 for featured showcase
  const tier1Employees = roles.filter(r => r.authorityTier === 1 && r.status === 'available').slice(0, 2);
  const tier2Employees = roles.filter(r => r.authorityTier === 2 && r.status === 'available').slice(0, 2);
  const tier3Employees = roles.filter(r => r.authorityTier === 3 && r.status === 'available').slice(0, 1);
  
  const featuredEmployees = [...tier1Employees, ...tier2Employees, ...tier3Employees];

  // Get all Tier 4 personas with the specific names (limit to 7 based on available data)
  const tier4Personas = tier4Roles.flatMap(role => 
    role.personas
      .filter(p => p.persona_name && !p.persona_name.startsWith('TBD'))
      .map(persona => ({
        ...persona,
        roleId: role.id,
        roleName: role.display_name,
        status: role.status
      }))
  ).slice(0, 7);

  // Generate avatar URL for a persona
  const getAvatarUrl = (persona: { persona_name?: string; id: string }) => {
    const seed = persona.persona_name || persona.id;
    return `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}`;
  };

  // Get avatar URL with fallback
  const getPersonaAvatar = (persona: { avatar_url?: string; persona_name?: string; id: string }) => {
    return ('avatar_url' in persona ? persona.avatar_url : undefined) ?? getAvatarUrl(persona);
  };

  return (
    <div className="min-h-screen bg-nexus-dark flex flex-col items-center px-4 py-8">
      {/* Main Banner */}
      <div className="w-full max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4">Welcome to Nexus AI Business Hub</h1>
        <p className="text-xl text-nexus-gray mb-6">
          Empower your business with 24+ AI employees across all tiers.
        </p>
        <p className="text-nexus-gray">
          Manage your business, employees, and membership all in one place.
        </p>
      </div>

      {/* Featured Showcase - Tiers 1-3 */}
      <div className="w-full max-w-6xl mx-auto mb-12">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Featured AI Employees</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredEmployees.map(emp => {
            const persona = emp.personas?.[0];
            if (!persona) return null;
            
            return (
              <Card key={emp.id} className="bg-nexus-card border-white/5 shadow-xl hover:border-nexus-cyan/30 transition-colors">
                <CardContent className="flex flex-col items-center p-6">
                  <img 
                    src={getPersonaAvatar(persona)} 
                    alt={persona.persona_name} 
                    className="w-24 h-24 rounded-full mb-4 border-4 border-nexus-cyan object-cover" 
                  />
                  <Badge variant="outline" className="mb-3 bg-nexus-cyan/10 text-nexus-cyan border-nexus-cyan/30">
                    Tier {emp.authorityTier}
                  </Badge>
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="w-4 h-4 text-nexus-cyan" />
                    <span className="text-lg font-semibold text-white">{persona.persona_name}</span>
                  </div>
                  <div className="text-nexus-cyan font-medium mb-2 text-center">{emp.display_name}</div>
                  <div className="text-nexus-gray text-sm text-center">{emp.description}</div>
                  {emp.status === 'available' && (
                    <Badge className="mt-3 bg-green-500/20 text-green-400 border-green-500/30">
                      Available
                    </Badge>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Coming Soon Banner */}
      <div className="w-full max-w-5xl mx-auto mb-12">
        <div className="bg-gradient-to-r from-nexus-cyan to-nexus-pink rounded-xl py-8 px-6 shadow-2xl">
          <div className="flex items-center justify-center gap-4 mb-3">
            <Clock className="w-8 h-8 text-white animate-pulse" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Tier 4 Strategic Partners — Coming Soon
            </h2>
          </div>
          <p className="text-lg font-semibold text-white/90 text-center">
            Elite strategic operators for enterprise-level decision making
          </p>
        </div>
      </div>

      {/* Tier 4 Strategic Partners Showcase */}
      <div className="w-full max-w-7xl mx-auto mb-12">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Strategic Partners (Tier 4)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {tier4Personas.map((persona) => (
            <Card key={`${persona.roleId}-${persona.id}`} className="bg-nexus-card border-white/5 shadow-xl hover:border-nexus-pink/30 transition-colors">
              <CardContent className="flex flex-col items-center p-6">
                <img 
                  src={getAvatarUrl(persona)} 
                  alt={persona.persona_name} 
                  className="w-20 h-20 rounded-full mb-3 border-4 border-nexus-pink object-cover" 
                />
                <Badge variant="outline" className="mb-2 bg-nexus-pink/10 text-nexus-pink border-nexus-pink/30">
                  Tier 4
                </Badge>
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-nexus-pink" />
                  <span className="text-base font-semibold text-white">{persona.persona_name}</span>
                </div>
                <div className="text-nexus-pink font-medium text-sm text-center mb-2">{persona.roleName}</div>
                <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                  Coming Soon
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="w-full max-w-2xl mx-auto flex flex-col sm:flex-row gap-6 mb-8">
        <Button 
          className="flex-1 bg-nexus-gradient text-white text-lg py-6 hover:opacity-90 transition-opacity" 
          onClick={() => navigate('/directory')}
        >
          Explore All Employees
        </Button>
        <Button 
          className="flex-1 bg-nexus-gradient text-white text-lg py-6 hover:opacity-90 transition-opacity" 
          onClick={() => navigate('/membership')}
        >
          View Pricing Plans
        </Button>
      </div>
    </div>
  );
}

export default HomePage;
