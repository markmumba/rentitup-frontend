'use client'
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronUp,
  Truck,
  Shield,
  CreditCard,
  HelpCircle,
  Clock,
  FileText,
  Mail,
  Search
} from 'lucide-react';

import { useState } from 'react';

type FAQ = { id: string; question: string; answer: string };

type FAQCategories = 'general' | 'rental' | 'payment' | 'delivery' | 'safety';

const faqs: Record<FAQCategories, FAQ[]> = {
  general: [
    {
      id: 'g1',
      question: "What is RentItUp?",
      answer: "RentItUp is a digital platform connecting equipment owners with those who need to rent machinery. We facilitate safe, secure, and efficient equipment rentals for both personal and professional use."
    },
    {
      id: 'g2',
      question: "Who can rent equipment on RentItUp?",
      answer: "Anyone 18 or older can rent equipment through our platform. Some machinery may require specific licenses or certifications, which will be clearly indicated in the listing."
    },
    {
      id: 'g3',
      question: "Is my information secure?",
      answer: "Yes, we use bank-level encryption to protect your personal and payment information. Our platform is regularly audited for security compliance."
    }
  ],
  rental: [
    {
      id: 'r1',
      question: "How do I rent equipment?",
      answer: "Simply browse our listings, select your desired equipment, choose rental dates, and submit a booking request. Once the owner approves, you can complete the payment and arrange pickup or delivery."
    },
    {
      id: 'r2',
      question: "What if I need to extend my rental period?",
      answer: "You can request a rental extension through the platform. The owner will need to approve the extension, and additional charges will apply based on the extended period."
    },
    {
      id: 'r3',
      question: "Can I cancel my reservation?",
      answer: "Yes, cancellations are possible. Our cancellation policy varies depending on how far in advance you cancel and the specific equipment type. Check each listing for detailed cancellation terms."
    }
  ],
  payment: [
    {
      id: 'p1',
      question: "What payment methods are accepted?",
      answer: "We accept all major credit cards, debit cards, and digital wallets including PayPal. Bank transfers are available for long-term rentals."
    },
    {
      id: 'p2',
      question: "Is there a security deposit?",
      answer: "Security deposits vary by equipment type and value. The deposit amount will be clearly shown before booking and is fully refundable if the equipment is returned as agreed."
    }
  ],
  delivery: [
    {
      id: 'd1',
      question: "Is delivery available?",
      answer: "Yes, many equipment owners offer delivery services. Delivery fees and availability vary by location and equipment size. You can see delivery options on each listing."
    },
    {
      id: 'd2',
      question: "How is delivery arranged?",
      answer: "Once your booking is confirmed, you can coordinate delivery details directly with the owner through our messaging system. All delivery terms should be agreed upon before the rental period begins."
    }
  ],
  safety: [
    {
      id: 's1',
      question: "What insurance coverage is provided?",
      answer: "RentItUp provides basic insurance coverage for all rentals. Additional coverage options are available and may be required for certain high-value equipment."
    },
    {
      id: 's2',
      question: "What happens if equipment is damaged?",
      answer: "Any damage should be reported immediately through the platform. Our insurance coverage will handle valid claims according to the policy terms. Documentation of equipment condition before and after rental is required."
    }
  ]
};

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<FAQCategories>('general');
  const [openQuestions, setOpenQuestions] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleQuestion = (id: string) => {
    setOpenQuestions(prev =>
      prev.includes(id)
        ? prev.filter(q => q !== id)
        : [...prev, id]
    );
  };

  const categories = [
    { id: 'general', label: 'General', icon: <HelpCircle /> },
    { id: 'rental', label: 'Rental Process', icon: <Clock /> },
    { id: 'payment', label: 'Payments', icon: <CreditCard /> },
    { id: 'delivery', label: 'Delivery', icon: <Truck /> },
    { id: 'safety', label: 'Safety & Insurance', icon: <Shield /> },
  ];

  const filteredFaqs = faqs[activeCategory].filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="bg-slate-50 dark:bg-slate-900 py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="inline-block text-orange-500 font-medium text-sm mb-4">
            Support Center
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            How can we help you?
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Find answers to common questions about our platform
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 
                dark:border-slate-700 bg-white dark:bg-slate-800 
                text-slate-900 dark:text-slate-100 
                focus:outline-none focus:ring-2 focus:ring-orange-500 
                transition-all duration-200"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id as FAQCategories)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                ${activeCategory === category.id 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-orange-50 dark:hover:bg-slate-700'
                }`}
            >
              {React.cloneElement(category.icon, { 
                className: "h-4 w-4" 
              })}
              <span className="font-medium">{category.label}</span>
            </button>
          ))}
        </div>

        {/* FAQ Cards */}
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredFaqs.map((faq) => (
            <Card 
              key={faq.id}
              className="overflow-hidden bg-white dark:bg-slate-800 border-slate-200 
                dark:border-slate-700 hover:shadow-md transition-shadow"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center"
                onClick={() => toggleQuestion(faq.id)}
              >
                <span className="font-medium text-slate-900 dark:text-slate-100">
                  {faq.question}
                </span>
                <div className={`rounded-full p-1 transition-colors
                  ${openQuestions.includes(faq.id) 
                    ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-500' 
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-400'
                  }`}
                >
                  {openQuestions.includes(faq.id) 
                    ? <ChevronUp className="h-4 w-4" />
                    : <ChevronDown className="h-4 w-4" />
                  }
                </div>
              </button>
              
              {openQuestions.includes(faq.id) && (
                <div className="px-6 pb-4 text-slate-600 dark:text-slate-400 prose dark:prose-invert max-w-none">
                  {faq.answer}
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Contact Card */}
        <div className="mt-16 max-w-2xl mx-auto">
          <Card className="p-8 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100">
                Still have questions?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Can't find the answer you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
                <Button 
                  variant="outline"
                  className="border-slate-200 dark:border-slate-700"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  View Documentation
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}