import React from 'react';
import { Outlet } from 'react-router';

const DashboardHome = () => {
  return (
    <div>
      {/* This component exists to satisfy the route, but charts are rendered in DashboardLayout */}
      <p className="text-center text-gray-500 py-8">Charts displayed above based on selected section</p>
    </div>
  );
};

export default DashboardHome;