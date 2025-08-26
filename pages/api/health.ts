import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Endpoint de healthcheck pour maintenir le site "chaud"
 * Peut être appelé par un service externe (UptimeRobot, Pingdom, etc.)
 * ou par Netlify Functions
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Headers pour éviter le cache
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  
  const health: any = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
    uptime: process.uptime(),
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      unit: 'MB'
    }
  };
  
  // Vérifier la connexion Airtable si configurée
  if (process.env.AIRTABLE_API_KEY) {
    try {
      // Faire un appel simple pour vérifier la connexion
      const response = await fetch('https://api.airtable.com/v0/meta/bases', {
        headers: {
          'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
        },
        signal: AbortSignal.timeout(3000), // 3 secondes timeout
      });
      
      health['airtable'] = response.ok ? 'connected' : 'error';
    } catch (error) {
      health['airtable'] = 'timeout';
    }
  }
  
  res.status(200).json(health);
}