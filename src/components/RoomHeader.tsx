import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Copy, EyeOff, Eye, Settings, Crown, ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { Avatar } from './ui/Avatar';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { useApp } from '../context/AppContext';

export const RoomHeader: React.FC = () => {
  const { state, dispatch } = useApp();
  const [showCart, setShowCart] = useState(false);
  
  if (!state.currentRoom) return null;

  const handleCopyInvite = () => {
    navigator.clipboard.writeText(state.currentRoom?.inviteCode || '');
    // Show toast notification
  };

  const toggleSecretMode = () => {
    dispatch({ type: 'TOGGLE_SECRET_MODE' });
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

  return (
    <Card className="p-4 mb-6 relative">
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
          {/* Cart Button */}
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

      {/* Cart Dropdown */}
      {showCart && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute right-0 top-full mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto"
        >
          <div className="p-4">
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
    </Card>
  );
};
