'use client';
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Star,
  MapPin,
  ChevronRight,
  Shield
} from 'lucide-react';

export default function FeaturedEquipment() {
  const [activeView, setActiveView] = React.useState('trending');

  const equipment = [
    {
      title: "CAT Excavator 320",
      category: "Construction",
      image: "/excavator.jpeg",
      rating: 4.9,
      reviews: 128,
      price: 29900,
      location: "Nairobi, Kenya",
      owner: {
        name: "John's Construction",
        verified: true
      },
      trending: true
    },
    {
      title: "Kubota Skid Steer",
      category: "Landscaping",
      image: "skid.jpg",
      rating: 4.7,
      reviews: 89,
      price: 19900,
      location: "Mombasa, Kenya",
      owner: {
        name: "Green Valley Equipment",
        verified: true
      },
      trending: true
    },
    {
      title: "Commercial Wood Chipper",
      category: "Garden",
      image: "chipper.jpg",
      rating: 4.8,
      reviews: 64,
      price: 15000,
      location: "Nakuru, Kenya",
      owner: {
        name: "Pacific Rentals",
        verified: true
      },
      trending: true
    },
    {
      title: "Boom Lift 60ft",
      category: "Construction",
      image: "boomlift.jpg",
      rating: 4.9,
      reviews: 92,
      price: 27500,
      location: "Eldoret, Kenya",
      owner: {
        name: "Heights Equipment",
        verified: true
      },
      trending: true
    }
  ];

  return (
    <section className="bg-slate-50 dark:bg-slate-900 py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Featured Equipment
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Browse our selection of verified and well-maintained machinery
          </p>
        </div>

        {/* Filter Options */}
        <div className="flex justify-center gap-4 mb-12">
          {['Trending', 'New Arrivals', 'Popular'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveView(filter.toLowerCase())}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${activeView === filter.toLowerCase() 
                  ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' 
                  : 'text-slate-600 hover:text-orange-500 dark:text-slate-400 dark:hover:text-orange-400'
                }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {equipment.map((item, index) => (
            <Card 
              key={index} 
              className="overflow-hidden bg-white dark:bg-slate-800 hover:shadow-lg transition-all"
            >
              {/* Image */}
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-3 left-3 bg-white/90 text-slate-900 
                  dark:bg-slate-800/90 dark:text-slate-100">
                  {item.category}
                </Badge>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium text-slate-900 dark:text-slate-100">
                    {item.title}
                  </h3>
                  <div className="flex items-center text-sm">
                    <Star className="w-4 h-4 text-orange-500 fill-current" />
                    <span className="ml-1 font-medium">{item.rating}</span>
                  </div>
                </div>

                <div className="flex items-center text-sm text-slate-600 dark:text-slate-400 mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  {item.location}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-1">
                    {item.owner.verified && (
                      <Badge variant="outline" className="text-xs">
                        <Shield className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-orange-500">
                      KSh {item.price.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-500">per day</div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <Button 
            variant="ghost"
            className="text-orange-500 hover:text-orange-600 hover:bg-orange-50
              dark:text-orange-400 dark:hover:text-orange-300 dark:hover:bg-orange-900/30"
          >
            View All Equipment
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}