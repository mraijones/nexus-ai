import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-nexus-dark flex items-center justify-center p-4">
      <Card className="glass border-0 max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-white">Contact Support</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-nexus-gray mb-4">Need help? Email us at <a href="mailto:support@nexusai.com" className="text-nexus-cyan underline">support@nexusai.com</a> or use the form below.</p>
          <form action="mailto:support@nexusai.com" method="POST" encType="text/plain">
            <input type="text" name="name" placeholder="Your Name" className="w-full mb-2 p-2 rounded bg-white/10 text-white" required />
            <input type="email" name="email" placeholder="Your Email" className="w-full mb-2 p-2 rounded bg-white/10 text-white" required />
            <textarea name="message" placeholder="How can we help you?" className="w-full mb-4 p-2 rounded bg-white/10 text-white" rows={4} required />
            <button type="submit" className="w-full bg-nexus-gradient text-white py-2 rounded">Send</button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
