
'use client'
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, TractorIcon, Timer, Shield } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden  bg-slate-50 min-h-screen">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      
      <div className="container mx-auto px-4 md:pt-60 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="flex-1 space-y-8 animate-fade-in">
            <h1 className="text-5xl font-bold tracking-tight text-slate-900">
              Rent Any Machine,
              <span className="text-blue-600 block mt-2">Anytime, Anywhere</span>
            </h1>
            
            <p className="text-xl text-slate-600 max-w-xl">
              Connect with local machine owners and rent the equipment you need. 
              From construction gear to garden tools, find it all on RentItUp.
            </p>

            {/* Search Bar */}
            <div className="flex gap-2 max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="What machinery do you need?"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Search
              </Button>
            </div>
          </div>

          {/* Right Content - Features Cards */}
          <div className="flex-1 grid grid-cols-2 gap-4">
            <Card className="p-6 hover:shadow-lg transition-shadow animate-slide-up">
              <TractorIcon className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Wide Selection</h3>
              <p className="text-slate-600">Access to various machinery from trusted owners</p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow animate-slide-up delay-100">
              <Timer className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Real-time Booking</h3>
              <p className="text-slate-600">Check availability and book instantly</p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow animate-slide-up delay-200">
              <Shield className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Secure Platform</h3>
              <p className="text-slate-600">Verified owners and secure payments</p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow animate-slide-up delay-300">
              <svg className="h-8 w-8 text-blue-600 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="font-semibold text-lg mb-2">Quality Assured</h3>
              <p className="text-slate-600">Rated and reviewed by real users</p>
            </Card>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  );
}