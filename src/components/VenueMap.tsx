
import React, { useRef } from 'react';
import { MapPin, Navigation, Clock } from 'lucide-react';
import { useInvitation } from '@/context/InvitationContext';
import { useInViewAnimation } from '@/lib/animations';
import { cn } from '@/lib/utils';

const VenueMap = () => {
  const { eventLocation, eventAddress, eventDate, eventTime } = useInvitation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInViewAnimation(sectionRef, 0.2);
  
  // Format the date nicely
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(eventDate);

  return (
    <section 
      ref={sectionRef} 
      id="venue" 
      className="section-padding relative overflow-hidden"
    >
      <div className="container max-w-5xl mx-auto px-4">
        <h2 className={cn(
          "section-title font-playfair text-floral-gold",
          isInView ? "animate-slide-down" : "opacity-0"
        )}>
          Venue Details
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className={cn(
            "glass-card rounded-lg overflow-hidden shadow-lg",
            isInView ? "animate-slide-up animate-delay-200" : "opacity-0"
          )}>
            {/* Placeholder for an actual map - in a real app you'd integrate Google Maps or similar */}
            <div className="relative h-80 bg-floral-pattern bg-cover bg-center">
              <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                <MapPin className="w-12 h-12 text-floral-blush drop-shadow-md animate-pulse-subtle" />
              </div>
            </div>
          </div>
          
          <div className={cn(
            "space-y-6",
            isInView ? "animate-slide-up animate-delay-300" : "opacity-0"
          )}>
            <div className="glass-card p-6 rounded-lg">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-floral-gold mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-medium mb-2 font-playfair">{eventLocation}</h3>
                  <p className="text-gray-600">{eventAddress}</p>
                  <a 
                    href={`https://maps.google.com/?q=${encodeURIComponent(eventAddress)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-3 text-floral-gold hover:underline"
                  >
                    <Navigation className="w-4 h-4 mr-1" />
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6 rounded-lg">
              <div className="flex items-start space-x-4">
                <Clock className="w-6 h-6 text-floral-gold mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-medium mb-2 font-playfair">When to Arrive</h3>
                  <p className="text-gray-600">{formattedDate}</p>
                  <p className="text-gray-600">Starting at {eventTime}</p>
                  <p className="mt-3 text-sm text-gray-500">
                    We recommend arriving 15 minutes early to be seated comfortably.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-2 font-playfair">Parking Information</h3>
              <p className="text-gray-600">
                Complimentary valet parking is available at the main entrance.
                Additional parking can be found across the street.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VenueMap;
