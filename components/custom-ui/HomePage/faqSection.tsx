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
  Mail
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

  const toggleQuestion = (id: string) => {
    setOpenQuestions(prev =>
      prev.includes(id)
        ? prev.filter(q => q !== id)
        : [...prev, id]
    );
  };

  const categories = [
    { id: 'general', label: 'General', icon: <HelpCircle className="h-4 w-4" /> },
    { id: 'rental', label: 'Rental Process', icon: <Clock className="h-4 w-4" /> },
    { id: 'payment', label: 'Payments', icon: <CreditCard className="h-4 w-4" /> },
    { id: 'delivery', label: 'Delivery', icon: <Truck className="h-4 w-4" /> },
    { id: 'safety', label: 'Safety & Insurance', icon: <Shield className="h-4 w-4" /> },
  ];

  return (
    <div className="bg-white dark:bg-slate-950 py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">Frequently Asked Questions</h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Find answers to common questions about renting and listing equipment on RentItUp.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? 'default' : 'outline'}
              onClick={() => setActiveCategory(category.id as FAQCategories)}
              className="flex items-center gap-2 dark:text-white dark:hover:bg-slate-800 dark:border-slate-700"
            >
              {React.cloneElement(category.icon, {
                className: "h-4 w-4 dark:text-white"
              })}
              {category.label}
            </Button>
          ))}
        </div>

        {/* FAQ Cards */}
        <div className="max-w-3xl mx-auto">
          {faqs[activeCategory].map((faq) => (
            <Card 
              key={faq.id}
              className="mb-4 overflow-hidden dark:bg-slate-800 dark:border-slate-700"
            >
              <button
                className="w-full p-6 text-left flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-700"
                onClick={() => toggleQuestion(faq.id)}
              >
                <span className="font-semibold dark:text-white">{faq.question}</span>
                {openQuestions.includes(faq.id) ? (
                  <ChevronUp className="h-5 w-5 text-slate-400 dark:text-slate-300" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-slate-400 dark:text-slate-300" />
                )}
              </button>
              
              {openQuestions.includes(faq.id) && (
                <div className="px-6 pb-6 text-slate-600 dark:text-slate-300">
                  {faq.answer}
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">Still Have Questions?</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Our support team is here to help you with any questions you might have.
            </p>
            <div className="flex justify-center gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-700">
                <Mail className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
              <Button variant="outline" className="dark:border-slate-700 dark:text-white dark:hover:bg-slate-800">
                <FileText className="h-4 w-4 mr-2" />
                View Documentation
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}