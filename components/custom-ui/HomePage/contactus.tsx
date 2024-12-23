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
  Send,
  MessageCircle,
  Clock,
  CheckCircle 
} from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted', formData);
  };

  const contactCards = [
    {
      icon: <MessageCircle className="h-5 w-5" />,
      title: "Chat with us",
      description: "Live chat support available",
      action: "Start chat",
      timing: "Available 24/7"
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email us",
      description: "support@rentitup.com",
      action: "Send email",
      timing: "Response within 24h"
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Call us",
      description: "(555) 123-4567",
      action: "Call now",
      timing: "Mon-Fri, 9am-6pm"
    }
  ];

  return (
    <section className="relative bg-slate-50 dark:bg-slate-900 py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#fff5eb,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#fef3c7,transparent_70%)]" />

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="inline-block text-orange-500 font-medium text-sm mb-4">
            Contact Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Get in Touch
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Have questions about our platform? We're here to help.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {contactCards.map((card, index) => (
            <Card 
              key={index}
              className="p-6 bg-white dark:bg-slate-800 border-slate-200 
                dark:border-slate-700 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col h-full">
                <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 
                  flex items-center justify-center text-orange-500 mb-4">
                  {card.icon}
                </div>
                
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  {card.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  {card.description}
                </p>
                
                <div className="mt-auto">
                  <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-3">
                    <Clock className="h-4 w-4 mr-2" />
                    {card.timing}
                  </div>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-center hover:bg-orange-50 hover:text-orange-500 
                      dark:hover:bg-orange-900/30 dark:hover:text-orange-400"
                  >
                    {card.action}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Contact Form Card */}
        <Card className="max-w-3xl mx-auto bg-white dark:bg-slate-800 border-slate-200 
          dark:border-slate-700 overflow-hidden">
          <div className="grid md:grid-cols-5">
            {/* Form Side */}
            <div className="p-8 md:col-span-3">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-6">
                Send us a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="dark:bg-slate-900 dark:border-slate-700"
                  />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="dark:bg-slate-900 dark:border-slate-700"
                  />
                </div>
                <Input
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="dark:bg-slate-900 dark:border-slate-700"
                />
                <Textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="h-32 dark:bg-slate-900 dark:border-slate-700"
                />
                <Button 
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600"
                >
                  Send Message
                </Button>
              </form>
            </div>

            {/* Information Side */}
            <div className="bg-orange-500 p-8 text-white md:col-span-2">
              <h4 className="font-semibold text-lg mb-6">
                What happens next?
              </h4>
              <div className="space-y-6">
                {[
                  {
                    title: "We'll review your message",
                    description: "Our support team will carefully review your inquiry"
                  },
                  {
                    title: "We'll get back to you",
                    description: "We aim to respond within 24 hours during business days"
                  },
                  {
                    title: "Resolution & Follow-up",
                    description: "We'll work with you to resolve your inquiry completely"
                  }
                ].map((step, index) => (
                  <div key={index} className="flex gap-3">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 mt-1" />
                    <div>
                      <h5 className="font-medium mb-1">{step.title}</h5>
                      <p className="text-orange-100 text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}