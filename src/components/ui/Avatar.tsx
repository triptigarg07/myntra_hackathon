import React from 'react';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  online?: boolean;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  online,
  className = '',
}) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`relative ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`${sizes[size]} rounded-full object-cover border-2 border-white shadow-sm`}
      />
      {online !== undefined && (
        <div
          className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
            online ? 'bg-green-400' : 'bg-gray-400'
          }`}
        />
      )}
    </div>
  );
};
