import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star, Eye, EyeOff, Image as ImageIcon, Share2 } from 'lucide-react';
import { Product } from '../types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { useApp } from '../context/AppContext';
import { ProductImageGallery } from './ProductImageGallery';

interface ProductCardProps {
  product: Product;
  onView?: () => void;
  onAdd?: () => void;
  onShare?: () => void;
  compact?: boolean;
  showGallery?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onView,
  onAdd,
  onShare,
  compact = false,
  showGallery = false,
}) => {
  const { state } = useApp();
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <Card hover className={compact ? 'w-48' : 'w-full max-w-sm'}>
      <div className="relative group">
        {showGallery && product.images.length > 1 ? (
          <ProductImageGallery 
            product={product} 
            className={compact ? 'h-32' : 'h-64'} 
          />
        ) : (
          <>
            {imageLoading && (
              <div className={`w-full bg-gray-200 animate-pulse rounded-t-lg flex items-center justify-center ${compact ? 'h-32' : 'h-64'}`}>
                <ImageIcon className="w-8 h-8 text-gray-400" />
              </div>
            )}
            
            {!imageError ? (
              <img
                src={product.images[0]}
                alt={product.title}
                className={`w-full object-cover rounded-t-lg transition-opacity duration-300 ${compact ? 'h-32' : 'h-64'} ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                onError={handleImageError}
                onLoad={handleImageLoad}
              />
            ) : (
              <div className={`w-full bg-gray-100 rounded-t-lg flex items-center justify-center ${compact ? 'h-32' : 'h-64'}`}>
                <div className="text-center">
                  <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">Image not available</p>
                </div>
              </div>
            )}
          </>
        )}
        
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
            {onShare && (
              <Button
                size="sm"
                onClick={onShare}
                className="bg-pink-500 text-white hover:bg-pink-600"
              >
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
            )}
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
