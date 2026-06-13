"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { RecentActivityFeed, ActivityItem } from '@/components/ui/dashboard-activities';
import { UserPlus, Settings, FileText, Upload } from 'lucide-react';

const initialActivities: ActivityItem[] = [
  {
    id: "1",
    icon: UserPlus,
    message: <>New supporter <span className="font-bold text-white">John Doe</span> registered.</>,
    timestamp: "Just now",
    iconColorClass: "text-blue-400 bg-blue-900/50",
  },
  {
    id: "2",
    icon: Settings,
    message: "Admin dashboard configured.",
    timestamp: "5 minutes ago",
    iconColorClass: "text-orange-400 bg-orange-900/50",
  },
];

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin/login');
      } else {
        setLoading(false);
      }
    };
    checkUser();
  }, [router]);

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div>
      <h1 className="font-display text-4xl text-white mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="doppelrand p-1">
            <div className="doppelrand-inner p-8">
                <div className="text-gray-400 uppercase tracking-widest text-xs mb-2">Total Supporters</div>
                <div className="font-display text-4xl text-gold">1,240</div>
            </div>
        </div>
        <div className="doppelrand p-1">
            <div className="doppelrand-inner p-8">
                <div className="text-gray-400 uppercase tracking-widest text-xs mb-2">Active Engagement</div>
                <div className="font-display text-4xl text-white">89%</div>
            </div>
        </div>
        <div className="doppelrand p-1">
            <div className="doppelrand-inner p-8">
                <div className="text-gray-400 uppercase tracking-widest text-xs mb-2">New Signups (Today)</div>
                <div className="font-display text-4xl text-white">12</div>
            </div>
        </div>
      </div>
      
      {/* Activity Feed Section */}
      <div className="doppelrand p-1 h-96">
        <div className="doppelrand-inner h-full p-6">
            <RecentActivityFeed activities={initialActivities} />
        </div>
      </div>
    </div>
  );
}
