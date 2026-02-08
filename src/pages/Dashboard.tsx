import { useEffect, useState, useRef } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/auth';
import { PRICING_PLANS, type PricingPlan } from '@/lib/stripe';
import {
  Users,
  ClipboardList,
  Settings,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Zap
} from 'lucide-react';

interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  activeEmployees: number;
  tasksThisMonth: number;
}

interface RecentTask {
  id: string;
  title: string;
  employee_name: string;
  status: string;
  created_at: string;
}

export function DashboardPage() {
  const navigate = useNavigate();
  const { user, profile, isLoading } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalTasks: 0,
    completedTasks: 0,
    activeEmployees: 0,
    tasksThisMonth: 0,
  });
  const [recentTasks, setRecentTasks] = useState<RecentTask[]>([]);

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  // Load dashboard data
  // Track previous task statuses for notifications
  const prevTasksRef = useRef<any[]>([]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    async function loadData(showToasts = false) {
      if (!user) return;
      try {
        const { data: tasks } = await supabase
          .from('tasks')
          .select('id,title,employee_id,status,created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(10);

        if (tasks) {
          // Toast for status changes
          if (showToasts && prevTasksRef.current.length) {
            tasks.forEach((t: any) => {
              const prev = prevTasksRef.current.find((pt) => pt.id === t.id);
              if (prev && prev.status !== t.status) {
                if (t.status === 'done') toast.success(`Task "${t.title}" completed!`);
                if (t.status === 'failed') toast.error(`Task "${t.title}" failed.`);
              }
            });
          }
          prevTasksRef.current = tasks;

          setRecentTasks(
            tasks.map((t: any) => ({
              id: t.id,
              title: t.title,
              employee_name: t.employee_id,
              status: t.status,
              created_at: new Date(t.created_at).toLocaleDateString(),
            }))
          );

          // Replace employee_id with employee name when possible
          const employeeIds = Array.from(new Set(tasks.map((t: any) => t.employee_id)));
          if (employeeIds.length) {
            const { data: employees } = await supabase.from('ai_employees').select('id,name').in('id', employeeIds);
            const map = (employees || []).reduce((acc: any, e: any) => ({ ...acc, [e.id]: e.name }), {});
            setRecentTasks((prev) => prev.map((r: any) => ({ ...r, employee_name: map[r.employee_name] || r.employee_name })));
          }

          setStats((s) => ({
            ...s,
            totalTasks: tasks.length,
            completedTasks: tasks.filter((t: any) => t.status === 'done').length,
          }));
        }
      } catch (err) {
        console.error('Error loading tasks:', err);
      }
    }

    loadData();
    interval = setInterval(() => loadData(true), 5000);
    return () => clearInterval(interval);
  }, [user]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-nexus-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nexus-cyan" />
      </div>
    );
  }

  const currentPlan: PricingPlan =
    PRICING_PLANS.find((p) => p.id === profile?.subscription_tier) || PRICING_PLANS[0];

  console.log('Current Plan:', currentPlan);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'in_progress':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      default:
        return <AlertCircle className="w-4 h-4 text-nexus-gray" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      completed: 'bg-green-500/20 text-green-400',
      in_progress: 'bg-yellow-500/20 text-yellow-400',
      pending: 'bg-white/10 text-nexus-gray',
    };
    return variants[status] || variants.pending;
  };

  return (
    <div className="min-h-screen bg-nexus-dark">
      {/* Header */}
      <header className="border-b border-white/5 bg-nexus-dark/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-nexus-gradient flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">Nexus AI</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <div className="text-sm text-white">{profile?.full_name || 'User'}</div>
                <div className="text-xs text-nexus-gray">{user?.email || ''}</div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate('/settings')}>
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {profile?.full_name || 'User'}
              </h1>
          <p className="text-nexus-gray">
            Manage your AI team and track your tasks
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-nexus-card border-white/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-nexus-gray">Total Tasks</CardTitle>
              <ClipboardList className="w-4 h-4 text-nexus-cyan" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalTasks}</div>
            </CardContent>
          </Card>

          <Card className="bg-nexus-card border-white/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-nexus-gray">Completed</CardTitle>
              <CheckCircle className="w-4 h-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.completedTasks}</div>
            </CardContent>
          </Card>

          <Card className="bg-nexus-card border-white/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-nexus-gray">AI Employees</CardTitle>
              <Users className="w-4 h-4 text-nexus-cyan" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.activeEmployees}</div>
            </CardContent>
          </Card>

          <Card className="bg-nexus-card border-white/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-nexus-gray">This Month</CardTitle>
              <TrendingUp className="w-4 h-4 text-nexus-cyan" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.tasksThisMonth}</div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Tasks */}
        <Card className="bg-nexus-card border-white/5">
          <CardHeader>
            <CardTitle className="text-white">Recent Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(task.status)}
                    <div>
                      <p className="text-white font-medium">{task.title}</p>
                      <p className="text-sm text-nexus-gray">{task.employee_name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusBadge(task.status)}>
                      {task.status.replace('_', ' ')}
                    </Badge>
                    <Button variant="ghost" size="sm" onClick={() => navigate(`/tasks/${task.id}`)}>
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}