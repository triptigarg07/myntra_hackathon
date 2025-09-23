import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Send, 
  Smile, 
  Paperclip, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Reply,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { useApp } from '../context/AppContext';
import { ChatMessage } from '../types';

interface FamilyChatProps {
  onShareProduct?: (productId: string) => void;
}

export const FamilyChat: React.FC<FamilyChatProps> = ({ onShareProduct }) => {
  const { state, dispatch } = useApp();
  const [message, setMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [editingMessage, setEditingMessage] = useState<string | null>(null);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [showMessageMenu, setShowMessageMenu] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.chatRoom?.messages]);

  const handleSendMessage = () => {
    if (!message.trim() || !state.user || !state.currentRoom) return;

    const newMessage: ChatMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      roomId: state.currentRoom.id,
      userId: state.user.id,
      user: state.user,
      message: message.trim(),
      type: 'text',
      isSecret: state.isSecretMode,
      createdAt: new Date(),
    };

    dispatch({ type: 'ADD_CHAT_MESSAGE', payload: newMessage });
    setMessage('');
    setReplyTo(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleShareProduct = (productId: string) => {
    if (!state.user || !state.currentRoom) return;

    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    const productMessage: ChatMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      roomId: state.currentRoom.id,
      userId: state.user.id,
      user: state.user,
      message: `Check out this ${product.title}`,
      type: 'product',
      productId: product.id,
      product: product,
      isSecret: state.isSecretMode,
      createdAt: new Date(),
    };

    dispatch({ type: 'ADD_CHAT_MESSAGE', payload: productMessage });
    onShareProduct?.(productId);
  };

  const handleEditMessage = (messageId: string, newText: string) => {
    if (!state.chatRoom) return;

    const updatedMessage = {
      ...state.chatRoom.messages.find(m => m.id === messageId)!,
      message: newText,
      editedAt: new Date(),
    };

    dispatch({ type: 'UPDATE_CHAT_MESSAGE', payload: updatedMessage });
    setEditingMessage(null);
  };

  const handleDeleteMessage = (messageId: string) => {
    dispatch({ type: 'DELETE_CHAT_MESSAGE', payload: messageId });
    setShowMessageMenu(null);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const messageDate = new Date(date);
    
    if (messageDate.toDateString() === today.toDateString()) {
      return 'Today';
    }
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    
    return messageDate.toLocaleDateString();
  };

  const groupMessagesByDate = (messages: ChatMessage[]) => {
    const groups: { [key: string]: ChatMessage[] } = {};
    
    messages.forEach(message => {
      const dateKey = formatDate(message.createdAt);
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(message);
    });
    
    return groups;
  };

  const messageGroups = state.chatRoom ? groupMessagesByDate(state.chatRoom.messages) : {};

  return (
    <Card className="p-0 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-pink-500" />
          <h3 className="text-lg font-semibold text-gray-900">Family Chat</h3>
          <span className="text-sm text-gray-500">
            {state.roomMembers.filter(m => m.isOnline).length} online
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </Button>
      </div>

      {!isExpanded && (
        <div className="p-4">
          <p className="text-sm text-gray-600">
            Chat with your family members and share product recommendations
          </p>
        </div>
      )}

      {isExpanded && (
        <div className="flex flex-col h-96">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {Object.keys(messageGroups).length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>No messages yet. Start the conversation!</p>
              </div>
            ) : (
              Object.entries(messageGroups).map(([date, messages]) => (
                <div key={date}>
                  <div className="text-center text-xs text-gray-500 mb-4 bg-gray-100 rounded-full px-3 py-1 inline-block">
                    {date}
                  </div>
                  {messages.map((msg, index) => {
                    const isOwn = msg.userId === state.user?.id;
                    const showAvatar = index === 0 || messages[index - 1].userId !== msg.userId;
                    const showTime = index === messages.length - 1 || 
                      new Date(messages[index + 1].createdAt).getTime() - new Date(msg.createdAt).getTime() > 300000; // 5 minutes

                    return (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-2 ${isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        {!isOwn && showAvatar && (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center text-white text-sm font-medium">
                            {msg.user.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        {!isOwn && !showAvatar && <div className="w-8" />}
                        
                        <div className={`max-w-xs lg:max-w-md ${isOwn ? 'order-1' : 'order-2'}`}>
                          {!isOwn && showAvatar && (
                            <div className="text-xs text-gray-500 mb-1 ml-1">
                              {msg.user.name}
                            </div>
                          )}
                          
                          <div className="relative group">
                            {msg.type === 'product' && msg.product ? (
                              <div className={`rounded-lg p-3 ${
                                isOwn 
                                  ? 'bg-pink-500 text-white' 
                                  : 'bg-gray-100 text-gray-900'
                              }`}>
                                <div className="flex items-start gap-3">
                                  <img 
                                    src={msg.product.images[0]} 
                                    alt={msg.product.title}
                                    className="w-12 h-12 rounded object-cover"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm truncate">
                                      {msg.product.title}
                                    </p>
                                    <p className="text-xs opacity-75">
                                      ₹{msg.product.price}
                                    </p>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="mt-2 text-xs h-6"
                                      onClick={() => window.open(`https://myntra.com/${msg.product.sku}`, '_blank')}
                                    >
                                      <ExternalLink className="w-3 h-3 mr-1" />
                                      View on Myntra
                                    </Button>
                                  </div>
                                </div>
                                <p className="text-xs mt-2 opacity-75">
                                  {msg.message}
                                </p>
                              </div>
                            ) : (
                              <div className={`rounded-lg px-3 py-2 ${
                                isOwn 
                                  ? 'bg-pink-500 text-white' 
                                  : 'bg-gray-100 text-gray-900'
                              }`}>
                                <p className="text-sm">{msg.message}</p>
                                {msg.editedAt && (
                                  <p className="text-xs opacity-75 mt-1">(edited)</p>
                                )}
                              </div>
                            )}
                            
                            {showTime && (
                              <p className={`text-xs text-gray-500 mt-1 ${
                                isOwn ? 'text-right' : 'text-left'
                              }`}>
                                {formatTime(msg.createdAt)}
                              </p>
                            )}

                            {/* Message Actions */}
                            {isOwn && (
                              <div className="absolute -right-2 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="w-8 h-8 p-0"
                                  onClick={() => setShowMessageMenu(showMessageMenu === msg.id ? null : msg.id)}
                                >
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                                
                                {showMessageMenu === msg.id && (
                                  <div className="absolute right-0 top-8 bg-white border rounded-lg shadow-lg z-10 min-w-32">
                                    <button
                                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                                      onClick={() => {
                                        setEditingMessage(msg.id);
                                        setShowMessageMenu(null);
                                      }}
                                    >
                                      <Edit2 className="w-3 h-3" />
                                      Edit
                                    </button>
                                    <button
                                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600"
                                      onClick={() => handleDeleteMessage(msg.id)}
                                    >
                                      <Trash2 className="w-3 h-3" />
                                      Delete
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Typing Indicator */}
          {Object.keys(state.isTyping).length > 0 && (
            <div className="px-4 py-2 text-sm text-gray-500 italic">
              {Object.keys(state.isTyping).map(userId => {
                const member = state.roomMembers.find(m => m.userId === userId);
                return member ? member.user.name : 'Someone';
              }).join(', ')} typing...
            </div>
          )}

          {/* Input */}
          <div className="border-t p-4">
            {replyTo && (
              <div className="mb-2 p-2 bg-gray-50 rounded-lg text-sm text-gray-600">
                Replying to: {state.chatRoom?.messages.find(m => m.id === replyTo)?.message}
                <Button
                  size="sm"
                  variant="ghost"
                  className="ml-2 h-6 px-2"
                  onClick={() => setReplyTo(null)}
                >
                  ×
                </Button>
              </div>
            )}
            
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute right-1 top-1 w-8 h-8 p-0"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  <Smile className="w-4 h-4" />
                </Button>
              </div>
              
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="bg-pink-500 hover:bg-pink-600 text-white"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
