'use client'
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send 
} from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add form submission logic
    console.log('Form submitted', formData);
  };

  const contactInfo = [
    { 
      icon: <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />, 
      title: 'Email', 
      content: 'support@rentitup.com' 
    },
    { 
      icon: <Phone className="h-5 w-5 text-green-600 dark:text-green-400" />, 
      title: 'Phone', 
      content: '(555) 123-4567' 
    },
    { 
      icon: <MapPin className="h-5 w-5 text-red-600 dark:text-red-400" />, 
      title: 'Address', 
      content: '123 Equipment Lane, Tech City, TC 54321' 
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-950 py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">Contact Us</h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Have questions or need support? Reach out to our team, and we'll be happy to help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <Card className="p-8 h-full dark:bg-slate-800 dark:border-slate-700">
              <h3 className="text-xl font-semibold mb-6 dark:text-white">Get In Touch</h3>
              {contactInfo.map((info, index) => (
                <div 
                  key={index} 
                  className="flex items-center mb-4 last:mb-0"
                >
                  <div className="mr-4">{info.icon}</div>
                  <div>
                    <div className="font-medium dark:text-white">{info.title}</div>
                    <div className="text-slate-600 dark:text-slate-300">{info.content}</div>
                  </div>
                </div>
              ))}
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="p-8 dark:bg-slate-800 dark:border-slate-700">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <Input
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="dark:bg-slate-900 dark:border-slate-700 dark:text-white"
                  />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="dark:bg-slate-900 dark:border-slate-700 dark:text-white"
                  />
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="dark:bg-slate-900 dark:border-slate-700 dark:text-white"
                  />
                  <Textarea
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="h-32 dark:bg-slate-900 dark:border-slate-700 dark:text-white"
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-700"
                  >
                    <Send className="mr-2 h-4 w-4" /> Send Message
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}