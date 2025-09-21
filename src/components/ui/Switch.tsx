import React from 'react';
import { motion } from 'framer-motion';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
}

export const Switch: React.FC<SwitchProps> = ({ checked, onChange, id }) => {
  const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30,
  };

  return (
    <div
      className={`flex items-center w-11 h-6 rounded-full p-1 cursor-pointer transition-colors ${
        checked ? 'bg-pink-600 justify-end' : 'bg-gray-300 justify-start'
      }`}
      onClick={() => onChange(!checked)}
      role="switch"
      aria-checked={checked}
      id={id}
    >
      <motion.div
        className="w-4 h-4 bg-white rounded-full shadow-md"
        layout
        transition={spring}
      />
    </div>
  );
};
