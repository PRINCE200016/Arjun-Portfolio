# Arjun Portfolio

A modern portfolio website built with Next.js, featuring secure admin authentication, visitor tracking, and content management.

## Features

- Responsive design
- Secure admin authentication
- Visitor tracking
- MongoDB integration
- Admin dashboard

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

The site will be available at http://localhost:9002

## Production Deployment

### Environment Setup

Before deploying to production, make sure to set up your environment variables:

1. Create a `.env.production` file with the following variables:

```
# MongoDB connection string
MONGODB_URI=your_mongodb_atlas_connection_string

# Admin credentials (use strong, unique values)
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_secure_password

# Security settings
JWT_SECRET=your_secure_random_string
SESSION_EXPIRY=86400

# Rate limiting
MAX_LOGIN_ATTEMPTS=5
LOGIN_TIMEOUT=300

# HTTPS settings
FORCE_HTTPS=true
```

### Build and Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Security Recommendations

1. **HTTPS**: Always use HTTPS in production. The middleware will enforce this when `FORCE_HTTPS=true`.
2. **Password Security**: The system uses bcrypt for password hashing.
3. **Rate Limiting**: Login attempts are rate-limited to prevent brute force attacks.
4. **Secure Cookies**: Session cookies are set with `httpOnly`, `sameSite: 'strict'`, and `secure: true` flags.

### Edge Runtime Compatibility

The middleware uses a special implementation to ensure compatibility with Edge runtime:

1. Native Node.js modules like `bcrypt` are excluded from Edge runtime using `serverExternalPackages` in `next.config.ts`
2. Authentication in middleware uses a simplified token verification that doesn't rely on `bcrypt`
3. Full password verification with `bcrypt` only happens in API routes, not in middleware

### Testing Authentication

Run the authentication test script to verify your setup:

```bash
npm run test:auth
```

## Admin Access

Access the admin dashboard at `/admin` after logging in at `/login` with your admin credentials.

### Changing Admin Credentials

To change the admin username and password:

```bash
# Run the credential change utility
npm run change-admin
```

Follow the prompts to update your credentials. The script will:
1. Ask which environment to update (development or production)
2. Prompt for a new username
3. Prompt for a new password (minimum 8 characters)
4. Update the appropriate .env file

After changing credentials, restart your server for the changes to take effect.

## License

MIT

## Hydration Error Prevention

To prevent React hydration errors, the following best practices are implemented:

1. **Time-dependent values**: All time-dependent values like `new Date()` are moved to client-side `useEffect` hooks to ensure server and client render the same initial content.

2. **Browser-only APIs**: Access to browser-only APIs like `document.cookie` is wrapped in `useEffect` hooks to ensure they only run on the client.

3. **State initialization**: Components initialize with static values and update with dynamic values after mounting to prevent mismatches.

Examples:

```tsx
// Footer component - Year handling
const [currentYear, setCurrentYear] = useState('');

useEffect(() => {
  setCurrentYear(new Date().getFullYear().toString());
}, []);

// In render
© {currentYear || '2024'} Arjun Rajawat
```

```tsx
// Chatbot component - Initial message with timestamp
const [messages, setMessages] = useState<Message[]>([]);

useEffect(() => {
  if (messages.length === 0) {
    setMessages([
      {
        id: '1',
        content: `Welcome message...`,
        isUser: false,
        timestamp: new Date()
      }
    ]);
  }
}, [messages.length]);
```
