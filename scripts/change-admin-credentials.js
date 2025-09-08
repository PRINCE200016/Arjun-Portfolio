/**
 * Admin Credentials Change Script
 * 
 * This script allows you to change the admin username and password.
 * It updates the .env.local file (for development) or .env.production file (for production).
 * 
 * Usage: node scripts/change-admin-credentials.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const bcrypt = require('bcrypt');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Determine which environment file to update
async function getEnvironmentFile() {
  return new Promise((resolve) => {
    rl.question('Which environment do you want to update? (1: development, 2: production) ', (answer) => {
      if (answer === '2') {
        resolve('.env.production');
      } else {
        resolve('.env.local');
      }
    });
  });
}

// Get new username from user
async function getNewUsername() {
  return new Promise((resolve) => {
    rl.question('Enter new admin username: ', (username) => {
      if (!username.trim()) {
        console.log('Username cannot be empty. Please try again.');
        return getNewUsername().then(resolve);
      }
      resolve(username.trim());
    });
  });
}

// Get new password from user
async function getNewPassword() {
  return new Promise((resolve) => {
    rl.question('Enter new admin password (min 8 characters): ', (password) => {
      if (password.length < 8) {
        console.log('Password must be at least 8 characters long. Please try again.');
        return getNewPassword().then(resolve);
      }
      resolve(password);
    });
  });
}

// Confirm password
async function confirmPassword(password) {
  return new Promise((resolve) => {
    rl.question('Confirm new admin password: ', (confirmPassword) => {
      if (confirmPassword !== password) {
        console.log('Passwords do not match. Please try again.');
        return getNewPassword().then(newPassword => confirmPassword(newPassword).then(resolve));
      }
      resolve(password);
    });
  });
}

// Update environment file with new credentials
async function updateEnvFile(envFile, username, password) {
  const envPath = path.resolve(process.cwd(), envFile);
  
  // Check if file exists
  if (!fs.existsSync(envPath)) {
    // If file doesn't exist, create it with the admin credentials
    fs.writeFileSync(envPath, `ADMIN_USERNAME=${username}\nADMIN_PASSWORD=${password}\n`);
    return true;
  }
  
  // Read existing file
  let envContent = fs.readFileSync(envPath, 'utf8');
  
  // Update or add admin credentials
  if (envContent.includes('ADMIN_USERNAME=')) {
    envContent = envContent.replace(/ADMIN_USERNAME=.*\n/, `ADMIN_USERNAME=${username}\n`);
  } else {
    envContent += `\nADMIN_USERNAME=${username}`;
  }
  
  if (envContent.includes('ADMIN_PASSWORD=')) {
    envContent = envContent.replace(/ADMIN_PASSWORD=.*\n/, `ADMIN_PASSWORD=${password}\n`);
  } else {
    envContent += `\nADMIN_PASSWORD=${password}`;
  }
  
  // Write updated content back to file
  fs.writeFileSync(envPath, envContent);
  return true;
}

// Main function
async function changeAdminCredentials() {
  try {
    console.log('🔐 Admin Credentials Change Utility');
    console.log('----------------------------------------');
    
    const envFile = await getEnvironmentFile();
    const username = await getNewUsername();
    const password = await getNewPassword();
    const confirmedPassword = await confirmPassword(password);
    
    // Update environment file
    await updateEnvFile(envFile, username, confirmedPassword);
    
    console.log('\n✅ Admin credentials updated successfully!');
    console.log(`Environment file updated: ${envFile}`);
    console.log('\n⚠️ Important: You need to restart your server for changes to take effect.');
    
    if (envFile === '.env.production') {
      console.log('\n📝 Note: If you are using a hosting platform, you may need to update');
      console.log('   your environment variables in your hosting platform dashboard as well.');
    }
  } catch (error) {
    console.error('Error updating admin credentials:', error);
  } finally {
    rl.close();
  }
}

// Run the script
changeAdminCredentials();