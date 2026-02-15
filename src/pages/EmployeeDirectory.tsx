import { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EmployeeCard } from '@/components/EmployeeCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Search, Filter, SlidersHorizontal, X, Zap } from 'lucide-react';
import { all60Employees } from '@/data/complete60Employees';
import type { Employee } from '@/data/complete60Employees';
import { useNavigate } from 'react-router-dom';

export function EmployeeDirectory() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialTier = location.state?.tier;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState<number | null>(initialTier || null);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'tier' | 'name'>('tier');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Filter and sort employees
  const filteredEmployees = useMemo(() => {
    let filtered = all60Employees;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (emp) =>
          emp.role.toLowerCase().includes(query) ||
          emp.description.toLowerCase().includes(query) ||
          emp.skills.some((skill) => skill.toLowerCase().includes(query)) ||
          emp.persona?.toLowerCase().includes(query)
      );
    }

    // Filter by tier
    if (selectedTier) {
      filtered = filtered.filter((emp) => emp.tier === selectedTier);
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.pricing - b.pricing;
        case 'price-desc':
          return b.pricing - a.pricing;
        case 'tier':
          return a.tier - b.tier || a.pricing - b.pricing;
        case 'name':
          return a.role.localeCompare(b.role);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedTier, sortBy]);

  const tierCounts = {
    1: all60Employees.filter((e) => e.tier === 1).length,
    2: all60Employees.filter((e) => e.tier === 2).length,
    3: all60Employees.filter((e) => e.tier === 3).length,
    4: all60Employees.filter((e) => e.tier === 4).length,
  };

  const handleQuickView = (employee: Employee) => {
    setSelectedEmployee(employee);
    setQuickViewOpen(true);
  };

  const handleHire = (employee: Employee) => {
    navigate('/checkout', { state: { employee } });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTier(null);
    setSortBy('tier');
  };

  return (
    <div className="min-h-screen bg-nexus-dark text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
            Employee Directory
          </h1>
          <p className="text-xl text-nexus-gray">
            Browse all 60 AI employees across 4 tiers
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="bg-nexus-card border-white/10 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-nexus-gray" />
                <Input
                  type="text"
                  placeholder="Search by role, skills, or persona..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-nexus-dark border-white/20 text-white placeholder:text-nexus-gray"
                />
              </div>

              {/* Tier Filter - Mobile */}
              <Button
                variant="outline"
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="lg:hidden border-white/20 hover:bg-white/10"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
                {(selectedTier || sortBy !== 'tier') && (
                  <Badge className="ml-2 bg-nexus-cyan text-white">Active</Badge>
                )}
              </Button>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="hidden lg:block px-4 py-2 bg-nexus-dark border border-white/20 rounded-md text-white focus:border-nexus-cyan focus:outline-none"
              >
                <option value="tier">Sort by Tier</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>

              {/* Clear Filters */}
              {(selectedTier || searchQuery || sortBy !== 'tier') && (
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="border-white/20 hover:bg-white/10"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              )}
            </div>

            {/* Tier Filter Buttons - Desktop */}
            <div className="hidden lg:flex gap-2 mt-4">
              <Button
                variant={selectedTier === null ? 'default' : 'outline'}
                onClick={() => setSelectedTier(null)}
                className={
                  selectedTier === null
                    ? 'bg-nexus-gradient'
                    : 'border-white/20 hover:bg-white/10'
                }
              >
                All ({all60Employees.length})
              </Button>
              {[1, 2, 3, 4].map((tier) => (
                <Button
                  key={tier}
                  variant={selectedTier === tier ? 'default' : 'outline'}
                  onClick={() => setSelectedTier(tier)}
                  className={
                    selectedTier === tier
                      ? 'bg-nexus-gradient'
                      : 'border-white/20 hover:bg-white/10'
                  }
                >
                  Tier {tier} ({tierCounts[tier as keyof typeof tierCounts]})
                </Button>
              ))}
            </div>

            {/* Mobile Filters Dropdown */}
            {filtersOpen && (
              <div className="lg:hidden space-y-4 mt-4 pt-4 border-t border-white/10">
                <div>
                  <label className="text-sm text-nexus-gray mb-2 block">Tier</label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={selectedTier === null ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedTier(null)}
                      className={
                        selectedTier === null
                          ? 'bg-nexus-gradient'
                          : 'border-white/20 hover:bg-white/10'
                      }
                    >
                      All
                    </Button>
                    {[1, 2, 3, 4].map((tier) => (
                      <Button
                        key={tier}
                        variant={selectedTier === tier ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedTier(tier)}
                        className={
                          selectedTier === tier
                            ? 'bg-nexus-gradient'
                            : 'border-white/20 hover:bg-white/10'
                        }
                      >
                        Tier {tier}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-nexus-gray mb-2 block">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full px-4 py-2 bg-nexus-dark border border-white/20 rounded-md text-white focus:border-nexus-cyan focus:outline-none"
                  >
                    <option value="tier">Sort by Tier</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-nexus-gray">
            Showing <span className="text-white font-semibold">{filteredEmployees.length}</span> of{' '}
            <span className="text-white font-semibold">{all60Employees.length}</span> employees
          </p>
        </div>

        {/* Employee Grid */}
        {filteredEmployees.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEmployees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onQuickView={handleQuickView}
                onHire={handleHire}
                variant="default"
              />
            ))}
          </div>
        ) : (
          <Card className="bg-nexus-card border-white/10">
            <CardContent className="p-12 text-center">
              <Filter className="w-16 h-16 text-nexus-gray mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No employees found</h3>
              <p className="text-nexus-gray mb-6">
                Try adjusting your search or filters
              </p>
              <Button onClick={clearFilters} variant="outline" className="border-white/20 hover:bg-white/10">
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Quick View Modal */}
      <Dialog open={quickViewOpen} onOpenChange={setQuickViewOpen}>
        <DialogContent className="bg-nexus-card border-white/20 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedEmployee && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  {selectedEmployee.persona || selectedEmployee.role}
                </DialogTitle>
                <DialogDescription className="text-nexus-gray">
                  {selectedEmployee.role}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-20 h-20 rounded-full bg-gradient-to-br ${
                      selectedEmployee.tier === 1
                        ? 'from-blue-500 to-cyan-500'
                        : selectedEmployee.tier === 2
                        ? 'from-purple-500 to-pink-500'
                        : selectedEmployee.tier === 3
                        ? 'from-orange-500 to-red-500'
                        : 'from-nexus-cyan to-nexus-pink'
                    } flex items-center justify-center`}
                  >
                    <span className="text-3xl font-bold text-white">
                      {selectedEmployee.persona?.charAt(0) || selectedEmployee.role.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <Badge className="mb-2">
                      Tier {selectedEmployee.tier} - ${selectedEmployee.pricing}/mo
                    </Badge>
                    <p className="text-nexus-gray">{selectedEmployee.authorityLevel} Authority</p>
                    <p className="text-nexus-gray">{selectedEmployee.availability}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2">Description</h4>
                  <p className="text-nexus-gray">{selectedEmployee.description}</p>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedEmployee.skills.map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="bg-white/5 border-white/20">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2">Responsibilities</h4>
                  <ul className="list-disc list-inside space-y-1 text-nexus-gray">
                    {selectedEmployee.responsibilities.map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2">Boundaries</h4>
                  <ul className="list-disc list-inside space-y-1 text-nexus-gray">
                    {selectedEmployee.boundaries.map((boundary, idx) => (
                      <li key={idx}>{boundary}</li>
                    ))}
                  </ul>
                </div>

                <Button
                  onClick={() => {
                    setQuickViewOpen(false);
                    handleHire(selectedEmployee);
                  }}
                  className="w-full bg-nexus-gradient hover:opacity-90"
                  size="lg"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Hire {selectedEmployee.persona || selectedEmployee.role} Now
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EmployeeDirectory;
