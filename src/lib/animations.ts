
import { useEffect, useState } from 'react';

// Intersection Observer hook for triggering animations when elements come into view
export const useInViewAnimation = (ref: React.RefObject<HTMLElement>, threshold = 0.1, rootMargin = '0px') => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentRef = ref.current;
    
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, threshold, rootMargin]);

  return isInView;
};

// Function to stagger animations for multiple elements
export const getStaggeredDelay = (index: number, baseDelay = 100) => {
  return `animate-delay-${index * baseDelay}`;
};

// Function to generate random floating animation properties
export const getRandomFloatAnimation = () => {
  const duration = 3 + Math.random() * 4; // Between 3 and 7 seconds
  const delay = Math.random() * 2; // Random delay up to 2 seconds
  
  return {
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
  };
};

// Generate a class for elements that should only animate once when they come into view
export const getInViewAnimationClass = (isInView: boolean, animationClass: string) => {
  return isInView ? animationClass : 'opacity-0';
};
