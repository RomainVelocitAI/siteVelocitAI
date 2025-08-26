// Netlify Edge Function pour gérer les erreurs 500
export default async (request, context) => {
  try {
    // Continuer avec la requête normale
    const response = await context.next();
    
    // Si c'est une erreur 500 et c'est une première visite
    if (response.status === 500) {
      const url = new URL(request.url);
      
      // Logger l'erreur pour debug
      console.error(`Error 500 on ${url.pathname} at ${new Date().toISOString()}`);
      
      // Vérifier si c'est une première visite (pas de cookie)
      const cookies = request.headers.get('cookie') || '';
      const hasSession = cookies.includes('velocitai-session');
      
      if (!hasSession) {
        // Première visite : retourner une page de fallback avec auto-refresh
        return new Response(`
          <!DOCTYPE html>
          <html lang="fr">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Chargement - Velocit.AI</title>
            <meta http-equiv="refresh" content="2">
            <style>
              body {
                margin: 0;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              }
              .container {
                text-align: center;
                color: white;
                padding: 2rem;
              }
              .loader {
                width: 50px;
                height: 50px;
                border: 3px solid rgba(255,255,255,0.3);
                border-top: 3px solid white;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 2rem;
              }
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              h1 { font-size: 1.5rem; margin: 0 0 0.5rem; }
              p { opacity: 0.9; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="loader"></div>
              <h1>Chargement en cours...</h1>
              <p>Première visite, initialisation du site</p>
            </div>
          </body>
          </html>
        `, {
          status: 200,
          headers: {
            'Content-Type': 'text/html; charset=UTF-8',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Set-Cookie': 'velocitai-session=active; Path=/; Max-Age=86400; SameSite=Lax'
          }
        });
      }
    }
    
    return response;
  } catch (error) {
    console.error('Edge function error:', error);
    // En cas d'erreur, laisser passer la requête
    return context.next();
  }
};

export const config = {
  path: "/*"
};