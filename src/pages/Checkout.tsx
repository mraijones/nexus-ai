import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/lib/auth';
import { PRICING_PLANS } from '@/lib/stripe';
import {
  ArrowLeft,
  Building2,
  Check,
  CreditCard,
  Crown,
  Loader2,
  Shield,
  Zap
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export function CheckoutPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [isYearly, setIsYearly] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const planId = searchParams.get('plan') || 'starter';
  const plan = PRICING_PLANS.find(p => p.id === planId) || PRICING_PLANS[1];

  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  const period = isYearly ? 'year' : 'month';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate Stripe checkout
    await new Promise(resolve => setTimeout(resolve, 3000));

    setIsProcessing(false);
    navigate('/dashboard?upgraded=true');
  }

  const getPlanIcon = () => {
    switch (plan.id) {
      case 'starter':
        return <Zap className="w-8 h-8 text-nexus-cyan" />;
      case 'professional':
        return <Crown className="w-8 h-8 text-nexus-purple" />;
      case 'enterprise':
        return <Building2 className="w-8 h-8 text-nexus-blue" />;
      default:
        return <Zap className="w-8 h-8 text-nexus-cyan" />;
    }
  };

  return (
    <div className="min-h-screen bg-nexus-dark">
      {/* Header */}
      <header className="border-b border-white/5 bg-nexus-dark/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/pricing')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-bold text-white">Complete Your Purchase</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-3">
              <Card className="glass border-0">
                <CardHeader>
                  <CardTitle className="text-white">Payment Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Billing Cycle */}
                    <div>
                      <Label className="text-white mb-3 block">Billing Cycle</Label>
                      <Tabs value={isYearly ? 'yearly' : 'monthly'} onValueChange={(v) => setIsYearly(v === 'yearly')}>
                        <TabsList className="grid w-full grid-cols-2 bg-white/5">
                          <TabsTrigger value="monthly" className="data-[state=active]:bg-nexus-gradient data-[state=active]:text-white">
                            Monthly
                          </TabsTrigger>
                          <TabsTrigger value="yearly" className="data-[state=active]:bg-nexus-gradient data-[state=active]:text-white">
                            Yearly (Save 20%)
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>

                    {/* Card Details */}
                    <div className="space-y-4">
                      <Label className="text-white">Card Information</Label>
                      <div className="space-y-3">
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-nexus-gray" />
                          <Input
                            placeholder="Card number"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-nexus-gray"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <Input
                            placeholder="MM/YY"
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                            className="bg-white/5 border-white/10 text-white placeholder:text-nexus-gray"
                          />
                          <Input
                            placeholder="CVC"
                            value={cvc}
                            onChange={(e) => setCvc(e.target.value)}
                            className="bg-white/5 border-white/10 text-white placeholder:text-nexus-gray"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Name on Card */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">Name on Card</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        defaultValue={user?.full_name ? user.full_name.split(' ')[0] : ''}
                        className="bg-white/5 border-white/10 text-white placeholder:text-nexus-gray"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        defaultValue={user?.email}
                        className="bg-white/5 border-white/10 text-white placeholder:text-nexus-gray"
                      />
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full bg-nexus-gradient text-white py-6"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin mr-2" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Shield className="w-5 h-5 mr-2" />
                          Pay {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                          }).format(price)}
                        </>
                      )}
                    </Button>

                    <p className="text-center text-nexus-gray text-sm flex items-center justify-center gap-2">
                      <Shield className="w-4 h-4" />
                      Secure payment powered by Stripe
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-2">
              <Card className="glass border-0 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-white">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Plan */}
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                    <div className="w-12 h-12 rounded-xl bg-nexus-gradient flex items-center justify-center">
                      {getPlanIcon()}
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{plan.name}</h3>
                      <p className="text-sm text-nexus-gray">{plan.description}</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <p className="text-sm text-nexus-gray mb-3">What's included:</p>
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm text-white">
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-white/10" />

                  {/* Pricing */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-nexus-gray">
                      <span>Subtotal</span>
                      <span>{new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(price)}</span>
                    </div>
                    <div className="flex justify-between text-nexus-gray">
                      <span>Tax</span>
                      <span>Included</span>
                    </div>
                    <div className="h-px bg-white/10 my-2" />
                    <div className="flex justify-between text-white font-bold text-lg">
                      <span>Total</span>
                      <span>{new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(price)}/{period}</span>
                    </div>
                  </div>

                  {/* Guarantee */}
                  <div className="p-4 bg-green-500/10 rounded-xl">
                    <p className="text-sm text-green-400 text-center">
                      14-day money-back guarantee. Cancel anytime.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
