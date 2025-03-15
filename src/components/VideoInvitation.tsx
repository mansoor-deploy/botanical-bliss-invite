
import React, { useState, useRef, useEffect } from 'react';
import { Video, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useInvitation } from '@/context/InvitationContext';

const VideoInvitation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [wasOpened, setWasOpened] = useState(false);
  const { musicPlaying, setMusicPlaying } = useInvitation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevMusicState = useRef(musicPlaying);

  // Show the bubble when user scrolls to the bottom
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      
      // Show when near bottom (90% of the page)
      if (scrollPosition > pageHeight * 0.9) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Check initial position
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle video playing and music interaction
  const handleSheetOpenChange = (open: boolean) => {
    if (open) {
      // User opened the sheet
      setWasOpened(true);
      
      // Store current music state and pause music
      prevMusicState.current = musicPlaying;
      if (musicPlaying) {
        setMusicPlaying(false);
      }
      
      // Play video with a small delay to allow sheet animation
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch(e => console.error('Error playing video:', e));
        }
      }, 500);
    } else {
      // User closed the sheet
      // Pause video
      if (videoRef.current) {
        videoRef.current.pause();
      }
      
      // Restore music state if it was playing before
      if (prevMusicState.current) {
        setMusicPlaying(true);
      }
    }
  };

  if (!isVisible && !wasOpened) return null;

  return (
    <Sheet onOpenChange={handleSheetOpenChange}>
      <SheetTrigger asChild>
        <button
          className={cn(
            "fixed bottom-6 left-6 z-50 p-3 rounded-full transition-all duration-300 shadow-lg shadow-black/20 backdrop-blur-sm",
            wasOpened ? "bg-floral-blush/60 hover:bg-floral-blush" : "bg-floral-blush animate-pulse-subtle",
            !wasOpened && "animate-float"
          )}
          aria-label="Open video invitation"
        >
          <Video className="w-6 h-6 text-floral-gold" />
        </button>
      </SheetTrigger>
      <SheetContent side="bottom" className="glass-card p-0 rounded-t-xl max-h-[80vh] border-0">
        <div className="relative w-full h-full overflow-hidden rounded-t-xl">
          <video 
            ref={videoRef}
            className="w-full max-h-[80vh] object-contain bg-black/95"
            controls
            poster="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&q=80&w=1000"
          >
            {/* Replace this with your actual video URL */}
            <source src="https://samplelib.com/lib/preview/mp4/sample-5s.mp4" type="video/mp4" />
            Your browser does not support video playback.
          </video>
          <div className="absolute top-2 right-2">
            <button 
              className="bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
              onClick={() => document.querySelector<HTMLButtonElement>('.close-sheet')?.click()}
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default VideoInvitation;
