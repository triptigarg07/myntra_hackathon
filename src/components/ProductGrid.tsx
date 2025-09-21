import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { useApp } from '../context/AppContext';
import { generateMockActivities } from '../utils/mockData';

export const ProductGrid: React.FC = () => {
  const { state, dispatch } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = state.products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(state.products.map(p => p.category))];

  const handleProductView = (productId: string) => {
    if (!state.currentRoom || !state.user) return;

    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    const activity = {
      id: `activity-${Date.now()}`,
      roomId: state.currentRoom.id,
      userId: state.user.id,
      user: state.user,
      actionType: 'view' as const,
      productId: product.id,
      product,
      isSecret: state.isSecretMode,
      createdAt: new Date(),
    };

    dispatch({ type: 'ADD_ACTIVITY', payload: activity });
  };

  const handleProductAdd = (productId: string) => {
    if (!state.currentRoom || !state.user) return;

    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    const activity = {
      id: `activity-${Date.now()}`,
      roomId: state.currentRoom.id,
      userId: state.user.id,
      user: state.user,
      actionType: 'add' as const,
      productId: product.id,
      product,
      isSecret: state.isSecretMode,
      createdAt: new Date(),
    };

    dispatch({ type: 'ADD_ACTIVITY', payload: activity });
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search products, brands..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>

        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ProductCard
              product={product}
              onView={() => handleProductView(product.id)}
              onAdd={() => handleProductAdd(product.id)}
              showGallery={product.images.length > 1}
            />
          </motion.div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found matching your criteria</p>
        </div>
      )}
    </div>
  );
};
