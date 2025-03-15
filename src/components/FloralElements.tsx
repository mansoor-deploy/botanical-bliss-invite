
import React from 'react';
import { Flower, Flower2, Leaf } from 'lucide-react';
import { getRandomFloatAnimation } from '@/lib/animations';

// Floating floral decorations to add throughout the site
const FloralElements = () => {
  const floralElements = Array.from({ length: 12 }, (_, i) => i);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {floralElements.map((_, index) => {
        const style = getRandomFloatAnimation();
        const size = 16 + Math.random() * 24; // Random size between 16px and 40px
        const left = `${Math.random() * 100}%`;
        const top = `${Math.random() * 100}%`;
        const opacity = 0.1 + Math.random() * 0.2; // Random opacity between 0.1 and 0.3
        
        // Choose a random floral element
        const elementType = Math.floor(Math.random() * 3);
        
        return (
          <div
            key={index}
            className="absolute animate-float"
            style={{
              left,
              top,
              opacity,
              ...style,
              width: `${size}px`,
              height: `${size}px`,
            }}
          >
            {elementType === 0 ? (
              <Flower
                className="text-floral-blush"
                width={size}
                height={size}
              />
            ) : elementType === 1 ? (
              <Flower2
                className="text-floral-mint"
                width={size}
                height={size}
              />
            ) : (
              <Leaf
                className="text-floral-beige"
                width={size}
                height={size}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FloralElements;
