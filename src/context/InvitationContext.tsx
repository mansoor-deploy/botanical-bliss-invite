
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Guest = {
  name: string;
  email: string;
  attending: boolean;
  guests: number;
  message?: string;
};

type InvitationContextType = {
  celebrantName: string;
  setCelebrantName: (name: string) => void;
  celebrantAge: number;
  setCelebrantAge: (age: number) => void;
  eventDate: Date;
  setEventDate: (date: Date) => void;
  eventTime: string;
  setEventTime: (time: string) => void;
  eventLocation: string;
  setEventLocation: (location: string) => void;
  eventAddress: string;
  setEventAddress: (address: string) => void;
  guests: Guest[];
  addGuest: (guest: Guest) => void;
  updateGuest: (email: string, guest: Partial<Guest>) => void;
  removeGuest: (email: string) => void;
  musicPlaying: boolean;
  setMusicPlaying: (playing: boolean) => void;
};

const defaultContext: InvitationContextType = {
  celebrantName: 'Emily Rose',
  setCelebrantName: () => {},
  celebrantAge: 30,
  setCelebrantAge: () => {},
  eventDate: new Date(new Date().setDate(new Date().getDate() + 30)),
  setEventDate: () => {},
  eventTime: '7:00 PM',
  setEventTime: () => {},
  eventLocation: 'The Botanical Gardens',
  setEventLocation: () => {},
  eventAddress: '123 Floral Avenue, Blossom City',
  setEventAddress: () => {},
  guests: [],
  addGuest: () => {},
  updateGuest: () => {},
  removeGuest: () => {},
  musicPlaying: false,
  setMusicPlaying: () => {},
};

const InvitationContext = createContext<InvitationContextType>(defaultContext);

export const useInvitation = () => useContext(InvitationContext);

export const InvitationProvider = ({ children }: { children: ReactNode }) => {
  const [celebrantName, setCelebrantName] = useState(defaultContext.celebrantName);
  const [celebrantAge, setCelebrantAge] = useState(defaultContext.celebrantAge);
  const [eventDate, setEventDate] = useState(defaultContext.eventDate);
  const [eventTime, setEventTime] = useState(defaultContext.eventTime);
  const [eventLocation, setEventLocation] = useState(defaultContext.eventLocation);
  const [eventAddress, setEventAddress] = useState(defaultContext.eventAddress);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [musicPlaying, setMusicPlaying] = useState(false);

  const addGuest = (guest: Guest) => {
    if (!guests.some(g => g.email === guest.email)) {
      setGuests([...guests, guest]);
    }
  };

  const updateGuest = (email: string, updatedGuest: Partial<Guest>) => {
    setGuests(
      guests.map(guest => 
        guest.email === email ? { ...guest, ...updatedGuest } : guest
      )
    );
  };

  const removeGuest = (email: string) => {
    setGuests(guests.filter(guest => guest.email !== email));
  };

  return (
    <InvitationContext.Provider
      value={{
        celebrantName,
        setCelebrantName,
        celebrantAge,
        setCelebrantAge,
        eventDate,
        setEventDate,
        eventTime,
        setEventTime,
        eventLocation,
        setEventLocation,
        eventAddress,
        setEventAddress,
        guests,
        addGuest,
        updateGuest,
        removeGuest,
        musicPlaying,
        setMusicPlaying,
      }}
    >
      {children}
    </InvitationContext.Provider>
  );
};
