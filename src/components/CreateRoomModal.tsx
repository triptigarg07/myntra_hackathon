import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Lock, Globe } from 'lucide-react';
import { Button } from './ui/Button';
import { useApp } from '../context/AppContext';
import { generateMockRoom, generateMockUsers, generateMockActivities } from '../utils/mockData';

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateRoomModal: React.FC<CreateRoomModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { state, dispatch } = useApp();
  const [roomName, setRoomName] = useState('');
  const [visibility, setVisibility] = useState<'private' | 'public'>('private');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateRoom = async () => {
    if (!roomName.trim()) return;

    setIsCreating(true);
    
    // Simulate room creation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newRoom = {
      ...generateMockRoom(),
      name: roomName,
      visibility,
    };

    // Mock room members
    const mockUsers = generateMockUsers(3);
    const members = [
      {
        id: 'member-1',
        roomId: newRoom.id,
        userId: state.user!.id,
        user: state.user!,
        role: 'owner' as const,
        joinedAt: new Date(),
        isOnline: true,
      },
      ...mockUsers.map((user, index) => ({
        id: `member-${index + 2}`,
        roomId: newRoom.id,
        userId: user.id,
        user,
        role: 'member' as const,
        joinedAt: new Date(),
        isOnline: Math.random() > 0.3,
      })),
    ];

    dispatch({ type: 'SET_CURRENT_ROOM', payload: newRoom });
    dispatch({ type: 'SET_ROOM_MEMBERS', payload: members });
    dispatch({ type: 'SET_ACTIVITIES', payload: generateMockActivities(newRoom.id, state.products) });

    setIsCreating(false);
    onClose();
    setRoomName('');
    
    // Scroll to top smoothly after room creation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-md"
          >
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Create Family Room</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Room Name
                </label>
                <input
                  type="text"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  placeholder="e.g., Family Trip to Goa"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Visibility
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="private"
                      checked={visibility === 'private'}
                      onChange={(e) => setVisibility(e.target.value as 'private')}
                      className="text-pink-600 focus:ring-pink-500"
                    />
                    <Lock className="w-4 h-4 ml-2 mr-1 text-gray-600" />
                    <span className="text-sm text-gray-700">Private - Invite only</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="public"
                      checked={visibility === 'public'}
                      onChange={(e) => setVisibility(e.target.value as 'public')}
                      className="text-pink-600 focus:ring-pink-500"
                    />
                    <Globe className="w-4 h-4 ml-2 mr-1 text-gray-600" />
                    <span className="text-sm text-gray-700">Public - Anyone can join</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-3 p-6 border-t bg-gray-50">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateRoom}
                isLoading={isCreating}
                disabled={!roomName.trim()}
                className="flex-1"
              >
                Create Room
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
