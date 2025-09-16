import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false 
}) => {
  return (
    <motion.div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}
      whileHover={hover ? { y: -2, shadow: '0 10px 25px rgba(0,0,0,0.1)' } : undefined}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};
