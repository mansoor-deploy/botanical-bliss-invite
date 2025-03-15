
import React from 'react';
import { Heart } from 'lucide-react';
import { useInvitation } from '@/context/InvitationContext';

const Footer = () => {
  const { celebrantName } = useInvitation();
  
  return (
    <footer className="py-8 bg-floral-softGray/30">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-600 mb-4">
          We look forward to celebrating this special day with you
        </p>
        
        <div className="flex justify-center items-center mb-6">
          <div className="h-0.5 w-8 bg-floral-gold/30 rounded-full" />
          <Heart className="text-floral-blush mx-3 animate-pulse-subtle" size={16} />
          <div className="h-0.5 w-8 bg-floral-gold/30 rounded-full" />
        </div>
        
        <p className="text-sm text-gray-500">
          <span className="font-playfair text-floral-gold">{celebrantName}</span>'s Birthday Celebration
        </p>
        
        <p className="text-xs text-gray-400 mt-4">
          Made with love • {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
