/**
 * Authentication Flow Test Script
 * 
 * This script tests the authentication flow end-to-end.
 * Run this script manually to verify the authentication system works correctly.
 */

import { verifyCredentials, verifySession } from '../lib/auth';

async function testAuthFlow() {
  console.log('🔒 Starting Authentication Flow Test');
  console.log('----------------------------------------');
  
  // Test 1: Verify correct credentials
  try {
    console.log('Test 1: Verifying correct credentials...');
    const username = process.env.ADMIN_USERNAME || 'arjun';
    const password = process.env.ADMIN_PASSWORD || 'portfolio2023';
    
    const isValid = await verifyCredentials(username, password);
    console.log(`Result: ${isValid ? '✅ PASS' : '❌ FAIL'}`);
    
    if (!isValid) {
      throw new Error('Credential verification failed with correct credentials');
    }
  } catch (error) {
    console.error('Test 1 Error:', error);
  }
  
  // Test 2: Verify incorrect credentials
  try {
    console.log('\nTest 2: Verifying incorrect credentials...');
    const isValid = await verifyCredentials('wrong', 'credentials');
    const expectedResult = false;
    console.log(`Result: ${isValid === expectedResult ? '✅ PASS' : '❌ FAIL'}`);
    
    if (isValid !== expectedResult) {
      throw new Error('Credential verification passed with incorrect credentials');
    }
  } catch (error) {
    console.error('Test 2 Error:', error);
  }
  
  // Test 3: Verify session token
  try {
    console.log('\nTest 3: Verifying valid session token...');
    const username = process.env.ADMIN_USERNAME || 'arjun';
    const token = `${username}_${Date.now()}`;
    
    const isValid = verifySession(token);
    console.log(`Result: ${isValid ? '✅ PASS' : '❌ FAIL'}`);
    
    if (!isValid) {
      throw new Error('Session verification failed with valid token');
    }
  } catch (error) {
    console.error('Test 3 Error:', error);
  }
  
  // Test 4: Verify invalid session token
  try {
    console.log('\nTest 4: Verifying invalid session token...');
    const token = 'invalid_token';
    
    const isValid = verifySession(token);
    const expectedResult = false;
    console.log(`Result: ${isValid === expectedResult ? '✅ PASS' : '❌ FAIL'}`);
    
    if (isValid !== expectedResult) {
      throw new Error('Session verification passed with invalid token');
    }
  } catch (error) {
    console.error('Test 4 Error:', error);
  }
  
  console.log('\n----------------------------------------');
  console.log('🔒 Authentication Flow Test Complete');
}

// Run the test
testAuthFlow().catch(console.error);

// Export for importing in other files if needed
export { testAuthFlow };