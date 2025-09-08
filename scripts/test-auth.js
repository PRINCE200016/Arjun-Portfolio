/**
 * Authentication Test Runner
 * 
 * This script tests the authentication flow by making HTTP requests to the login API.
 * Run with: node scripts/test-auth.js
 */

// Use CommonJS require for node-fetch v2
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// Get admin credentials from environment variables
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'arjun';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'portfolio2023';

async function testAuthFlow() {
  console.log('🔒 Starting Authentication Flow Test');
  console.log('----------------------------------------');
  
  // Test 1: Login with correct credentials
  try {
    console.log('Test 1: Login with correct credentials...');
    const loginResponse = await fetch('http://localhost:9002/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: ADMIN_USERNAME, password: ADMIN_PASSWORD }),
    });
    
    const loginData = await loginResponse.json();
    const success = loginResponse.status === 200 && loginData.message === 'Login successful';
    
    console.log(`Status: ${loginResponse.status}`);
    console.log(`Response: ${JSON.stringify(loginData)}`);
    console.log(`Result: ${success ? '✅ PASS' : '❌ FAIL'}`);
    
    if (!success) {
      throw new Error('Login failed with correct credentials');
    }
  } catch (error) {
    console.error('Test 1 Error:', error.message);
  }
  
  // Test 2: Login with incorrect credentials
  try {
    console.log('\nTest 2: Login with incorrect credentials...');
    const loginResponse = await fetch('http://localhost:9002/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'wrong', password: 'credentials' }),
    });
    
    const loginData = await loginResponse.json();
    const success = loginResponse.status === 401 && loginData.message === 'Invalid credentials';
    
    console.log(`Status: ${loginResponse.status}`);
    console.log(`Response: ${JSON.stringify(loginData)}`);
    console.log(`Result: ${success ? '✅ PASS' : '❌ FAIL'}`);
    
    if (!success) {
      throw new Error('Login did not properly reject incorrect credentials');
    }
  } catch (error) {
    console.error('Test 2 Error:', error.message);
  }
  
  // Test 3: Logout
  try {
    console.log('\nTest 3: Logout...');
    const logoutResponse = await fetch('http://localhost:9002/api/auth/logout', {
      method: 'POST',
    });
    
    const logoutData = await logoutResponse.json();
    const success = logoutResponse.status === 200 && logoutData.message === 'Logout successful';
    
    console.log(`Status: ${logoutResponse.status}`);
    console.log(`Response: ${JSON.stringify(logoutData)}`);
    console.log(`Result: ${success ? '✅ PASS' : '❌ FAIL'}`);
    
    if (!success) {
      throw new Error('Logout failed');
    }
  } catch (error) {
    console.error('Test 3 Error:', error.message);
  }
  
  console.log('\n----------------------------------------');
  console.log('🔒 Authentication Flow Test Complete');
}

// Run the test
testAuthFlow().catch(console.error);