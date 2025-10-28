import { useState } from "react";
import { Plus, Phone, Mail, Trash2, MessageSquare, Pencil } from "lucide-react";
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
import { useContacts } from "@/hooks/useContacts";

const Contacts = () => {
  const { contacts, addContact, deleteContact, updateContact, notifyContacts } = useContacts();
  
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<string | null>(null);

  const handleAddContact = () => {
    if (!newContact.name || !newContact.phone) {
      toast.error("Please fill in name and phone number");
      return;
    }

    if (editingContact) {
      updateContact(editingContact, newContact);
      toast.success("Contact updated successfully");
    } else {
      if (contacts.length >= 5) {
        toast.error("Maximum 5 emergency contacts allowed");
        return;
      }
      addContact(newContact);
      toast.success("Emergency contact added successfully");
    }
    
    setNewContact({ name: "", phone: "", email: "" });
    setEditingContact(null);
    setDialogOpen(false);
  };

  const handleEditContact = (contact: typeof contacts[0]) => {
    setNewContact({
      name: contact.name,
      phone: contact.phone,
      email: contact.email || "",
    });
    setEditingContact(contact.id);
    setDialogOpen(true);
  };

  const handleDeleteContact = (id: string) => {
    deleteContact(id);
    toast.success("Contact removed");
  };

  const handleTestAlert = () => {
    notifyContacts("🚨 TEST ALERT: This is a test emergency notification from Suraksha Kavach");
    toast.success("Test alerts sent to all contacts");
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
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full h-14 text-lg font-semibold gap-2">
              <Plus className="w-5 h-5" />
              Add Emergency Contact
            </Button>
          </DialogTrigger>
          <DialogContent className="glass">
            <DialogHeader>
              <DialogTitle>{editingContact ? "Edit Contact" : "Add Emergency Contact"}</DialogTitle>
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
                {editingContact ? "Update Contact" : "Add Contact"}
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
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditContact(contact)}
                      className="text-primary hover:text-primary"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteContact(contact.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Test Alert Button */}
        {contacts.length > 0 && (
          <Button 
            onClick={handleTestAlert}
            variant="outline"
            className="w-full h-12 gap-2"
          >
            <MessageSquare className="w-5 h-5" />
            Send Test Alert to All Contacts
          </Button>
        )}

        {/* Info Card */}
        <Card className="glass p-6 space-y-3">
          <h3 className="font-semibold text-primary">How it works</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Add up to 5 trusted emergency contacts with real phone numbers</li>
            <li>• Format: +91 XXXXX XXXXX or any country code</li>
            <li>• When you trigger SOS, your real GPS location is shared</li>
            <li>• On mobile: Opens SMS app with pre-filled message</li>
            <li>• On desktop: Opens WhatsApp Web with location link</li>
            <li>• Google Maps link included for easy navigation</li>
            <li>• Test the feature with "Send Test Alert" button</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Contacts;
