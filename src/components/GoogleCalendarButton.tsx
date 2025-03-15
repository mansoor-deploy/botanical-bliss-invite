
import React from 'react';
import { Calendar } from 'lucide-react';
import { useInvitation } from '@/context/InvitationContext';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

const GoogleCalendarButton = () => {
  const { celebrantName, celebrantAge, eventDate, eventTime, eventLocation, eventAddress } = useInvitation();
  
  const formatGoogleCalendarDate = (date: Date, timeStr: string) => {
    // Parse the time string (assuming format like "7:00 PM")
    const [timePart, ampm] = timeStr.split(' ');
    const [hours, minutes] = timePart.split(':').map(Number);
    
    // Adjust hours for PM
    const adjustedHours = ampm === 'PM' && hours < 12 ? hours + 12 : hours;
    
    // Create a new date object with the time
    const dateWithTime = new Date(date);
    dateWithTime.setHours(adjustedHours, minutes, 0);
    
    // Format date for Google Calendar URL (YYYYMMDDTHHmmss/YYYYMMDDTHHmmss)
    return dateWithTime.toISOString().replace(/-|:|\.\d+/g, '');
  };
  
  const createGoogleCalendarUrl = () => {
    // Format start time
    const startDateTime = formatGoogleCalendarDate(eventDate, eventTime);
    
    // Assume the event lasts 3 hours
    const endDate = new Date(eventDate);
    endDate.setHours(endDate.getHours() + 3);
    const endDateTime = formatGoogleCalendarDate(endDate, eventTime);
    
    // Create the event title and description
    const eventTitle = `${celebrantName}'s ${celebrantAge}th Birthday Celebration`;
    const eventDescription = `Join us to celebrate ${celebrantName}'s ${celebrantAge}th birthday! Bring your best wishes and festive spirit!`;
    
    // Construct the URL
    const url = new URL('https://calendar.google.com/calendar/render');
    url.searchParams.append('action', 'TEMPLATE');
    url.searchParams.append('text', eventTitle);
    url.searchParams.append('dates', `${startDateTime}/${endDateTime}`);
    url.searchParams.append('details', eventDescription);
    url.searchParams.append('location', `${eventLocation}, ${eventAddress}`);
    
    return url.toString();
  };
  
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <a
          href={createGoogleCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="floral-button inline-flex items-center"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Add to Calendar
        </a>
      </HoverCardTrigger>
      <HoverCardContent className="glass-card shadow-lg">
        <div className="text-sm">
          <p className="font-medium mb-1">Add this event to your Google Calendar</p>
          <p className="text-gray-600">Never miss the celebration! Click to save the date.</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default GoogleCalendarButton;
