
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);
  
  const navLinks = [
    { href: '#', label: 'Home' },
    { href: '#details', label: 'Details' },
    { href: '#venue', label: 'Venue' },
    { href: '#rsvp', label: 'RSVP' },
  ];
  
  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled 
        ? "py-2 bg-white/80 backdrop-blur-md shadow-sm" 
        : "py-4 bg-transparent"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center md:justify-between">
          <a href="#" className="text-floral-gold font-playfair text-xl font-medium hidden md:block">
            Birthday Celebration
          </a>
          
          <ul className="flex space-x-1 md:space-x-2">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="px-3 py-2 text-sm rounded-md transition-all duration-200 text-gray-600 hover:text-floral-gold hover:bg-floral-softGray/50"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
