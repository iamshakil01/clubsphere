import React from 'react';

const RecentActivity = () => {
  // Mock data for recent activities
  const recentActivities = [
    { id: 1, club: 'Tech Enthusiasts', action: 'New member joined', time: '2 hours ago', icon: 'person_add' },
    { id: 2, club: 'Book Club', action: 'New event created', time: '5 hours ago', icon: 'event' },
    { id: 3, club: 'Photography Club', action: 'Membership fee updated', time: '1 day ago', icon: 'monetization_on' },
    { id: 4, club: 'Gaming Club', action: 'New announcement posted', time: '2 days ago', icon: 'campaign' },
  ];

  return (
    <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {recentActivities.map(activity => (
          <div key={activity.id} className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-400">
                <span className="material-icons-outlined block">{activity.icon}</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">{activity.club}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{activity.action}</p>
              </div>
            </div>
            <span className="text-slate-400 text-sm">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;