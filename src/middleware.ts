import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Locale, locales } from "@/config/i18n";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Comprobar si la ruta ya tiene un idioma
  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (hasLocale) return NextResponse.next();

  // Obtener el idioma preferido del navegador
  const browserLocale =
    request.headers.get("accept-language")?.split(",")[0].split("-")[0] || "ca";
  const defaultLocale = locales.includes(browserLocale as Locale)
    ? (browserLocale as Locale)
    : "ca";

  // Redirigir a la ruta con el idioma
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Excluir archivos estáticos y API routes
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
