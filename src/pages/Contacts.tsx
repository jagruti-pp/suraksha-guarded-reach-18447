import { useState } from "react";
import { Plus, Phone, Mail, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string;
}

const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([
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
  ]);

  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const handleAddContact = () => {
    if (!newContact.name || !newContact.phone) {
      toast.error("Please fill in name and phone number");
      return;
    }

    if (contacts.length >= 5) {
      toast.error("Maximum 5 emergency contacts allowed");
      return;
    }

    const contact: Contact = {
      id: Date.now().toString(),
      ...newContact,
    };

    setContacts([...contacts, contact]);
    setNewContact({ name: "", phone: "", email: "" });
    toast.success("Emergency contact added successfully");
  };

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter((c) => c.id !== id));
    toast.success("Contact removed");
  };

  return (
    <div className="min-h-screen pb-24 pt-8 px-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary">Emergency Contacts</h1>
          <p className="text-muted-foreground">
            {contacts.length}/5 contacts added
          </p>
        </div>

        {/* Add Contact Button */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full h-14 text-lg font-semibold gap-2">
              <Plus className="w-5 h-5" />
              Add Emergency Contact
            </Button>
          </DialogTrigger>
          <DialogContent className="glass">
            <DialogHeader>
              <DialogTitle>Add Emergency Contact</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter name"
                  value={newContact.name}
                  onChange={(e) =>
                    setNewContact({ ...newContact, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={newContact.phone}
                  onChange={(e) =>
                    setNewContact({ ...newContact, phone: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email (Optional)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={newContact.email}
                  onChange={(e) =>
                    setNewContact({ ...newContact, email: e.target.value })
                  }
                />
              </div>
              <Button onClick={handleAddContact} className="w-full">
                Add Contact
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Contacts List */}
        <div className="space-y-3">
          {contacts.length === 0 ? (
            <Card className="glass p-8 text-center">
              <p className="text-muted-foreground">
                No emergency contacts added yet
              </p>
            </Card>
          ) : (
            contacts.map((contact) => (
              <Card key={contact.id} className="glass p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <h3 className="font-semibold text-lg">{contact.name}</h3>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        <span>{contact.phone}</span>
                      </div>
                      {contact.email && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="w-4 h-4" />
                          <span>{contact.email}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteContact(contact.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Info Card */}
        <Card className="glass p-6 space-y-3">
          <h3 className="font-semibold text-primary">How it works</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Add up to 5 trusted emergency contacts</li>
            <li>• They'll receive SMS alerts when you trigger SOS</li>
            <li>• Your live location will be shared with them</li>
            <li>• They'll get real-time updates on your safety</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Contacts;
