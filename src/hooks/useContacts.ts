import { useState, useEffect } from 'react';

export interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string;
}

const STORAGE_KEY = 'suraksha_emergency_contacts';

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [
      {
        id: "1",
        name: "Mom",
        phone: "+91 98765 43210",
        email: "mom@example.com",
      },
      {
        id: "2",
        name: "Dad",
        phone: "+91 98765 43211",
      },
      {
        id: "3",
        name: "Best Friend",
        phone: "+91 98765 43212",
        email: "friend@example.com",
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (contact: Omit<Contact, 'id'>) => {
    const newContact: Contact = {
      id: Date.now().toString(),
      ...contact,
    };
    setContacts([...contacts, newContact]);
    return newContact;
  };

  const deleteContact = (id: string) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  const updateContact = (id: string, updates: Partial<Contact>) => {
    setContacts(contacts.map(c => 
      c.id === id ? { ...c, ...updates } : c
    ));
  };

  const notifyContacts = (message: string, location?: { latitude: number; longitude: number }) => {
    const mapsUrl = location 
      ? `https://maps.google.com/?q=${location.latitude},${location.longitude}`
      : '';
    
    contacts.forEach((contact, index) => {
      const fullMessage = `${message}${mapsUrl ? `\n\nLocation: ${mapsUrl}` : ''}`;
      
      // Clean phone number (remove spaces, hyphens, etc.)
      const cleanPhone = contact.phone.replace(/[^0-9+]/g, '');
      
      // Create SMS and WhatsApp URLs
      const smsUrl = `sms:${cleanPhone}?body=${encodeURIComponent(fullMessage)}`;
      const whatsappUrl = `https://wa.me/${cleanPhone.replace(/\+/g, '')}?text=${encodeURIComponent(fullMessage)}`;
      
      // Open with slight delay to avoid popup blocking
      setTimeout(() => {
        // Try SMS first (works better on mobile)
        if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
          window.open(smsUrl, '_blank');
        } else {
          // On desktop, offer WhatsApp Web
          window.open(whatsappUrl, '_blank');
        }
      }, index * 300); // Stagger by 300ms to avoid popup blockers
    });
  };

  return {
    contacts,
    addContact,
    deleteContact,
    updateContact,
    notifyContacts,
  };
};
