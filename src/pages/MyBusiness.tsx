import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';

export function MyBusinessPage() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  const [hiredEmployees, setHiredEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const membershipTier = profile?.subscription_tier || 'free';
  const employeeLimit = {
    free: 1,
    starter: 3,
    professional: 3,
    enterprise: 6,
  }[membershipTier] || 1;

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    // Fetch hired employees for this user
    supabase
      .from('employees')
      .select('*')
      .eq('user_id', user.id)
      .then(({ data, error }) => {
        if (!error && data) setHiredEmployees(data);
        setLoading(false);
      });
  }, [user]);

  return (
    <div className="min-h-screen bg-nexus-dark px-4 py-8">
      <div className="container mx-auto max-w-3xl">
        <Card className="bg-nexus-card border-white/5 mb-8">
          <CardHeader>
            <CardTitle className="text-white">My Business</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 text-nexus-gray">
              <div><b>Email:</b> {user?.email}</div>
              <div><b>Membership Tier:</b> {membershipTier.charAt(0).toUpperCase() + membershipTier.slice(1)}</div>
              <div><b>Employee Limit:</b> {employeeLimit}</div>
              <div><b>Employees Hired:</b> {hiredEmployees.length}</div>
            </div>
            <Button className="bg-nexus-gradient text-white mb-4" onClick={() => navigate('/membership')}>Upgrade Membership</Button>
          </CardContent>
        </Card>

        <Card className="bg-nexus-card border-white/5">
          <CardHeader>
            <CardTitle className="text-white">Hired Employees</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-nexus-gray">Loading employees...</div>
            ) : hiredEmployees.length === 0 ? (
              <div className="text-nexus-gray">No employees hired yet.</div>
            ) : (
              <ul className="space-y-4">
                {hiredEmployees.map(emp => (
                  <li key={emp.id} className="flex items-center justify-between bg-nexus-dark rounded p-3">
                    <div className="flex items-center gap-3">
                      <img src={emp.image} alt={emp.name} className="w-10 h-10 rounded-full" />
                      <div>
                        <div className="text-white font-semibold">{emp.name}</div>
                        <div className="text-nexus-gray text-sm">{emp.role}</div>
                      </div>
                    </div>
                    <Button variant="destructive" size="sm" onClick={() => {/* TODO: fire employee logic */}}>Fire</Button>
                  </li>
                ))}
              </ul>
            )}
            <Button
              className="bg-nexus-gradient text-white mt-4"
              disabled={hiredEmployees.length >= employeeLimit && employeeLimit !== 'Unlimited'}
              onClick={() => navigate('/directory')}
            >
              Hire Employee
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default MyBusinessPage;
