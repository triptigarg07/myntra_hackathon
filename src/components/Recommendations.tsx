import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Heart } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { Card } from './ui/Card';
import { useApp } from '../context/AppContext';

export const Recommendations: React.FC = () => {
  const { state, dispatch } = useApp();

  useEffect(() => {
    // Generate recommendations based on room activity
    const getRecommendations = () => {
      const recentlyViewed = state.roomActivities
        .filter(a => a.actionType === 'view' || a.actionType === 'add')
        .map(a => a.product)
        .filter(Boolean)
        .slice(0, 5);

      if (recentlyViewed.length === 0) {
        // Show trending products
        const trending = state.products
          .sort((a, b) => b.reviews - a.reviews)
          .slice(0, 6);
        dispatch({ type: 'SET_RECOMMENDATIONS', payload: trending });
        return;
      }

      // Get products from similar categories
      const categories = [...new Set(recentlyViewed.map(p => p!.category))];
      const similar = state.products
        .filter(p => categories.includes(p.category))
        .filter(p => !recentlyViewed.some(rv => rv!.id === p.id))
        .slice(0, 6);

      dispatch({ type: 'SET_RECOMMENDATIONS', payload: similar });
    };

    getRecommendations();
  }, [state.roomActivities, state.products, dispatch]);

  if (state.recommendations.length === 0) {
    return null;
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-purple-500" />
        <h3 className="text-lg font-semibold text-gray-900">
          Recommended for Your Room
        </h3>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        Based on what your family members are viewing and adding
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {state.recommendations.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <ProductCard
              product={product}
              compact
              showGallery={product.images.length > 1}
              onView={() => {
                // Handle view
              }}
              onAdd={() => {
                // Handle add
              }}
            />
          </motion.div>
        ))}
      </div>
    </Card>
  );
};
