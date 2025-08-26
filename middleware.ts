import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';
  
  // Rediriger www vers non-www
  if (hostname.startsWith('www.')) {
    url.host = hostname.replace('www.', '');
    return NextResponse.redirect(url, 301);
  }
  
  // Rediriger HTTP vers HTTPS en production
  if (process.env.NODE_ENV === 'production' && url.protocol === 'http:') {
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301);
  }
  
  // Bloquer la page parasite ff44f9df
  if (url.pathname === '/ff44f9df') {
    url.pathname = '/';
    return NextResponse.redirect(url, 301);
  }
  
  // Créer la réponse avec des headers optimisés
  const response = NextResponse.next();
  
  // Détection et gestion du warmup
  if (request.headers.get('X-Warmup-Request')) {
    response.headers.set('X-Warmup-Response', 'true');
  }
  
  // Headers de cache pour les assets statiques
  if (request.nextUrl.pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  
  // Headers de cache optimisés pour éviter les erreurs 500 après inactivité
  // Utilisation de stale-while-revalidate pour servir du contenu même périmé pendant le renouvellement
  if (request.nextUrl.pathname === '/' || !request.nextUrl.pathname.includes('.')) {
    response.headers.set(
      'Cache-Control', 
      'public, max-age=0, s-maxage=60, stale-while-revalidate=86400'
    );
  }
  
  // Gestion des erreurs avec cookie de session pour détecter les premières visites
  const hasSession = request.cookies.get('velocitai-session');
  if (!hasSession) {
    // Première visite : définir un cookie de session
    response.cookies.set('velocitai-session', 'active', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400 * 30, // 30 jours
    });
    
    // Ajouter un header pour identifier les premières visites
    response.headers.set('X-First-Visit', 'true');
  }
  
  // Headers de sécurité supplémentaires
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Header pour indiquer que le serveur est prêt
  response.headers.set('X-Server-Ready', 'true');
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api/health (health check endpoint)
     * - api/warmup (warmup endpoint)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api/health|api/warmup|_next/static|_next/image|favicon.ico).*)',
  ],
};