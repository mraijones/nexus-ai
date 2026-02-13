import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/lib/auth';
import { TaskPage } from './pages/Task';
import { SettingsPage } from './pages/Settings';
import { Navigation } from './sections/Navigation';
import { Hero } from './sections/Hero';
import { LogoMarquee } from './sections/LogoMarquee';
import { AIEmployees } from './sections/AIEmployees';
import { Services } from './sections/Services';
import { HowItWorks } from './sections/HowItWorks';
import { Testimonials } from './sections/Testimonials';
import { Pricing } from './sections/Pricing';
import { CTA } from './sections/CTA';
import { Footer } from './sections/Footer';
import { AuthPage } from './pages/Auth';
import { DashboardPage } from './pages/Dashboard';
import { HireEmployeePage } from './pages/HireEmployee';
import  CreateTaskPage  from './pages/CreateTask';
import { CheckoutPage } from './pages/Checkout';
import { StatusPage } from './pages/Status';

// Marketing/Home page
function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <LogoMarquee />
        <div id="employees">
          <AIEmployees />
        </div>
        <div id="services">
          <Services />
        </div>
        <div id="how-it-works">
          <HowItWorks />
        </div>
        <Testimonials />
        <div id="pricing">
          <Pricing />
        </div>
        <CTA />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="relative min-h-screen bg-nexus-dark text-white overflow-x-hidden">
          {/* Grain overlay */}
          <div className="grain-overlay" />
          
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/status" element={<StatusPage />} />
            
            {/* Protected app routes */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/hire" element={<HireEmployeePage />} />
            <Route path="/tasks/new" element={<CreateTaskPage />} />
            <Route path="/tasks/:id" element={<TaskPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            
            {/* Redirect unknown routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
