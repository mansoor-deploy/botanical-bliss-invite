
import React, { useState, useRef } from 'react';
import { useInvitation } from '@/context/InvitationContext';
import { Send, Check, X } from 'lucide-react';
import { useInViewAnimation } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { useToast } from "@/components/ui/use-toast";

const RsvpForm = () => {
  const { addGuest } = useInvitation();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [attending, setAttending] = useState<boolean | null>(null);
  const [guestCount, setGuestCount] = useState(0);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInViewAnimation(sectionRef, 0.2);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || attending === null) {
      toast({
        title: "Please complete all required fields",
        description: "We need your name, email, and attendance status.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      addGuest({
        name,
        email,
        attending: Boolean(attending),
        guests: guestCount,
        message,
      });
      
      toast({
        title: "RSVP Received!",
        description: `Thank you, ${name}! We've recorded your response.`,
        variant: "default",
      });
      
      // Reset form
      setName('');
      setEmail('');
      setAttending(null);
      setGuestCount(0);
      setMessage('');
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <section 
      ref={sectionRef} 
      id="rsvp" 
      className="section-padding relative overflow-hidden bg-floral-softGray/30"
    >
      <div className="container max-w-3xl mx-auto px-4">
        <h2 className={cn(
          "section-title font-playfair text-floral-gold",
          isInView ? "animate-slide-down" : "opacity-0"
        )}>
          RSVP
        </h2>
        
        <p className={cn(
          "text-center text-gray-600 mb-8 max-w-xl mx-auto",
          isInView ? "animate-slide-up animate-delay-100" : "opacity-0"
        )}>
          Please let us know if you'll be joining us to celebrate! We kindly request your response by [RSVP deadline].
        </p>
        
        <div className={cn(
          "glass-card rounded-lg p-8 shadow-lg",
          isInView ? "animate-slide-up animate-delay-200" : "opacity-0"
        )}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name *
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-floral-beige/50 rounded-md focus:ring-2 focus:ring-floral-gold/30 focus:border-floral-gold/50 focus:outline-none transition-all duration-200"
                  placeholder="Jane Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-floral-beige/50 rounded-md focus:ring-2 focus:ring-floral-gold/30 focus:border-floral-gold/50 focus:outline-none transition-all duration-200"
                  placeholder="jane@example.com"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Will you be attending? *
              </label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setAttending(true)}
                  className={cn(
                    "flex-1 px-4 py-3 rounded-md transition-all duration-200 flex items-center justify-center",
                    attending === true 
                      ? "bg-floral-mint text-gray-800 border-2 border-floral-gold/30" 
                      : "bg-floral-softGray/50 text-gray-600 border border-floral-beige/30 hover:bg-floral-softGray"
                  )}
                >
                  <Check className={cn(
                    "w-5 h-5 mr-2",
                    attending === true ? "text-floral-gold" : "text-gray-400"
                  )} />
                  Joyfully Accept
                </button>
                
                <button
                  type="button"
                  onClick={() => setAttending(false)}
                  className={cn(
                    "flex-1 px-4 py-3 rounded-md transition-all duration-200 flex items-center justify-center",
                    attending === false 
                      ? "bg-floral-blush text-gray-800 border-2 border-floral-gold/30" 
                      : "bg-floral-softGray/50 text-gray-600 border border-floral-beige/30 hover:bg-floral-softGray"
                  )}
                >
                  <X className={cn(
                    "w-5 h-5 mr-2",
                    attending === false ? "text-floral-gold" : "text-gray-400"
                  )} />
                  Regretfully Decline
                </button>
              </div>
            </div>
            
            {attending === true && (
              <div>
                <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Additional Guests
                </label>
                <select
                  id="guests"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-floral-beige/50 rounded-md focus:ring-2 focus:ring-floral-gold/30 focus:border-floral-gold/50 focus:outline-none transition-all duration-200"
                >
                  <option value="0">Just me</option>
                  <option value="1">+1 guest</option>
                  <option value="2">+2 guests</option>
                  <option value="3">+3 guests</option>
                </select>
              </div>
            )}
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message or Dietary Restrictions (Optional)
              </label>
              <textarea
                id="message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2 border border-floral-beige/50 rounded-md focus:ring-2 focus:ring-floral-gold/30 focus:border-floral-gold/50 focus:outline-none transition-all duration-200 resize-none"
                placeholder="Share a message or any dietary restrictions..."
              />
            </div>
            
            <div className="flex justify-center pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "floral-button flex items-center",
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                )}
              >
                <Send className="w-4 h-4 mr-2" />
                {isSubmitting ? "Sending..." : "Send RSVP"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RsvpForm;
