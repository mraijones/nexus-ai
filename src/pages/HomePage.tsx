import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-nexus-dark flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-2xl text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Welcome to Nexus AI Business Hub</h1>
        <p className="text-nexus-gray mb-8">
          Manage your business, employees, and membership all in one place.
        </p>
      </div>
      <div className="w-full max-w-md flex flex-col gap-6">
        <Button className="w-full bg-nexus-gradient text-white text-lg py-4" onClick={() => navigate('/my-business')}>
          My Business
        </Button>
        <Button className="w-full bg-nexus-gradient text-white text-lg py-4" onClick={() => navigate('/directory')}>
          Employee Directory
        </Button>
        <Button className="w-full bg-nexus-gradient text-white text-lg py-4" onClick={() => navigate('/membership')}>
          Membership / Upgrade
        </Button>
      </div>
    </div>
  );
}

export default HomePage;
