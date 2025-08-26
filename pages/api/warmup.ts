import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Endpoint de warmup pour maintenir l'instance Next.js active
 * Appelé régulièrement pour éviter les cold starts
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Headers pour éviter le cache
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.setHeader('X-Warmup', 'true');
  
  // Warmup de l'instance
  const warmupData = {
    status: 'warm',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      unit: 'MB'
    },
    nodeVersion: process.version,
    pid: process.pid
  };
  
  // Petit délai pour simuler du traitement et garder l'instance active
  await new Promise(resolve => setTimeout(resolve, 10));
  
  res.status(200).json(warmupData);
}