import React from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { Eye, ShoppingBag, MessageCircle, Sparkles } from 'lucide-react';
import { Card } from './ui/Card';
import { Avatar } from './ui/Avatar';
import { useApp } from '../context/AppContext';

export const ActivityFeed: React.FC = () => {
  const { state } = useApp();

  const getActivityIcon = (actionType: string) => {
    switch (actionType) {
      case 'view':
        return <Eye className="w-4 h-4 text-blue-500" />;
      case 'add':
        return <ShoppingBag className="w-4 h-4 text-green-500" />;
      case 'recommend':
        return <Sparkles className="w-4 h-4 text-purple-500" />;
      case 'comment':
        return <MessageCircle className="w-4 h-4 text-orange-500" />;
      default:
        return <Eye className="w-4 h-4 text-gray-500" />;
    }
  };

  const getActivityText = (activity: any) => {
    if (activity.isSecret && activity.userId !== state.user?.id) {
      return 'Someone added an item secretly';
    }

    switch (activity.actionType) {
      case 'view':
        return `viewed ${activity.product?.title}`;
      case 'add':
        return `added ${activity.product?.title} to the room`;
      case 'recommend':
        return `recommended ${activity.product?.title}`;
      case 'comment':
        return activity.message;
      default:
        return 'performed an action';
    }
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {state.roomActivities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {activity.isSecret && activity.userId !== state.user?.id ? (
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-purple-600 text-sm">?</span>
              </div>
            ) : (
              <Avatar
                src={activity.user?.avatar || ''}
                alt={activity.user?.name || 'User'}
                size="sm"
              />
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                {getActivityIcon(activity.actionType)}
                <p className="text-sm text-gray-900">
                  <span className="font-medium">
                    {activity.isSecret && activity.userId !== state.user?.id
                      ? 'Someone'
                      : activity.user?.name}
                  </span>{' '}
                  {getActivityText(activity)}
                </p>
              </div>
              
              <p className="text-xs text-gray-500 mt-1">
                {formatDistanceToNow(activity.createdAt, { addSuffix: true })}
              </p>

              {activity.product && (!activity.isSecret || activity.userId === state.user?.id) && (
                <div className="mt-2 flex items-center gap-2">
                  <img
                    src={activity.product.images[0]}
                    alt={activity.product.title}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div>
                    <p className="text-xs font-medium text-gray-900">
                      {activity.product.title}
                    </p>
                    <p className="text-xs text-gray-600">
                      ₹{activity.product.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};
