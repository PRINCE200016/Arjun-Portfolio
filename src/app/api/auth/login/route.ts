import { NextRequest, NextResponse } from 'next/server';
import { verifyCredentials } from '@/lib/auth';

// Simple in-memory rate limiting
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const loginAttempts = new Map<string, RateLimitEntry>();

// Get rate limiting settings from environment variables
const MAX_LOGIN_ATTEMPTS = parseInt(process.env.MAX_LOGIN_ATTEMPTS || '5', 10);
const LOGIN_TIMEOUT = parseInt(process.env.LOGIN_TIMEOUT || '300', 10); // seconds

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    
    // Check if IP is rate limited
    const now = Date.now();
    const rateLimitInfo = loginAttempts.get(ip);
    
    if (rateLimitInfo && now < rateLimitInfo.resetTime) {
      if (rateLimitInfo.count >= MAX_LOGIN_ATTEMPTS) {
        const timeRemaining = Math.ceil((rateLimitInfo.resetTime - now) / 1000);
        return NextResponse.json(
          { message: `Too many login attempts. Try again in ${timeRemaining} seconds.` },
          { status: 429 }
        );
      }
    }
    
    const { username, password } = await request.json();

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { message: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Verify credentials - now async with bcrypt
    const isValid = await verifyCredentials(username, password);
    
    // Update rate limiting on failed attempt
    if (!isValid) {
      const resetTime = now + (LOGIN_TIMEOUT * 1000);
      
      if (rateLimitInfo && now < rateLimitInfo.resetTime) {
        loginAttempts.set(ip, {
          count: rateLimitInfo.count + 1,
          resetTime: rateLimitInfo.resetTime
        });
      } else {
        loginAttempts.set(ip, {
          count: 1,
          resetTime
        });
      }
      
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Reset rate limiting on successful login
    loginAttempts.delete(ip);

    // Create session token
    const token = `${username}_${Date.now()}`;
    
    // Set cookie
    const response = NextResponse.json(
      { message: 'Login successful' },
      { status: 200 }
    );
    
    // Get session expiry from environment variables
    const sessionExpiry = parseInt(process.env.SESSION_EXPIRY || '86400', 10); // 24 hours default
    
    response.cookies.set({
      name: 'session_token',
      value: token,
      httpOnly: true,
      path: '/',
      maxAge: sessionExpiry,
      sameSite: 'strict',
      secure: process.env.FORCE_HTTPS === 'true', // Only send over HTTPS when enabled
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'An error occurred during login' },
      { status: 500 }
    );
  }
}