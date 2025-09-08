import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Create response
    const response = NextResponse.json(
      { message: 'Logout successful' },
      { status: 200 }
    );
    
    // Clear the session cookie with same settings as when it was set
    response.cookies.set({
      name: 'session_token',
      value: '',
      httpOnly: true,
      path: '/',
      maxAge: 0, // Expire immediately
      sameSite: 'strict',
      secure: process.env.FORCE_HTTPS === 'true', // Only send over HTTPS when enabled
    });
    
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { message: 'An error occurred during logout' },
      { status: 500 }
    );
  }
}