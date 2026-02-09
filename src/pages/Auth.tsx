import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/lib/auth';
import { Eye, EyeOff, Loader2, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function AuthPage() {
  const navigate = useNavigate();
  const { signIn, signUp, user, isLoading } = useAuth();
  const [formLoading, setFormLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup form state
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (isLoading) return; // Wait for auth to load
    if (user) {
      navigate('/dashboard');
    }
  }, [user, isLoading, navigate]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setFormLoading(true);
    setError('');

    try {
      await signIn(loginEmail, loginPassword);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
      setFormLoading(false);
    }
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setFormLoading(true);
    setError('');

    try {
      await signUp(signupEmail, signupPassword, fullName);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Signup failed');
      setFormLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-nexus-dark flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-nexus-dark flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-nexus-gradient flex items-center justify-center">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Nexus AI</h1>
          <p className="text-nexus-gray">Build your AI team today</p>
        </div>

        <Card className="bg-nexus-card border-white/5">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/5">
              <TabsTrigger value="login" className="data-[state=active]:bg-nexus-gradient data-[state=active]:text-white">
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-nexus-gradient data-[state=active]:text-white">
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-6">
              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <div className="p-3 text-sm text-red-400 bg-red-500/10 rounded-lg">
                    {error}
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-white">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="you@company.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-nexus-gray"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-white">Password</Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                      className="bg-white/5 border-white/10 text-white pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-nexus-gray hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={formLoading}
                  className="w-full bg-nexus-gradient hover:opacity-90"
                >
                  {formLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign In'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="mt-6">
              <form onSubmit={handleSignup} className="space-y-4">
                {error && (
                  <div className="p-3 text-sm text-red-400 bg-red-500/10 rounded-lg">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-white">Full Name</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-nexus-gray"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-white">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="you@company.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-nexus-gray"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-company" className="text-white">Company (Optional)</Label>
                  <Input
                    id="signup-company"
                    type="text"
                    placeholder="Acme Inc"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-nexus-gray"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-white">Password</Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                      minLength={6}
                      className="bg-white/5 border-white/10 text-white pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-nexus-gray hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={formLoading}
                  className="w-full bg-nexus-gradient hover:opacity-90"
                >
                  {formLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Account'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </Card>

        <div className="mt-6 text-center">
          <button 
            onClick={() => navigate('/')}
            className="text-nexus-gray hover:text-white text-sm flex items-center justify-center gap-2 mx-auto"
          >
            ← Back to home
          </button>
        </div>
      </div>
    </div>
  );
}

// Card component for Auth page
function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border p-6 ${className}`}>
      {children}
    </div>
  );
}
