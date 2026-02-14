import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';
import {
  getHiredEmployees,
  getUserSubscriptions,
  getPaymentHistory,
  fireEmployee as fireEmployeeAction,
} from '@/lib/hireFireSystem';
import { CountdownTimer } from '@/components/CountdownTimer';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  DollarSign,
  Users,
  TrendingUp,
  Calendar,
  Flame,
  Clock,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import { toast } from 'sonner';

export function MyBusinessPage() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [hiredEmployees, setHiredEmployees] = useState<any[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [paymentHistory, setPaymentHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [fireDialogOpen, setFireDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [firingInProgress, setFiringInProgress] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    loadData();
  }, [user, navigate]);

  const loadData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [employees, subs, payments] = await Promise.all([
        getHiredEmployees(user.id),
        getUserSubscriptions(user.id),
        getPaymentHistory(user.id, 10),
      ]);
      setHiredEmployees(employees);
      setSubscriptions(subs);
      setPaymentHistory(payments);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load business data');
    } finally {
      setLoading(false);
    }
  };

  const handleFireClick = (employee: any) => {
    setSelectedEmployee(employee);
    setFireDialogOpen(true);
  };

  const handleFireConfirm = async () => {
    if (!selectedEmployee || !user) return;
    
    setFiringInProgress(true);
    try {
      const result = await fireEmployeeAction({
        userId: user.id,
        accountRoleId: selectedEmployee.id,
        reason: 'User initiated termination',
      });

      if (result.success) {
        toast.success('Employee fired successfully');
        setFireDialogOpen(false);
        setSelectedEmployee(null);
        loadData(); // Reload data
      } else {
        toast.error(result.error || 'Failed to fire employee');
      }
    } catch (error) {
      console.error('Error firing employee:', error);
      toast.error('An error occurred while firing the employee');
    } finally {
      setFiringInProgress(false);
    }
  };

  const totalMonthlySpend = hiredEmployees.reduce((sum, emp) => {
    // Get the role data to find pricing
    // For now, assume a default structure
    return sum + (emp.roles?.authority_tier ? emp.roles.authority_tier * 200 : 150);
  }, 0);

  const activeSubscription = subscriptions.find(s => s.status === 'active');

  if (loading) {
    return (
      <div className="min-h-screen bg-nexus-dark flex items-center justify-center">
        <div className="text-white text-xl">Loading your business...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nexus-dark text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">My Business</h1>
          <p className="text-xl text-nexus-gray">
            Manage your AI workforce and subscription
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-nexus-card border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-nexus-gray text-sm mb-1">Hired Employees</p>
                  <p className="text-3xl font-bold text-white">{hiredEmployees.length}</p>
                </div>
                <Users className="w-12 h-12 text-nexus-cyan opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-nexus-card border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-nexus-gray text-sm mb-1">Monthly Spend</p>
                  <p className="text-3xl font-bold text-white">${totalMonthlySpend}</p>
                </div>
                <DollarSign className="w-12 h-12 text-nexus-pink opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-nexus-card border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-nexus-gray text-sm mb-1">Subscription</p>
                  <p className="text-lg font-bold text-white capitalize">
                    {profile?.subscription_tier || 'Free'}
                  </p>
                </div>
                <TrendingUp className="w-12 h-12 text-green-500 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-nexus-card border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-nexus-gray text-sm mb-1">Next Billing</p>
                  <p className="text-lg font-bold text-white">
                    {activeSubscription?.next_billing_date
                      ? new Date(activeSubscription.next_billing_date).toLocaleDateString()
                      : 'N/A'}
                  </p>
                </div>
                <Calendar className="w-12 h-12 text-nexus-cyan opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Hired Employees */}
        <Card className="bg-nexus-card border-white/10 mb-12">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-white">
                Your AI Workforce
              </CardTitle>
              <Button
                onClick={() => navigate('/directory')}
                className="bg-nexus-gradient hover:opacity-90"
              >
                Hire More Employees
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {hiredEmployees.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-nexus-gray mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  No employees hired yet
                </h3>
                <p className="text-nexus-gray mb-6">
                  Start building your AI workforce today
                </p>
                <Button
                  onClick={() => navigate('/directory')}
                  className="bg-nexus-gradient hover:opacity-90"
                >
                  Browse Employees
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {hiredEmployees.map((employee) => (
                  <Card key={employee.id} className="bg-nexus-dark border-white/10">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row gap-6">
                        {/* Employee Info */}
                        <div className="flex-1">
                          <div className="flex items-start gap-4 mb-4">
                            <div
                              className={`w-16 h-16 rounded-full bg-gradient-to-br ${
                                employee.roles?.authority_tier === 1
                                  ? 'from-blue-500 to-cyan-500'
                                  : employee.roles?.authority_tier === 2
                                  ? 'from-purple-500 to-pink-500'
                                  : employee.roles?.authority_tier === 3
                                  ? 'from-orange-500 to-red-500'
                                  : 'from-nexus-cyan to-nexus-pink'
                              } flex items-center justify-center flex-shrink-0`}
                            >
                              <span className="text-2xl font-bold text-white">
                                {employee.role_personas?.persona_name?.charAt(0) ||
                                  employee.roles?.display_name?.charAt(0) ||
                                  '?'}
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-xl font-bold text-white">
                                  {employee.role_personas?.persona_name ||
                                    employee.roles?.display_name ||
                                    'Unknown'}
                                </h3>
                                <Badge
                                  className={`${
                                    employee.status === 'active'
                                      ? 'bg-green-500/20 text-green-400 border-green-500/30'
                                      : 'bg-red-500/20 text-red-400 border-red-500/30'
                                  }`}
                                >
                                  {employee.status}
                                </Badge>
                              </div>
                              <p className="text-nexus-gray mb-2">
                                {employee.roles?.display_name}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className="bg-white/5 border-white/20">
                                  Tier {employee.roles?.authority_tier || 1}
                                </Badge>
                                <Badge variant="outline" className="bg-white/5 border-white/20">
                                  {employee.roles?.department}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-nexus-gray">
                              <Calendar className="w-4 h-4" />
                              <span>
                                Hired:{' '}
                                {employee.hired_at
                                  ? new Date(employee.hired_at).toLocaleDateString()
                                  : 'Unknown'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="lg:w-80 space-y-4">
                          {/* Lock-in Status */}
                          {employee.lockInStatus && !employee.lockInStatus.canFire && (
                            <div className="p-4 bg-nexus-cyan/10 border border-nexus-cyan/30 rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <Clock className="w-5 h-5 text-nexus-cyan" />
                                <span className="text-sm font-semibold text-nexus-cyan">
                                  30-Day Lock-In Active
                                </span>
                              </div>
                              <CountdownTimer
                                targetDate={employee.lockInStatus.lockInExpiry}
                                compact={true}
                              />
                              <p className="text-xs text-nexus-gray mt-2">
                                Can fire in {employee.lockInStatus.daysRemaining} days
                              </p>
                            </div>
                          )}

                          {employee.lockInStatus?.canFire && (
                            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-400" />
                                <span className="text-sm font-semibold text-green-400">
                                  Lock-in period expired
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Fire Button */}
                          <Button
                            onClick={() => handleFireClick(employee)}
                            disabled={!employee.lockInStatus?.canFire}
                            variant="outline"
                            className={`w-full ${
                              employee.lockInStatus?.canFire
                                ? 'border-red-500/50 text-red-400 hover:bg-red-500/10'
                                : 'opacity-50 cursor-not-allowed'
                            }`}
                          >
                            <Flame className="w-4 h-4 mr-2" />
                            {employee.lockInStatus?.canFire ? 'Fire Employee' : 'Locked'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payment History */}
        <Card className="bg-nexus-card border-white/10">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {paymentHistory.length === 0 ? (
              <div className="text-center py-8 text-nexus-gray">
                No payment history available
              </div>
            ) : (
              <div className="space-y-4">
                {paymentHistory.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between p-4 bg-nexus-dark rounded-lg border border-white/10"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-full ${
                          payment.status === 'succeeded'
                            ? 'bg-green-500/20'
                            : 'bg-red-500/20'
                        } flex items-center justify-center`}
                      >
                        {payment.status === 'succeeded' ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-red-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-white font-semibold">
                          {payment.event_type.replace(/_/g, ' ').toUpperCase()}
                        </p>
                        <p className="text-sm text-nexus-gray">
                          {new Date(payment.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">
                        ${payment.amount?.toFixed(2) || '0.00'}
                      </p>
                      <Badge
                        className={`${
                          payment.status === 'succeeded'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {payment.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Fire Confirmation Dialog */}
      <AlertDialog open={fireDialogOpen} onOpenChange={setFireDialogOpen}>
        <AlertDialogContent className="bg-nexus-card border-white/20 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-bold text-red-400">
              Fire Employee?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-nexus-gray">
              Are you sure you want to fire{' '}
              <span className="font-semibold text-white">
                {selectedEmployee?.role_personas?.persona_name ||
                  selectedEmployee?.roles?.display_name}
              </span>
              ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-red-400">
                  <p className="font-semibold mb-1">Warning:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>This action cannot be undone</li>
                    <li>Your monthly subscription will be updated</li>
                    <li>All active tasks will be cancelled</li>
                    <li>You can rehire this employee later</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="border-white/20 hover:bg-white/10"
              disabled={firingInProgress}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleFireConfirm}
              disabled={firingInProgress}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {firingInProgress ? 'Firing...' : 'Yes, Fire Employee'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default MyBusinessPage;
