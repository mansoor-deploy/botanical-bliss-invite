
import React, { useRef } from 'react';
import { useInvitation } from '@/context/InvitationContext';
import { Calendar, Clock, Gift, Music, Utensils } from 'lucide-react';
import { useInViewAnimation } from '@/lib/animations';
import { cn } from '@/lib/utils';

const EventDetails = () => {
  const { celebrantName, celebrantAge, eventDate, eventTime } = useInvitation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInViewAnimation(sectionRef, 0.2);
  
  // Format the date in a readable format
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(eventDate);
  
  const eventDetails = [
    {
      icon: <Calendar className="w-6 h-6 text-floral-gold" />,
      title: "Date",
      details: formattedDate,
    },
    {
      icon: <Clock className="w-6 h-6 text-floral-gold" />,
      title: "Time",
      details: eventTime,
    },
    {
      icon: <Utensils className="w-6 h-6 text-floral-gold" />,
      title: "Food & Drink",
      details: "Full dinner and cocktails will be served",
    },
    {
      icon: <Music className="w-6 h-6 text-floral-gold" />,
      title: "Entertainment",
      details: "Live music and dancing",
    },
    {
      icon: <Gift className="w-6 h-6 text-floral-gold" />,
      title: "Gifts",
      details: "Your presence is gift enough, but if you wish to bring something, gift registry details are below",
    },
  ];
  
  return (
    <section 
      ref={sectionRef} 
      id="details" 
      className="section-padding relative overflow-hidden"
    >
      <div className="container max-w-5xl mx-auto px-4">
        <h2 className={cn(
          "section-title font-playfair text-floral-gold",
          isInView ? "animate-slide-down" : "opacity-0"
        )}>
          Celebration Details
        </h2>
        
        <p className={cn(
          "text-center text-gray-600 mb-12 max-w-xl mx-auto",
          isInView ? "animate-slide-up animate-delay-100" : "opacity-0"
        )}>
          Join us for an elegant evening celebrating {celebrantName}'s {celebrantAge}th birthday with
          fine dining, music, and wonderful company.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventDetails.map((detail, index) => (
            <div 
              key={index}
              className={cn(
                "glass-card p-6 rounded-lg text-center transition-all hover:shadow-md",
                isInView ? `animate-slide-up animate-delay-${(index + 2) * 100}` : "opacity-0"
              )}
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-floral-softGray/70 rounded-full">
                  {detail.icon}
                </div>
              </div>
              <h3 className="text-xl font-medium mb-2 font-playfair">{detail.title}</h3>
              <p className="text-gray-600">{detail.details}</p>
            </div>
          ))}
        </div>
        
        <div className={cn(
          "mt-12 text-center",
          isInView ? "animate-slide-up animate-delay-500" : "opacity-0"
        )}>
          <h3 className="text-xl font-medium mb-4 font-playfair">Dress Code</h3>
          <p className="text-gray-600 max-w-xl mx-auto">
            Garden party elegant. We recommend cocktail attire in spring/floral colors.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
