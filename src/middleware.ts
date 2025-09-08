import { NextRequest, NextResponse } from 'next/server';

// Get admin username from environment variables for token validation
// This is safe for Edge runtime as it doesn't use bcrypt
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'arjun';

/**
 * Simple session verification for middleware (Edge runtime safe)
 */
function verifySessionForMiddleware(token: string): boolean {
  // Simple validation - token should start with admin username
  return token.startsWith(ADMIN_USERNAME);
}

/**
 * Protect route function for middleware (Edge runtime safe)
 */
function protectRouteForMiddleware(request: NextRequest) {
  // Get the session token from cookies
  const token = request.cookies.get('session_token')?.value;
  
  // If no token or invalid token, redirect to login
  if (!token || !verifySessionForMiddleware(token)) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
  
  // Allow access to the route
  return NextResponse.next();
}

export function middleware(request: NextRequest) {
  // Force HTTPS in production
  if (
    process.env.FORCE_HTTPS === 'true' && 
    process.env.NODE_ENV === 'production' && 
    !request.nextUrl.hostname.includes('localhost') && 
    request.nextUrl.protocol === 'http:'
  ) {
    const httpsUrl = request.nextUrl.clone();
    httpsUrl.protocol = 'https:';
    return NextResponse.redirect(httpsUrl);
  }
  
  // Track visitors
  if (request.nextUrl.pathname === '/') {
    // Get visitor info
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const referer = request.headers.get('referer') || 'direct';
    
    // Call the API route to record the visit
    fetch(`${request.nextUrl.origin}/api/visitors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ip, userAgent, referer }),
    }).catch(err => console.error('Error tracking visitor:', err));
  }
  
  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    return protectRouteForMiddleware(request);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/admin/:path*'],
};