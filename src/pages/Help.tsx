import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-nexus-dark flex items-center justify-center p-4">
      <Card className="glass border-0 max-w-2xl w-full">
        <CardHeader>
          <CardTitle className="text-white">Help & Onboarding</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-lg font-bold text-nexus-cyan mb-2">Getting Started</h2>
          <ul className="list-disc pl-6 text-nexus-gray mb-4">
            <li>Sign up and verify your email.</li>
            <li>Create your first AI employee and assign a task.</li>
            <li>Choose auto or manual run mode for each task.</li>
            <li>Track progress and results in your dashboard.</li>
            <li>Adjust settings and manage your subscription anytime.</li>
          </ul>
          <h2 className="text-lg font-bold text-nexus-cyan mb-2">FAQ</h2>
          <ul className="list-disc pl-6 text-nexus-gray mb-4">
            <li><b>How do I add more AI employees?</b> Upgrade your plan in the Pricing section.</li>
            <li><b>How do I contact support?</b> Use the contact form or email support@nexusai.com.</li>
            <li><b>What happens if I hit my task limit?</b> You’ll be prompted to upgrade or wait for the next billing cycle.</li>
            <li><b>Is my data secure?</b> Yes, we use industry-standard security and never share your data.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
