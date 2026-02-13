import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabaseClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function SettingsPage() {
  const { user, isLoading } = useAuth();
  const [autoRun, setAutoRun] = useState<boolean>(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      if (!user) return;
      try {
        const { data } = await supabase.from('profiles').select('auto_run_tasks').eq('id', user.id).single();
        if (data && typeof data.auto_run_tasks === 'boolean') setAutoRun(data.auto_run_tasks);
      } catch (err) {
        console.error('Error loading profile', err);
      }
    }

    if (!isLoading) load();
  }, [user, isLoading]);

  async function save() {
    if (!user) return;
    setSaving(true);
    try {
      await supabase.from('profiles').update({ auto_run_tasks: autoRun }).eq('id', user.id);
      // Optionally, show toast
    } catch (err) {
      console.error('Error saving settings', err);
    } finally {
      setSaving(false);
    }
  }

  if (isLoading || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-nexus-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="glass border-0 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-white">Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">Auto-run tasks</div>
                  <div className="text-nexus-gray text-sm">When enabled, tasks created with Auto run mode will be processed automatically.</div>
                </div>
                <div>
                  <Button onClick={() => setAutoRun(!autoRun)} className={autoRun ? 'bg-nexus-gradient' : ''}>{autoRun ? 'Enabled' : 'Disabled'}</Button>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={save} disabled={saving} className="bg-nexus-gradient">{saving ? 'Saving...' : 'Save'}</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
