import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

// Get admin credentials from environment variables
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'arjun';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'portfolio2023';

// Pre-hash the admin password for comparison
let hashedAdminPassword: string | null = null;

// Initialize the hashed password
async function initializeHashedPassword() {
  if (!hashedAdminPassword) {
    hashedAdminPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
  }
  return hashedAdminPassword;
}

// Initialize on module load
initializeHashedPassword().catch(console.error);

/**
 * Verify user credentials
 */
export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  // Ensure the hashed password is initialized
  if (!hashedAdminPassword) {
    await initializeHashedPassword();
  }
  
  // Check username first (fast fail)
  if (username !== ADMIN_USERNAME) {
    return false;
  }
  
  // Compare password with hashed version
  return bcrypt.compare(password, hashedAdminPassword!);
}

/**
 * Verify if a session token is valid
 * This function is safe to use in Edge runtime (middleware)
 */
export function verifySession(token: string): boolean {
  // Simple validation - token should start with admin username
  return token.startsWith(ADMIN_USERNAME);
}

/**
 * Middleware to protect routes
 * This function is safe to use in Edge runtime
 */
export function protectRoute(request: NextRequest) {
  // Get the session token from cookies
  const token = request.cookies.get('session_token')?.value;
  
  // If no token or invalid token, redirect to login
  if (!token || !verifySession(token)) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
  
  // Allow access to the route
  return NextResponse.next();
}