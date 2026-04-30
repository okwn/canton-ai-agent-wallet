import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_COOKIE_NAME = 'marcus_auth';

// Routes that require authentication
const PROTECTED_ROUTES = [
  '/dashboard',
  '/activity',
  '/policies',
  '/opportunities',
  '/wallet',
];

// Routes that are always public (even when authenticated)
const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/register',
  '/agent',
  '/api',
];

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
}

function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(route + '/'));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes without checking auth
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // Check auth cookie for protected routes
  const authCookie = request.cookies.get(AUTH_COOKIE_NAME);

  if (!authCookie) {
    // Not authenticated - redirect to login with return URL
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Authenticated - allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
