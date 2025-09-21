import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Circle, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  MapPin, 
  Calendar,
  Users,
  Thermometer,
  Sparkles,
  Filter
} from 'lucide-react';
import { PackingItem } from '../types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { ProductCard } from './ProductCard';
import { useApp } from '../context/AppContext';

interface PackingListProps {
  onClose?: () => void;
}

export const PackingListComponent: React.FC<PackingListProps> = ({ onClose }) => {
  const { state, dispatch } = useApp();
  const [selectedPriority, setSelectedPriority] = useState<'all' | 'essential' | 'recommended' | 'optional'>('all');
  const [showCart, setShowCart] = useState(false);

  if (!state.packingList) {
    return null;
  }

  const { packingList } = state;

  const filteredItems = packingList.items.filter(item => 
    selectedPriority === 'all' || item.priority === selectedPriority
  );

  const handleItemToggle = (itemId: string, isSelected: boolean) => {
    dispatch({ type: 'UPDATE_PACKING_ITEM', payload: { itemId, isSelected } });
  };

  const handleAddToCart = (item: PackingItem) => {
    if (!item.product) return;

    const cartItem = {
      id: `${item.product.id}-${Date.now()}`,
      product: item.product,
      quantity: item.quantity,
      addedAt: new Date(),
    };

    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
  };

  const handleRemoveFromCart = (itemId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(itemId);
    } else {
      dispatch({ type: 'UPDATE_CART_ITEM_QUANTITY', payload: { itemId, quantity } });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'essential': return 'text-red-600 bg-red-50';
      case 'recommended': return 'text-yellow-600 bg-yellow-50';
      case 'optional': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'essential': return '🔴';
      case 'recommended': return '🟡';
      case 'optional': return '⚪';
      default: return '⚪';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <h2 className="text-xl font-semibold text-gray-900">Packing List</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCart(!showCart)}
              className="relative"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cart ({state.cart.totalItems})
              {state.cart.totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {state.cart.totalItems}
                </span>
              )}
            </Button>
            {onClose && (
              <Button variant="outline" size="sm" onClick={onClose}>
                Close
              </Button>
            )}
          </div>
        </div>

        {/* Trip Details */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{packingList.tripPlan.destination}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{packingList.tripPlan.duration} days</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="w-4 h-4" />
            <span>{packingList.tripPlan.travelers} travelers</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Thermometer className="w-4 h-4" />
            <span className="capitalize">{packingList.tripPlan.climate}</span>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Packing Progress
            </span>
            <span className="text-sm text-gray-500">
              {packingList.selectedItems} / {packingList.totalItems} items
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(packingList.selectedItems / packingList.totalItems) * 100}%` }}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">Filter by priority:</span>
          <div className="flex gap-2">
            {['all', 'essential', 'recommended', 'optional'].map(priority => (
              <button
                key={priority}
                onClick={() => setSelectedPriority(priority as any)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedPriority === priority
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Packing Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-4">
              <div className="flex items-start gap-3">
                <button
                  onClick={() => handleItemToggle(item.id, !item.isSelected)}
                  className="mt-1"
                >
                  {item.isSelected ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-300" />
                  )}
                </button>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-gray-900">
                      {item.name}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                      {getPriorityIcon(item.priority)} {item.priority}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-2">
                    {item.description}
                  </p>

                  <p className="text-xs text-gray-500 mb-3">
                    {item.reason}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </span>

                    {item.product && (
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAddToCart(item)}
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Add to Cart
                        </Button>
                      </div>
                    )}
                  </div>

                  {item.product && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <ProductCard
                        product={item.product}
                        compact
                        showGallery={item.product.images.length > 1}
                        onView={() => {}}
                        onAdd={() => handleAddToCart(item)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Shopping Cart Sidebar */}
      {showCart && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Shopping Cart</h3>
              <button
                onClick={() => setShowCart(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            {state.cart.items.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {state.cart.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-1">
                        {item.product.title}
                      </h4>
                      <p className="text-xs text-gray-500">
                        ₹{item.product.price.toLocaleString()} each
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="p-1 hover:bg-red-100 text-red-500 rounded"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-semibold text-gray-900">
                      ₹{state.cart.totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <Button className="w-full">
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};
