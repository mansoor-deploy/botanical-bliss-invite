
import React, { useEffect } from 'react';
import { InvitationProvider } from '@/context/InvitationContext';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import EventDetails from '@/components/EventDetails';
import VenueMap from '@/components/VenueMap';
import RsvpForm from '@/components/RsvpForm';
import MusicPlayer from '@/components/MusicPlayer';
import FloralElements from '@/components/FloralElements';
import Footer from '@/components/Footer';

const Index = () => {
  // Add a class to body when JavaScript is loaded
  useEffect(() => {
    document.body.classList.add('js-loaded');
    document.body.classList.add('bg-texture');
    
    return () => {
      document.body.classList.remove('js-loaded');
      document.body.classList.remove('bg-texture');
    };
  }, []);
  
  return (
    <InvitationProvider>
      <div className="min-h-screen">
        <Navbar />
        <FloralElements />
        <main>
          <HeroSection />
          <EventDetails />
          <VenueMap />
          <RsvpForm />
        </main>
        <Footer />
        <MusicPlayer />
      </div>
    </InvitationProvider>
  );
};

export default Index;
