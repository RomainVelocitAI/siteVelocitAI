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
  
  // Headers de cache pour les assets statiques
  if (request.nextUrl.pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  
  // Headers de cache pour les pages (pour éviter les problèmes après inactivité)
  if (request.nextUrl.pathname === '/' || !request.nextUrl.pathname.includes('.')) {
    response.headers.set('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
  }
  
  // Headers de sécurité supplémentaires
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  return response;
}

export const config = {
  matcher: '/:path*',
};