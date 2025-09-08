import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import { Visitor } from '@/models/Visitor';

// POST endpoint to record a new visit
export async function POST(request: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();
    
    // Get client IP address
    const ip = request.headers.get('x-forwarded-for') || 
              request.headers.get('x-real-ip') || 
              '0.0.0.0';
    
    // Get user agent
    const userAgent = request.headers.get('user-agent') || 'Unknown';
    
    // Get referrer
    const referrer = request.headers.get('referer') || undefined;
    
    // Get the path that was visited
    const url = new URL(request.url);
    const path = url.pathname || '/';
    
    // Create a new visitor record
    const visitor = await Visitor.create({
      ip,
      userAgent,
      referrer,
      path,
      timestamp: new Date(),
    });
    
    return NextResponse.json({ success: true, id: visitor._id }, { status: 201 });
  } catch (error) {
    console.error('Error recording visit:', error);
    return NextResponse.json({ error: 'Failed to record visit' }, { status: 500 });
  }
}

// GET endpoint to get visitor count
export async function GET() {
  try {
    // Connect to the database
    await dbConnect();
    
    // Get total visitor count
    const totalCount = await Visitor.countDocuments();
    
    // Get unique visitor count (by IP)
    const uniqueCount = await Visitor.distinct('ip').then(ips => ips.length);
    
    // Get today's visitor count
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCount = await Visitor.countDocuments({ timestamp: { $gte: today } });
    
    // Get visitor count for the last 7 days
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    const weeklyCount = await Visitor.countDocuments({ timestamp: { $gte: lastWeek } });
    
    return NextResponse.json({
      success: true,
      stats: {
        total: totalCount,
        unique: uniqueCount,
        today: todayCount,
        weekly: weeklyCount
      }
    });
  } catch (error) {
    console.error('Error getting visitor stats:', error);
    return NextResponse.json({ error: 'Failed to get visitor stats' }, { status: 500 });
  }
}