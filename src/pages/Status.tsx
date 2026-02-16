import { useState, useEffect } from 'react';
import { Navigation } from '../sections/Navigation';
import { Footer } from '../sections/Footer';

interface HealthStatus {
  status: string;
  message: string;
  timestamp: string;
  service?: string;
  version?: string;
  database?: {
    connected: boolean;
    message?: string;
    error?: string;
  };
  error?: string;
}

export function StatusPage() {
  const [status, setStatus] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/.netlify/functions/health');
      const data = await response.json();
      setStatus(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check system status');
      setStatus(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  const getStatusColor = (statusValue: string) => {
    switch (statusValue) {
      case 'ok':
        return 'text-green-500';
      case 'degraded':
        return 'text-yellow-500';
      case 'error':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (statusValue: string) => {
    switch (statusValue) {
      case 'ok':
        return '✓';
      case 'degraded':
        return '⚠';
      case 'error':
        return '✗';
      default:
        return '?';
    }
  };

  return (
    <>
      <Navigation />
      <main className="container mx-auto px-4 py-16 min-h-screen">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">System Status</h1>
          
          <div className="bg-nexus-dark-lighter border border-nexus-purple/20 rounded-lg p-8">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-pulse">Checking system status...</div>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <div className="text-red-500 mb-4">
                  <span className="text-4xl">✗</span>
                </div>
                <p className="text-red-400">{error}</p>
                <button
                  onClick={checkHealth}
                  className="mt-4 px-4 py-2 bg-nexus-purple hover:bg-nexus-purple-light rounded transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : status ? (
              <>
                <div className="text-center mb-8">
                  <div className={`text-6xl mb-4 ${getStatusColor(status.status)}`}>
                    {getStatusIcon(status.status)}
                  </div>
                  <h2 className={`text-2xl font-semibold mb-2 ${getStatusColor(status.status)}`}>
                    {status.message}
                  </h2>
                  {status.service && (
                    <p className="text-gray-400">{status.service} {status.version && `v${status.version}`}</p>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="border-t border-nexus-purple/20 pt-4">
                    <h3 className="text-lg font-semibold mb-2">System Details</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Status:</span>
                        <span className={`ml-2 font-semibold ${getStatusColor(status.status)}`}>
                          {status.status.toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400">Timestamp:</span>
                        <span className="ml-2">{new Date(status.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {status.database && (
                    <div className="border-t border-nexus-purple/20 pt-4">
                      <h3 className="text-lg font-semibold mb-2">Database</h3>
                      <div className="flex items-center gap-2">
                        <span className={status.database.connected ? 'text-green-500' : 'text-red-500'}>
                          {status.database.connected ? '✓' : '✗'}
                        </span>
                        <span>
                          {status.database.connected 
                            ? (status.database.message || 'Connected') 
                            : (status.database.error || 'Not connected')}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="border-t border-nexus-purple/20 pt-4 text-center">
                    <button
                      onClick={checkHealth}
                      className="px-6 py-2 bg-nexus-purple hover:bg-nexus-purple-light rounded transition-colors"
                    >
                      Refresh Status
                    </button>
                  </div>
                </div>
              </>
            ) : null}
          </div>

          <div className="mt-8 text-center text-sm text-gray-400">
            <p>This page shows the current operational status of Nexus AI.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
