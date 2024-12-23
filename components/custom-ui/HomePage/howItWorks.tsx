'use client';
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Calendar, 
  CreditCard, 
  Truck,
  Star,
  CheckCircle,
  Clock,
  MapPin
} from 'lucide-react';

export default function HowItWorksSection() {
  return (
    <section className="bg-slate-50 dark:bg-slate-900 py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-slate-100">
            Rent Equipment in
            <span className="text-orange-500 ml-2">4 Simple Steps</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Get the machinery you need quickly and efficiently
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Step 1 - Large Card */}
          <Card className="lg:col-span-2 p-8 hover:shadow-lg transition-shadow bg-white 
            dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 
                  flex items-center justify-center text-orange-500">
                  <Search className="h-6 w-6" />
                </div>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-orange-500 mb-2">Step 1</div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-slate-100">
                  Find Your Equipment
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Browse our extensive collection of machinery and tools. Use filters to narrow down 
                  by location, dates, and specifications.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    <span>500+ Machines</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <MapPin className="h-4 w-4 text-orange-500" />
                    <span>Local Equipment</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Step 2 - Regular Card */}
          <Card className="p-8 hover:shadow-lg transition-shadow bg-white 
            dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="flex flex-col h-full">
              <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 
                flex items-center justify-center text-orange-500 mb-6">
                <Calendar className="h-6 w-6" />
              </div>
              <div className="text-sm font-medium text-orange-500 mb-2">Step 2</div>
              <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-slate-100">
                Book & Schedule
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Choose your rental period and schedule pickup or delivery at your convenience.
              </p>
            </div>
          </Card>

          {/* Step 3 - Regular Card */}
          <Card className="p-8 hover:shadow-lg transition-shadow bg-white 
            dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="flex flex-col h-full">
              <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 
                flex items-center justify-center text-orange-500 mb-6">
                <CreditCard className="h-6 w-6" />
              </div>
              <div className="text-sm font-medium text-orange-500 mb-2">Step 3</div>
              <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-slate-100">
                Secure Payment
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Pay securely through our platform with various payment options.
              </p>
            </div>
          </Card>

          {/* Step 4 - Large Card */}
          <Card className="lg:col-span-2 p-8 hover:shadow-lg transition-shadow bg-white 
            dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 
                  flex items-center justify-center text-orange-500">
                  <Truck className="h-6 w-6" />
                </div>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-orange-500 mb-2">Step 4</div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-slate-100">
                  Get Your Equipment
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Choose between convenient delivery or pickup from the owner's location. 
                  Our platform ensures a smooth handover process.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <span>Quick Process</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Star className="h-4 w-4 text-orange-500" />
                    <span>Verified Owners</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Button 
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg"
          >
            Start Renting Now
          </Button>
        </div>
      </div>
    </section>
  );
}