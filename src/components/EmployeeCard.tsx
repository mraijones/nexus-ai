import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Zap } from 'lucide-react';
import type { Employee } from '@/data/complete60Employees';

interface EmployeeCardProps {
  employee: Employee;
  onQuickView?: (employee: Employee) => void;
  onHire?: (employee: Employee) => void;
  showActions?: boolean;
  variant?: 'default' | 'compact' | 'featured';
}

export function EmployeeCard({
  employee,
  onQuickView,
  onHire,
  showActions = true,
  variant = 'default',
}: EmployeeCardProps) {
  const getTierColor = (tier: number) => {
    const colors: Record<number, string> = {
      0: 'from-green-500 to-green-600', // Free tier
      1: 'from-blue-500 to-cyan-500',
      2: 'from-purple-500 to-pink-500',
      3: 'from-orange-500 to-red-500',
      4: 'from-nexus-cyan to-nexus-pink',
    };
    return colors[tier] || 'from-gray-500 to-gray-700';
  };

  const getTierBadgeColor = (tier: number) => {
    const colors: Record<number, string> = {
      0: 'bg-green-500/20 text-green-400 border-green-500/30', // Free tier
      1: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      2: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      3: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      4: 'bg-nexus-cyan/20 text-nexus-cyan border-nexus-cyan/30',
    };
    return colors[tier] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  if (variant === 'compact') {
    return (
      <Card className="bg-nexus-card border-white/10 hover:border-nexus-cyan/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-nexus-cyan/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-full bg-gradient-to-br ${getTierColor(
                employee.tier
              )} flex items-center justify-center flex-shrink-0`}
            >
              <span className="text-lg font-bold text-white">
                {employee.persona?.charAt(0) || employee.role.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-white truncate">{employee.role}</h4>
              <p className="text-xs text-nexus-gray truncate">{employee.description}</p>
            </div>
            <Badge className={`text-xs ${getTierBadgeColor(employee.tier)}`}>
              T{employee.tier}
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === 'featured') {
    return (
      <Card className="bg-nexus-card border-nexus-cyan/30 hover:border-nexus-cyan/70 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-nexus-cyan/30 group">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Avatar */}
            <div
              className={`w-20 h-20 rounded-full bg-gradient-to-br ${getTierColor(
                employee.tier
              )} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
            >
              <span className="text-3xl font-bold text-white">
                {employee.persona?.charAt(0) || employee.role.charAt(0)}
              </span>
            </div>

            {/* Name & Role */}
            {employee.persona && (
              <div className="text-lg font-bold text-nexus-cyan">{employee.persona}</div>
            )}
            <h3 className="text-xl font-bold text-white">{employee.role}</h3>

            {/* Tier Badge */}
            <Badge className={`${getTierBadgeColor(employee.tier)} border`}>
              {employee.tier === 0 ? 'FREE FOREVER' : `Tier ${employee.tier} - $${employee.pricing}/mo`}
            </Badge>

            {/* Description */}
            <p className="text-sm text-nexus-gray line-clamp-2">{employee.description}</p>

            {/* Skills */}
            <div className="flex flex-wrap gap-1 justify-center">
              {employee.skills.slice(0, 3).map((skill, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="text-xs bg-white/5 border-white/20 text-nexus-gray"
                >
                  {skill}
                </Badge>
              ))}
            </div>

            {/* Actions */}
            {showActions && (
              <div className="flex gap-2 w-full pt-2">
                {onQuickView && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onQuickView(employee)}
                    className="flex-1 border-white/20 hover:bg-white/10"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Quick View
                  </Button>
                )}
                {onHire && (
                  <Button
                    size="sm"
                    onClick={() => onHire(employee)}
                    className={`flex-1 ${employee.tier === 0 ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-nexus-gradient'} hover:opacity-90`}
                  >
                    <Zap className="w-4 h-4 mr-1" />
                    {employee.tier === 0 ? 'Claim Free' : 'Hire Now'}
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default variant
  return (
    <Card className="bg-nexus-card border-white/10 hover:border-nexus-cyan/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-nexus-cyan/20 group">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          {/* Header */}
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div
              className={`w-16 h-16 rounded-full bg-gradient-to-br ${getTierColor(
                employee.tier
              )} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}
            >
              <span className="text-2xl font-bold text-white">
                {employee.persona?.charAt(0) || employee.role.charAt(0)}
              </span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              {employee.persona && (
                <div className="text-sm font-semibold text-nexus-cyan mb-1">{employee.persona}</div>
              )}
              <h3 className="text-lg font-bold text-white mb-1">{employee.role}</h3>
              <div className="flex flex-wrap gap-2">
                <Badge className={`text-xs ${getTierBadgeColor(employee.tier)} border`}>
                  {employee.tier === 0 ? 'FREE' : `Tier ${employee.tier}`}
                </Badge>
                <Badge variant="outline" className={`text-xs ${employee.tier === 0 ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-nexus-pink/20 text-nexus-pink border-nexus-pink/30'}`}>
                  {employee.tier === 0 ? 'Forever Free' : `$${employee.pricing}/mo`}
                </Badge>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-nexus-gray">{employee.description}</p>

          {/* Skills */}
          <div className="flex flex-wrap gap-1">
            {employee.skills.slice(0, 4).map((skill, idx) => (
              <Badge
                key={idx}
                variant="outline"
                className="text-xs bg-white/5 border-white/20 text-nexus-gray"
              >
                {skill}
              </Badge>
            ))}
          </div>

          {/* Actions */}
          {showActions && (
            <div className="flex gap-2 pt-2">
              {onQuickView && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onQuickView(employee)}
                  className="flex-1 border-white/20 hover:bg-white/10"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Quick View
                </Button>
              )}
              {onHire && (
                <Button
                  size="sm"
                  onClick={() => onHire(employee)}
                  className="flex-1 bg-nexus-gradient hover:opacity-90"
                >
                  <Zap className="w-4 h-4 mr-1" />
                  Hire Now
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
