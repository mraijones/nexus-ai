import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';

export function MyBusinessPage() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  // Placeholder for hired employees
  const hiredEmployees = [];
  // Placeholder for membership tier
  const membershipTier = profile?.subscription_tier || 'Free';
  // Placeholder for employee limit logic
  const employeeLimit = {
    Free: 1,
    Tier2: 3,
    Tier3: 3,
    Tier4: 4,
    Tier5: 6,
    Tier6: 'Unlimited',
  }[membershipTier] || 1;

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
              <div><b>Membership Tier:</b> {membershipTier}</div>
              <div><b>Employee Limit:</b> {employeeLimit}</div>
            </div>
            <Button className="bg-nexus-gradient text-white mb-4" onClick={() => navigate('/membership')}>Upgrade Membership</Button>
          </CardContent>
        </Card>

        <Card className="bg-nexus-card border-white/5">
          <CardHeader>
            <CardTitle className="text-white">Hired Employees</CardTitle>
          </CardHeader>
          <CardContent>
            {hiredEmployees.length === 0 ? (
              <div className="text-nexus-gray">No employees hired yet.</div>
            ) : (
              <ul className="space-y-4">
                {/* Render hired employees here */}
              </ul>
            )}
            <Button className="bg-nexus-gradient text-white mt-4" onClick={() => navigate('/directory')}>Hire Employee</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default MyBusinessPage;
