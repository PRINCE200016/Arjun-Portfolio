import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import { Visitor } from '@/models/Visitor';

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
    
    // Get daily visitor counts for the last 30 days
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);
    
    const dailyStats = await Visitor.aggregate([
      { $match: { timestamp: { $gte: last30Days } } },
      {
        $group: {
          _id: {
            year: { $year: '$timestamp' },
            month: { $month: '$timestamp' },
            day: { $dayOfMonth: '$timestamp' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
    ]);
    
    // Format daily stats for chart
    const dailyChartData = dailyStats.map(day => ({
      date: `${day._id.year}-${day._id.month.toString().padStart(2, '0')}-${day._id.day.toString().padStart(2, '0')}`,
      visitors: day.count
    }));
    
    // Get top 5 most visited pages
    const topPages = await Visitor.aggregate([
      { $group: { _id: '$path', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);
    
    // Get top 5 referrers
    const topReferrers = await Visitor.aggregate([
      { $match: { referrer: { $exists: true, $ne: null } } },
      { $group: { _id: '$referrer', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);
    
    return NextResponse.json({
      success: true,
      stats: {
        total: totalCount,
        unique: uniqueCount,
        today: todayCount,
        weekly: weeklyCount,
        dailyChart: dailyChartData,
        topPages: topPages.map(page => ({ path: page._id, count: page.count })),
        topReferrers: topReferrers.map(ref => ({ url: ref._id, count: ref.count }))
      }
    });
  } catch (error) {
    console.error('Error getting detailed visitor stats:', error);
    return NextResponse.json({ error: 'Failed to get visitor statistics' }, { status: 500 });
  }
}