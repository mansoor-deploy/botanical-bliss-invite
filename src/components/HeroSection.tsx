
import React, { useRef } from 'react';
import { useInvitation } from '@/context/InvitationContext';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const HeroSection = () => {
  const { celebrantName, celebrantAge, eventDate } = useInvitation();

  // Format the date for display
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(eventDate);
  
  return (
    <section className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-floral-pattern bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white/80" />
      
      {/* Main content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center invitation-border rounded-lg p-8 glass-card">
        <div className="animate-slide-down">
          <span className="inline-block px-4 py-1 mb-6 rounded-full bg-floral-mint/70 text-floral-gold backdrop-blur-sm text-sm font-medium">
            You're Invited
          </span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-playfair mb-4 text-floral-gold animate-slide-up animate-delay-100">
          {celebrantName}
        </h1>
        
        <div className="flex items-center justify-center mb-6 animate-slide-up animate-delay-200">
          <div className="h-0.5 w-8 bg-floral-gold/30 rounded-full" />
          <Sparkles className="text-floral-gold mx-3 animate-pulse-subtle" />
          <div className="h-0.5 w-8 bg-floral-gold/30 rounded-full" />
        </div>
        
        <h2 className="text-2xl md:text-3xl font-playfair mb-6 animate-slide-up animate-delay-300">
          <span className="text-gray-600">is turning</span> <span className="text-floral-gold font-semibold">{celebrantAge}</span>
        </h2>
        
        <p className="text-xl text-gray-600 mb-8 animate-slide-up animate-delay-400">
          Please join us for an evening of celebration
        </p>
        
        <div className="mb-8 p-4 bg-floral-softGray/40 rounded-lg animate-slide-up animate-delay-500">
          <p className="text-lg text-gray-700">{formattedDate}</p>
        </div>
        
        <div className="flex justify-center space-x-4 animate-slide-up animate-delay-600">
          <a 
            href="#details" 
            className="floral-button"
          >
            See Details
          </a>
          <a 
            href="#rsvp" 
            className="px-8 py-3 bg-floral-mint/80 hover:bg-floral-mint transition-all duration-300 text-floral-gold font-medium rounded-md shadow-sm hover:shadow backdrop-blur-sm"
          >
            RSVP
          </a>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-24 h-24 text-floral-blush/30 rotate-12 animate-float">
        <Sparkles className="w-full h-full" />
      </div>
      <div className="absolute bottom-20 right-10 w-16 h-16 text-floral-mint/30 -rotate-12 animate-float animate-delay-500">
        <Sparkles className="w-full h-full" />
      </div>
    </section>
  );
};

export default HeroSection;
