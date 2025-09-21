import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';

interface ProductImageGalleryProps {
  product: Product;
  className?: string;
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  product,
  className = '',
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState<boolean[]>(new Array(product.images.length).fill(false));

  const handleImageError = (index: number) => {
    setImageError(prev => {
      const newErrors = [...prev];
      newErrors[index] = true;
      return newErrors;
    });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  if (product.images.length === 0) {
    return (
      <div className={`w-full bg-gray-100 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center">
          <p className="text-gray-500">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative group ${className}`}>
      {/* Main Image */}
      <div className="relative overflow-hidden rounded-lg">
        {!imageError[currentImageIndex] ? (
          <img
            src={product.images[currentImageIndex]}
            alt={`${product.title} - Image ${currentImageIndex + 1}`}
            className="w-full h-64 object-cover transition-all duration-300"
            onError={() => handleImageError(currentImageIndex)}
          />
        ) : (
          <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500">Image not available</p>
            </div>
          </div>
        )}

        {/* Navigation Arrows */}
        {product.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {product.images.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
            {currentImageIndex + 1} / {product.images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {product.images.length > 1 && (
        <div className="flex gap-2 mt-2 overflow-x-auto">
          {product.images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`flex-shrink-0 w-12 h-12 rounded overflow-hidden border-2 transition-colors ${
                currentImageIndex === index
                  ? 'border-blue-500'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {!imageError[index] ? (
                <img
                  src={image}
                  alt={`${product.title} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(index)}
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <div className="w-3 h-3 bg-gray-300 rounded"></div>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
