import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') ?? '';
  const { pathname } = request.nextUrl;

  // Jorge Events domain routing — rewrite to /jorge-events sub-site
  if (hostname === 'jorge-events.com' || hostname === 'www.jorge-events.com') {
    if (!pathname.startsWith('/jorge-events') && !pathname.startsWith('/api/jorge-events')) {
      const rewritePath = pathname === '/' ? '/jorge-events' : `/jorge-events${pathname}`;
      return NextResponse.rewrite(new URL(rewritePath, request.url));
    }
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
