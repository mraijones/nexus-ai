import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import React from 'react';

// Simple error boundary for debugging
function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState<Error | null>(null);

  React.useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      setError(event.error);
    };

    window.addEventListener('error', handleError);
    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);

  if (error) {
    return (
      <div style={{ color: 'red', padding: 32 }}>
        <h1>App Error</h1>
        <pre>{error.message}</pre>
        <pre>{error.stack}</pre>
      </div>
    );
  }
  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
