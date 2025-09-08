'use client';

/**
 * Client-side function to check if the user is authenticated
 * This is a simplified version for demonstration purposes
 * @returns boolean indicating if the user is authenticated
 */
export function isAuthenticated(): boolean {
  // In a real application, you would verify the session token with the server
  // For this demo, we'll just check if the cookie exists
  const cookies = document.cookie.split(';');
  return cookies.some(cookie => cookie.trim().startsWith('session_token='));
}