import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Calendar, 
  CreditCard, 
  Truck,
  ArrowRight,
  Star
} from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    {
      icon: <Search className="h-8 w-8" />,
      title: "Find Equipment",
      description: "Browse our extensive collection of machinery and tools. Filter by location, dates, and specifications.",
      color: "bg-blue-500",
      darkColor: "bg-blue-700"
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Book & Schedule",
      description: "Choose your rental period and schedule pickup or delivery at your convenience.",
      color: "bg-green-500",
      darkColor: "bg-green-700"
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Secure Payment",
      description: "Pay securely through our platform with various payment options and damage protection.",
      color: "bg-purple-500",
      darkColor: "bg-purple-700"
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Pickup/Delivery",
      description: "Get your equipment delivered or pick it up from the owner's location.",
      color: "bg-orange-500",
      darkColor: "bg-orange-700"
    }
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-900 py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-slate-100">How RentItUp Works</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Renting machinery has never been easier. Follow these simple steps to get the equipment you need.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="p-6 h-full hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300 group bg-white dark:bg-slate-800 dark:border-slate-700">
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-slate-900 dark:bg-slate-700 text-white 
                  flex items-center justify-center font-bold z-10">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`${step.color} dark:${step.darkColor} w-16 h-16 rounded-full flex items-center justify-center 
                  text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-slate-100">{step.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{step.description}</p>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-full w-8 transform -translate-x-4">
                    <ArrowRight className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                  </div>
                )}
              </Card>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg dark:shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">10,000+</div>
              <div className="text-slate-600 dark:text-slate-400">Successful Rentals</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">4.8/5</div>
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 dark:text-yellow-500 fill-current" />
                ))}
              </div>
              <div className="text-slate-600 dark:text-slate-400">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">2,500+</div>
              <div className="text-slate-600 dark:text-slate-400">Verified Equipment Owners</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button 
            size="lg" 
            className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-lg px-8"
          >
            Start Renting Now
          </Button>
        </div>
      </div>
    </div>
  );
}