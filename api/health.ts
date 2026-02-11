import { supabaseAdmin } from '../server/supabase.js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Health check endpoint
 * Returns system status and database connectivity
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Allow GET requests for health checks
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const status = {
      status: 'ok',
      message: 'Yes, I am here! System is operational.',
      timestamp: new Date().toISOString(),
      service: 'Nexus AI',
      version: '1.0.0',
    };

    // Check database connectivity
    try {
      const { error } = await supabaseAdmin
        .from('ai_employees')
        .select('count')
        .limit(1);

      if (error) {
        status.status = 'degraded';
        status.database = {
          connected: false,
          error: error.message,
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

    // Return appropriate status code based on health
    const statusCode = status.status === 'ok' ? 200 : 503;
    return res.status(statusCode).json(status);
  } catch (err) {
    console.error('Health check error:', err);
    return res.status(503).json({
      status: 'error',
      message: 'Health check failed',
      error: err instanceof Error ? err.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });
  }
}
