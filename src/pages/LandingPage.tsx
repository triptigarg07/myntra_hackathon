import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, ShoppingBag, Sparkles, Heart, ArrowRight, Plus, LogIn } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { CreateRoomModal } from '../components/CreateRoomModal';

export const LandingPage: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [joinCode, setJoinCode] = useState('');

  const handleJoinRoom = () => {
    // Mock joining a room
    console.log('Joining room with code:', joinCode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-8 h-8 text-pink-600" />
            <span className="text-2xl font-bold text-gray-900">Myntra Family Room</span>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <LogIn className="w-4 h-4" />
            Login
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Shop Together,
            <span className="text-pink-600"> Stay Connected</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 mb-8 leading-relaxed"
          >
            Create private shared spaces where family members collaboratively plan trips,
            browse products together, and get synchronized recommendations in real-time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
          >
            <Button
              size="lg"
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Family Room
            </Button>
            <div className="flex gap-2">
              <input
                type="text"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                placeholder="Enter room code"
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <Button
                variant="outline"
                size="lg"
                onClick={handleJoinRoom}
                disabled={!joinCode}
              >
                Join
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center text-gray-900 mb-12"
        >
          Everything You Need for Family Shopping
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Users className="w-8 h-8 text-blue-500" />,
              title: 'Real-time Collaboration',
              description: 'See what your family members are viewing and adding in real-time. Stay synchronized across all devices.',
            },
            {
              icon: <Sparkles className="w-8 h-8 text-purple-500" />,
              title: 'AI-Powered Recommendations',
              description: 'Get smart suggestions based on your family\'s browsing patterns and trip plans.',
            },
            {
              icon: <Heart className="w-8 h-8 text-pink-500" />,
              title: 'Secret Gift Mode',
              description: 'Hide your purchases from family members while still seeing group recommendations.',
            },
            {
              icon: <ShoppingBag className="w-8 h-8 text-green-500" />,
              title: 'Trip Planning Assistant',
              description: 'AI-generated packing lists and outfit suggestions based on your destination and duration.',
            },
            {
              icon: <Users className="w-8 h-8 text-orange-500" />,
              title: 'Family Insights',
              description: 'Track group preferences and discover trending items among your family members.',
            },
            {
              icon: <Sparkles className="w-8 h-8 text-indigo-500" />,
              title: 'Smart Notifications',
              description: 'Get notified about price drops, new arrivals, and family member activities.',
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card hover className="p-6 h-full">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-pink-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Family Shopping?
          </h2>
          <p className="text-pink-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of families who are already shopping smarter together with Myntra Family Room.
          </p>
          <Button
            size="lg"
            onClick={() => setShowCreateModal(true)}
            className="bg-white text-pink-600 hover:bg-gray-50 border-2 border-white hover:border-gray-200"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>

      <CreateRoomModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </div>
  );
};
