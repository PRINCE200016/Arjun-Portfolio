'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface VisitorStats {
  total: number;
  unique: number;
  today: number;
  weekly: number;
  dailyChart: { date: string; visitors: number }[];
  topPages: { path: string; count: number }[];
  topReferrers: { url: string; count: number }[];
}

export default function VisitorCounter() {
  const [stats, setStats] = useState<VisitorStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/visitors/stats');
        
        if (!response.ok) {
          throw new Error('Failed to fetch visitor statistics');
        }
        
        const data = await response.json();
        setStats(data.stats);
      } catch (err) {
        console.error('Error fetching visitor stats:', err);
        setError('Could not load visitor statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    
    // Refresh stats every 5 minutes
    const intervalId = setInterval(fetchStats, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Visitor Statistics</CardTitle>
          <CardDescription>Loading visitor data...</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Visitor Statistics</CardTitle>
          <CardDescription>Error loading data</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visitor Statistics</CardTitle>
        <CardDescription>Track your portfolio visitors</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-muted rounded-lg p-4 text-center">
                <div className="text-3xl font-bold">{stats.total}</div>
                <div className="text-sm text-muted-foreground">Total Visits</div>
              </div>
              <div className="bg-muted rounded-lg p-4 text-center">
                <div className="text-3xl font-bold">{stats.unique}</div>
                <div className="text-sm text-muted-foreground">Unique Visitors</div>
              </div>
              <div className="bg-muted rounded-lg p-4 text-center">
                <div className="text-3xl font-bold">{stats.today}</div>
                <div className="text-sm text-muted-foreground">Today</div>
              </div>
              <div className="bg-muted rounded-lg p-4 text-center">
                <div className="text-3xl font-bold">{stats.weekly}</div>
                <div className="text-sm text-muted-foreground">This Week</div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="details" className="space-y-4">
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Daily Visitors (Last 30 Days)</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.dailyChart}>
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return `${date.getDate()}/${date.getMonth() + 1}`;
                      }}
                    />
                    <YAxis />
                    <Tooltip 
                      labelFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString();
                      }}
                    />
                    <Bar dataKey="visitors" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Top Pages</h3>
                <ul className="space-y-2">
                  {stats.topPages.map((page, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span className="truncate max-w-[200px]">{page.path || '/'}</span>
                      <span className="font-medium">{page.count}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Top Referrers</h3>
                <ul className="space-y-2">
                  {stats.topReferrers.length > 0 ? (
                    stats.topReferrers.map((ref, index) => (
                      <li key={index} className="flex justify-between items-center">
                        <span className="truncate max-w-[200px]">
                          {ref.url ? new URL(ref.url).hostname : 'Direct'}
                        </span>
                        <span className="font-medium">{ref.count}</span>
                      </li>
                    ))
                  ) : (
                    <li>No referrer data available</li>
                  )}
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}