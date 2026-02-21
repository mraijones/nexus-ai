import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/lib/auth';
import { TaskPage } from './pages/Task';
import { SettingsPage } from './pages/Settings';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import EmployeeDirectory from './pages/EmployeeDirectory';
import { AuthPage } from './pages/Auth';
import { DashboardPage } from './pages/Dashboard';
import { HireEmployeePage } from './pages/HireEmployee';
import  CreateTaskPage  from './pages/CreateTask';
import { CheckoutPage } from './pages/Checkout';
import { StatusPage } from './pages/Status';
import MyBusinessPage from './pages/MyBusinessNew';
import AIPlayground from './pages/AIPlayground';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="relative min-h-screen bg-nexus-dark text-white overflow-x-hidden">
          {/* Grain overlay */}
          <div className="grain-overlay" />
          
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/directory" element={<EmployeeDirectory />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/status" element={<StatusPage />} />
            
            {/* Protected app routes */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/my-business" element={<MyBusinessPage />} />
            <Route path="/hire" element={<HireEmployeePage />} />
            <Route path="/tasks/new" element={<CreateTaskPage />} />
            <Route path="/tasks/:id" element={<TaskPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/ai-playground" element={<AIPlayground />} />
            
            {/* Redirect unknown routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
