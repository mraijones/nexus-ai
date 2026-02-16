import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabaseClient';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

export function TaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [task, setTask] = useState<any | null>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!id) return;
      setLoading(true);
      try {
        const { data: taskData, error } = await supabase.from('tasks').select('*').eq('id', id).single();
        if (error) throw error;
        setTask(taskData);

        const { data: logsData } = await supabase
          .from('task_logs')
          .select('*')
          .eq('task_id', id)
          .order('created_at', { ascending: false });
        setLogs(logsData || []);
      } catch (err) {
        console.error('Error loading task', err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (!user) {
    navigate('/auth');
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-nexus-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nexus-cyan" />
      </div>
    );
  }

  if (!task) {
    return (
      <div className="min-h-screen bg-nexus-dark flex items-center justify-center">
        <div className="text-white">Task not found</div>
      </div>
    );
  }

  // Manual run handler
  async function handleManualRun() {
    if (!task) return;
    try {
      const resp = await fetch('/.netlify/functions/tasks-manual-run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': user?.id || '' },
        body: JSON.stringify({ task_id: task.id }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || 'Failed to run task');
      toast.success('Task started!');
    } catch (err: any) {
      toast.error('Error running task: ' + (err.message || String(err)));
    }
  }

  return (
    <div className="min-h-screen bg-nexus-dark">
      <header className="border-b border-white/5 bg-nexus-dark/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-white">Task Details</h1>
                <p className="text-sm text-nexus-gray hidden sm:block">View logs and results</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="glass border-0 mb-6">
          <CardHeader>
            <CardTitle className="text-white text-lg">{task.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <p className="text-nexus-gray mb-4">{task.description}</p>
                <div className="text-sm text-nexus-gray">Status: <span className="text-white">{task.status}</span></div>
                {/* Manual run button for pending manual tasks */}
                {task.status === 'pending' && task.run_mode === 'manual' && (
                  <Button className="mt-4" onClick={handleManualRun}>
                    Run Task Now
                  </Button>
                )}
                <div className="text-sm text-nexus-gray">Employee: <span className="text-white">{task.employee_id}</span></div>
                <div className="text-sm text-nexus-gray">Created: <span className="text-white">{new Date(task.created_at).toLocaleString()}</span></div>

                <div className="mt-6">
                  <h4 className="text-white mb-2">Result</h4>
                  <pre className="bg-white/5 p-4 rounded-md text-sm text-nexus-gray overflow-auto max-h-64">{JSON.stringify(task.result, null, 2)}</pre>
                </div>
              </div>

              <div>
                <h4 className="text-white mb-3">Logs</h4>
                <div className="space-y-3 max-h-64 overflow-auto">
                  {logs.map((l) => (
                    <div key={l.id} className="p-3 bg-white/5 rounded-md">
                      <div className="text-sm text-nexus-gray">{new Date(l.created_at).toLocaleString()}</div>
                      <div className="text-sm text-white mt-1">{l.message}</div>
                      {l.meta && <pre className="text-xs text-nexus-gray mt-2 bg-white/2 p-2 rounded">{JSON.stringify(l.meta, null, 2)}</pre>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
