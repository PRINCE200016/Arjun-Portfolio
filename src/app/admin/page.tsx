import { Metadata } from 'next';
import VisitorCounter from '@/components/VisitorCounter';

export const metadata: Metadata = {
  title: 'Admin Dashboard - Arjun Rajawat',
  description: 'Admin dashboard to view visitor statistics',
};

export default function AdminPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6">
        <VisitorCounter />
      </div>
    </div>
  );
}