// Fonction Netlify pour maintenir le site "chaud"
// Appelée automatiquement toutes les 5 minutes par Netlify

const https = require('https');

exports.handler = async (event, context) => {
  // URL du site à garder actif
  const siteUrl = process.env.URL || 'https://velocit-ai.fr';
  
  const endpoints = [
    '/',
    '/api/health',
    '/api/warmup'
  ];
  
  const results = [];
  
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(`${siteUrl}${endpoint}`, {
        headers: {
          'X-Warmup-Request': 'true',
          'User-Agent': 'Netlify-Warmup/1.0'
        },
        signal: AbortSignal.timeout(5000)
      });
      
      results.push({
        endpoint,
        status: response.status,
        success: response.ok
      });
    } catch (error) {
      results.push({
        endpoint,
        status: 0,
        success: false,
        error: error.message
      });
    }
  }
  
  const successCount = results.filter(r => r.success).length;
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Warmup completed',
      timestamp: new Date().toISOString(),
      results,
      summary: `${successCount}/${results.length} endpoints warmed up successfully`
    })
  };
};

// Configuration pour l'exécution programmée
exports.schedule = "*/5 * * * *"; // Toutes les 5 minutes