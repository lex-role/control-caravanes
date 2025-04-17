import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// Idiomes que suportem
const locales = ['ca', 'es', 'en', 'fr', 'oc']
 
// Funció per obtenir l'idioma del navegador
function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get('accept-language')
  return acceptLanguage?.split(',')?.[0].split('-')[0] || 'ca'
}
 
export function middleware(request: NextRequest) {
  // Comprova si la URL ja té un idioma
  const pathname = request.nextUrl.pathname;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  // Si ja té idioma, no fa res
  if (pathnameHasLocale) return;

  // Si no té idioma, redirigeix afegint l'idioma
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}
 
export const config = {
  matcher: [
    // Aplica el middleware a totes les rutes excepte les següents
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}