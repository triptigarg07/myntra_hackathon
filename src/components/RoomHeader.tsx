import React from 'react';
import { motion } from 'framer-motion';
import { Users, Copy, EyeOff, Eye, Settings, Crown } from 'lucide-react';
import { Avatar } from './ui/Avatar';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { useApp } from '../context/AppContext';

export const RoomHeader: React.FC = () => {
  const { state, dispatch } = useApp();
  
  if (!state.currentRoom) return null;

  const handleCopyInvite = () => {
    navigator.clipboard.writeText(state.currentRoom?.inviteCode || '');
    // Show toast notification
  };

  const toggleSecretMode = () => {
    dispatch({ type: 'TOGGLE_SECRET_MODE' });
  };

  return (
    <Card className="p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              {state.currentRoom.name}
              <Crown className="w-4 h-4 text-yellow-500" />
            </h1>
            <p className="text-sm text-gray-600">
              {state.roomMembers.length} members • {state.roomMembers.filter(m => m.isOnline).length} online
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Online Members */}
          <div className="flex items-center gap-1">
            {state.roomMembers.slice(0, 5).map((member) => (
              <Avatar
                key={member.id}
                src={member.user.avatar}
                alt={member.user.name}
                size="sm"
                online={member.isOnline}
              />
            ))}
            {state.roomMembers.length > 5 && (
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600">
                +{state.roomMembers.length - 5}
              </div>
            )}
          </div>

          {/* Secret Mode Toggle */}
          <Button
            variant={state.isSecretMode ? "primary" : "outline"}
            size="sm"
            onClick={toggleSecretMode}
            className="flex items-center gap-2"
          >
            {state.isSecretMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {state.isSecretMode ? 'Secret Mode' : 'Normal Mode'}
          </Button>

          {/* Invite Code */}
          <div className="flex items-center gap-2">
            <code className="px-2 py-1 bg-gray-100 rounded text-sm font-mono">
              {state.currentRoom.inviteCode}
            </code>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyInvite}
              className="p-2"
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>

          {/* Settings */}
          <Button variant="ghost" size="sm" className="p-2">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {state.isSecretMode && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-3 p-3 bg-purple-50 rounded-lg border border-purple-200"
        >
          <p className="text-sm text-purple-700">
            🎁 <strong>Secret Mode Active:</strong> Your activity is hidden from other members while you still see their recommendations.
          </p>
        </motion.div>
      )}
    </Card>
  );
};
