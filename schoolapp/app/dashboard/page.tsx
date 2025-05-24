
'use client'; 

import React from 'react';
import AnnouncementsSection from '../lib/dashboard/AnnouncementsSection';
import QuickAccessSection from '../lib/dashboard/QuickAccessSection';

export default function DashboardHomePage() {
  return (
    <div className="container mx-auto p-4">

      <AnnouncementsSection />
      <QuickAccessSection />

    </div>
  );
}