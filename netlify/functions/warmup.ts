import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

/**
 * Fonction Netlify pour maintenir le site "chaud"
 * Peut être déclenchée par un webhook ou un cron job externe
 */
const warmupHandler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  const siteUrl = process.env.URL || 'https://velocit-ai.fr';
  
  console.log('Starting warmup process...');
  
  const endpoints = [
    '/',
    '/api/health',
    '/api/testimonials-safe',
  ];
  
  const results = [];
  
  for (const endpoint of endpoints) {
    try {
      const url = `${siteUrl}${endpoint}`;
      console.log(`Warming up: ${url}`);
      
      const startTime = Date.now();
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'User-Agent': 'VelocitAI-Warmup/1.0',
        },
        signal: AbortSignal.timeout(10000), // 10 secondes timeout
      });
      
      const responseTime = Date.now() - startTime;
      
      results.push({
        endpoint,
        status: response.status,
        ok: response.ok,
        responseTime: `${responseTime}ms`,
      });
      
      // Petit délai entre les requêtes pour ne pas surcharger
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      console.error(`Error warming up ${endpoint}:`, error);
      results.push({
        endpoint,
        status: 0,
        ok: false,
        error: error.message,
      });
    }
  }
  
  const allOk = results.every(r => r.ok);
  
  return {
    statusCode: allOk ? 200 : 207, // 207 = Multi-Status
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    },
    body: JSON.stringify({
      message: 'Warmup completed',
      timestamp: new Date().toISOString(),
      results,
      summary: {
        total: results.length,
        successful: results.filter(r => r.ok).length,
        failed: results.filter(r => !r.ok).length,
      },
    }),
  };
};

export { warmupHandler as handler };