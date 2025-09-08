# Visitor Tracking System

## Overview
This portfolio now includes a visitor tracking system that records and displays visitor statistics. The system tracks unique visitors, page views, and provides insights into visitor behavior.

## Features
- Records visitor IP, user agent, referrer, and page path
- Tracks total visits, unique visitors, daily and weekly statistics
- Provides visual charts for visitor trends
- Admin dashboard to view all statistics

## Setup

### MongoDB Configuration
1. Create a MongoDB database (local or MongoDB Atlas)
2. Update the `.env.local` file with your MongoDB connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/visitor_tracking
   ```
   For production with MongoDB Atlas:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/visitor_tracking?retryWrites=true&w=majority
   ```

### Running the Application
1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`
3. Access the admin dashboard at: `/admin`

## Architecture

### Components
- `src/lib/mongodb.ts` - MongoDB connection utility
- `src/lib/mongoose.ts` - Mongoose connection helper
- `src/models/Visitor.ts` - Visitor data model
- `src/middleware.ts` - Automatic visit tracking middleware
- `src/app/api/visitors/route.ts` - API endpoint for recording visits
- `src/app/api/visitors/stats/route.ts` - API endpoint for visitor statistics
- `src/components/VisitorCounter.tsx` - Component to display visitor statistics
- `src/app/admin/page.tsx` - Admin dashboard page
- `src/app/admin/layout.tsx` - Admin page layout

### How It Works
1. The middleware automatically records visits to all pages (excluding API routes and static assets)
2. Visit data is stored in MongoDB using the Visitor model
3. The VisitorCounter component fetches and displays statistics
4. The admin dashboard is accessible via the footer link

## Security Considerations
- IP addresses are stored but not displayed in the UI
- No personal information beyond IP and user agent is collected
- Admin page is publicly accessible - consider adding authentication for production use

## Future Enhancements
- Add authentication for the admin dashboard
- Implement geolocation for visitor country/city tracking
- Add more detailed analytics (time on page, bounce rate, etc.)
- Create exportable reports