import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ThumbsUp, ThumbsDown, Award } from 'lucide-react';
import { Card } from './ui/Card';
import { useApp } from '../context/AppContext';
import { Product } from '../types';

export const VotingSummary: React.FC = () => {
  const { state } = useApp();

  // Get all polls and sort by total votes
  const polls = Object.values(state.productPolls);
  const sortedPolls = polls
    .filter(poll => poll.totalVotes > 0)
    .sort((a, b) => b.totalVotes - a.totalVotes)
    .slice(0, 5); // Top 5 most voted products

  // Get most liked and most disliked products
  const mostLiked = sortedPolls.reduce((prev, current) => 
    (current.likes > prev.likes) ? current : prev, 
    { likes: 0, dislikes: 0, messageId: '', productId: '', userVotes: {}, totalVotes: 0 }
  );

  const mostDisliked = sortedPolls.reduce((prev, current) => 
    (current.dislikes > prev.dislikes) ? current : prev, 
    { likes: 0, dislikes: 0, messageId: '', productId: '', userVotes: {}, totalVotes: 0 }
  );

  const getProductById = (productId: string): Product | undefined => {
    return state.products.find(p => p.id === productId);
  };

  if (sortedPolls.length === 0) {
    return null;
  }

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-pink-500" />
        <h3 className="text-lg font-semibold text-gray-900">Family Poll Results</h3>
      </div>

      <div className="space-y-4">
        {/* Most Voted Products */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Most Discussed Products</h4>
          <div className="space-y-2">
            {sortedPolls.slice(0, 3).map((poll, index) => {
              const product = getProductById(poll.productId);
              if (!product) return null;

              return (
                <motion.div
                  key={poll.messageId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center justify-center w-6 h-6 bg-pink-100 text-pink-600 rounded-full text-xs font-bold">
                    {index + 1}
                  </div>
                  <img 
                    src={product.images[0]} 
                    alt={product.title}
                    className="w-8 h-8 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {product.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      ₹{product.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="flex items-center gap-1 text-green-600">
                      <ThumbsUp className="w-3 h-3" />
                      <span>{poll.likes}</span>
                    </div>
                    <div className="flex items-center gap-1 text-red-600">
                      <ThumbsDown className="w-3 h-3" />
                      <span>{poll.dislikes}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Most Liked vs Most Disliked */}
        {(mostLiked.totalVotes > 0 || mostDisliked.totalVotes > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mostLiked.totalVotes > 0 && (
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Most Liked</span>
                </div>
                {(() => {
                  const product = getProductById(mostLiked.productId);
                  return product ? (
                    <div className="flex items-center gap-2">
                      <img 
                        src={product.images[0]} 
                        alt={product.title}
                        className="w-6 h-6 rounded object-cover"
                      />
                      <span className="text-xs text-green-700 truncate">
                        {product.title}
                      </span>
                      <span className="text-xs font-bold text-green-600">
                        {mostLiked.likes} likes
                      </span>
                    </div>
                  ) : null;
                })()}
              </div>
            )}

            {mostDisliked.totalVotes > 0 && (
              <div className="p-3 bg-red-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-medium text-red-800">Most Disliked</span>
                </div>
                {(() => {
                  const product = getProductById(mostDisliked.productId);
                  return product ? (
                    <div className="flex items-center gap-2">
                      <img 
                        src={product.images[0]} 
                        alt={product.title}
                        className="w-6 h-6 rounded object-cover"
                      />
                      <span className="text-xs text-red-700 truncate">
                        {product.title}
                      </span>
                      <span className="text-xs font-bold text-red-600">
                        {mostDisliked.dislikes} dislikes
                      </span>
                    </div>
                  ) : null;
                })()}
              </div>
            )}
          </div>
        )}

        {/* Overall Stats */}
        <div className="pt-2 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Total products voted on: {sortedPolls.length}</span>
            <span>
              Total votes: {sortedPolls.reduce((sum, poll) => sum + poll.totalVotes, 0)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
