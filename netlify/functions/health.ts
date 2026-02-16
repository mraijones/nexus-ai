import type { Context } from "@netlify/functions";

interface DatabaseStatus {
  connected: boolean;
  message?: string;
  error?: string;
}

interface HealthStatus {
  status: 'ok' | 'degraded' | 'error';
  message: string;
  timestamp: string;
  service: string;
  version: string;
  database?: DatabaseStatus;
  error?: string;
}

/**
 * Health check endpoint
 * Returns system status and database connectivity
 */
export default async function handler(req: Request, context: Context) {
  // Allow GET requests for health checks
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const status: HealthStatus = {
      status: 'ok',
      message: 'Yes, I am here! System is operational.',
      timestamp: new Date().toISOString(),
      service: 'Nexus AI',
      version: '1.0.0',
    };

    // Check database connectivity via REST to avoid duplicate client creation
    const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

    if (!supabaseUrl || !supabaseKey) {
      status.status = 'degraded';
      status.database = {
        connected: false,
        error: 'Supabase environment variables are missing',
      };
    } else {
      try {
        const response = await fetch(
          `${supabaseUrl}/rest/v1/ai_employees?select=id&limit=1`,
          {
            headers: {
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`,
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          status.status = 'degraded';
          status.database = {
            connected: false,
            error: errorText || `Health check failed with status ${response.status}`,
          };
        } else {
          status.database = {
            connected: true,
            message: 'Database connection successful',
          };
        }
      } catch (dbError) {
        status.status = 'degraded';
        status.database = {
          connected: false,
          error: dbError instanceof Error ? dbError.message : 'Unknown database error',
        };
      }
    }

    // Return appropriate status code based on health
    const statusCode = status.status === 'ok' ? 200 : 503;
    return new Response(JSON.stringify(status), { status: statusCode });
  } catch (err) {
    console.error('Health check error:', err);
    return new Response(JSON.stringify({
      status: 'error',
      message: 'Health check failed',
      error: err instanceof Error ? err.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }), { status: 503 });
  }
}
