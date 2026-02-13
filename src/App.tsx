import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/lib/auth';
import { TaskPage } from './pages/Task';
import { SettingsPage } from './pages/Settings';
import HomePage from './pages/HomePage';
import { AuthPage } from './pages/Auth';
import { DashboardPage } from './pages/Dashboard';
import { HireEmployeePage } from './pages/HireEmployee';
import  CreateTaskPage  from './pages/CreateTask';
import { CheckoutPage } from './pages/Checkout';
import { StatusPage } from './pages/Status';

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
