import React from 'react';
import { RoomHeader } from '../components/RoomHeader';
import { ProductGrid } from '../components/ProductGrid';
import { ActivityFeed } from '../components/ActivityFeed';
import { Recommendations } from '../components/Recommendations';
import { TripPlanner } from '../components/TripPlanner';
import { FamilyChat } from '../components/FamilyChat';

export const RoomPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <RoomHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <TripPlanner />
            <FamilyChat />
            <Recommendations />
            <ProductGrid />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ActivityFeed />
          </div>
        </div>
      </div>
    </div>
  );
};
