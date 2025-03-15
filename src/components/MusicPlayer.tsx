
import React, { useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useInvitation } from '@/context/InvitationContext';
import { cn } from '@/lib/utils';

const MusicPlayer = () => {
  const { musicPlaying, setMusicPlaying } = useInvitation();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    if (!audioRef.current) {
      audioRef.current = new Audio();
      // Use one of the SoundHelix sample tracks
      audioRef.current.src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }

    // Play or pause based on state
    if (musicPlaying) {
      const playPromise = audioRef.current.play();
      // Handle the play promise to avoid DOMException
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Auto-play was prevented by the browser: ', error);
          setMusicPlaying(false);
        });
      }
    } else if (audioRef.current) {
      audioRef.current.pause();
    }

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [musicPlaying, setMusicPlaying]);

  const toggleMusic = () => {
    setMusicPlaying(!musicPlaying);
  };

  return (
    <button
      onClick={toggleMusic}
      className={cn(
        "fixed bottom-6 right-6 z-50 p-3 rounded-full transition-all duration-300 shadow-lg shadow-black/20 backdrop-blur-sm",
        musicPlaying 
          ? "bg-floral-blush hover:bg-floral-blush/80" 
          : "bg-floral-softGray hover:bg-floral-softGray/80"
      )}
      aria-label={musicPlaying ? "Mute music" : "Play music"}
    >
      {musicPlaying ? (
        <Volume2 className="w-5 h-5 text-floral-gold animate-pulse-subtle" />
      ) : (
        <VolumeX className="w-5 h-5 text-floral-gold/70" />
      )}
    </button>
  );
};

export default MusicPlayer;
