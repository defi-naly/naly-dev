import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') ?? '';
  const { pathname } = request.nextUrl;

  // Redirect app.naly.dev → naly.dev
  if (hostname === 'app.naly.dev') {
    return NextResponse.redirect(
      new URL(pathname + request.nextUrl.search, 'https://naly.dev')
    );
  }

  // Homepage → roots page (all hosts including localhost)
  if (pathname === '/') {
    return NextResponse.rewrite(new URL('/roots', request.url));
  }

  // In production, redirect /roots to / to prevent duplicate URLs
  if (hostname === 'naly.dev' || hostname === 'www.naly.dev') {
    if (pathname === '/roots' || pathname.startsWith('/roots/')) {
      const cleanPath = pathname.replace(/^\/roots\/?/, '/');
      return NextResponse.redirect(new URL(cleanPath || '/', 'https://naly.dev'));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip internal Next.js paths and static files
    '/((?!_next/|favicon\\.ico|.*\\.png|.*\\.jpg|.*\\.svg|.*\\.webp|api/).*)',
  ],
};
