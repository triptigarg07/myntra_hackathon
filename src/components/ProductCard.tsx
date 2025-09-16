import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star, Eye, EyeOff } from 'lucide-react';
import { Product } from '../types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
  onView?: () => void;
  onAdd?: () => void;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onView,
  onAdd,
  compact = false,
}) => {
  const { state } = useApp();

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card hover className={compact ? 'w-48' : 'w-full max-w-sm'}>
      <div className="relative group">
        <img
          src={product.images[0]}
          alt={product.title}
          className={`w-full object-cover rounded-t-lg ${compact ? 'h-32' : 'h-64'}`}
        />
        
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium">
            {discount}% OFF
          </div>
        )}
        
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
            <Heart className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-t-lg flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
            <Button
              size="sm"
              onClick={onView}
              className="bg-white text-gray-800 hover:bg-gray-100"
            >
              <Eye className="w-4 h-4 mr-1" />
              View
            </Button>
            <Button
              size="sm"
              onClick={onAdd}
              className="flex items-center gap-1"
            >
              {state.isSecretMode && <EyeOff className="w-3 h-3" />}
              <ShoppingBag className="w-4 h-4" />
              Add
            </Button>
          </div>
        </div>
      </div>

      <div className={`p-${compact ? '3' : '4'}`}>
        <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
        <h3 className={`font-medium text-gray-900 ${compact ? 'text-sm' : 'text-base'} line-clamp-2 mb-2`}>
          {product.title}
        </h3>
        
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-gray-600">{product.rating}</span>
          </div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        <div className="flex items-center gap-2">
          <span className={`font-bold text-gray-900 ${compact ? 'text-sm' : 'text-lg'}`}>
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-gray-500 line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};
