'use client'
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Star,
  MapPin,
  Clock,
  Shield,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function FeaturedEquipment() {
  const [activeTab, setActiveTab] = React.useState('trending');
  
  const equipment = [
    {
      title: "CAT Excavator 320",
      category: "Construction",
      image: "/excavator.jpeg",
      rating: 4.9,
      reviews: 128,
      price: 299,
      location: "Seattle, WA",
      owner: {
        name: "John's Construction",
        rating: 4.8,
        verified: true
      },
      trending: true,
      new: false
    },
    {
      title: "Kubota Skid Steer",
      category: "Landscaping",
      image: "skid.jpg",
      rating: 4.7,
      reviews: 89,
      price: 199,
      location: "Portland, OR",
      owner: {
        name: "Green Valley Equipment",
        rating: 4.9,
        verified: true
      },
      trending: true,
      new: true
    },
    {
      title: "Commercial Wood Chipper",
      category: "Garden",
      image: "backhoe.jpeg",
      rating: 4.8,
      reviews: 64,
      price: 150,
      location: "Vancouver, WA",
      owner: {
        name: "Pacific Rentals",
        rating: 4.7,
        verified: true
      },
      trending: false,
      new: true
    },
    {
      title: "Boom Lift 60ft",
      category: "Construction",
      image: "backhoe.jpeg",
      rating: 4.9,
      reviews: 92,
      price: 275,
      location: "Bellevue, WA",
      owner: {
        name: "Heights Equipment",
        rating: 4.9,
        verified: true
      },
      trending: true,
      new: false
    }
  ];

  return (
    <div className="bg-white py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Featured Equipment</h2>
            <p className="text-slate-600 max-w-2xl">
              Discover our most popular and newly listed machinery. All equipment is verified 
              and maintained to the highest standards.
            </p>
          </div>
          
          {/* Navigation Buttons */}
          <div className="hidden md:flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-4 mb-8">
          <Button
            variant={activeTab === 'trending' ? 'default' : 'outline'}
            onClick={() => setActiveTab('trending')}
            className="rounded-full"
          >
            🔥 Trending
          </Button>
          <Button
            variant={activeTab === 'new' ? 'default' : 'outline'}
            onClick={() => setActiveTab('new')}
            className="rounded-full"
          >
            ✨ Newly Listed
          </Button>
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {equipment
            .filter(item => 
              (activeTab === 'trending' && item.trending) || 
              (activeTab === 'new' && item.new)
            )
            .map((item, index) => (
            <Card key={index} className="group overflow-hidden hover:shadow-xl transition-shadow">
              {/* Image */}
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-white text-slate-900">
                  {item.category}
                </Badge>
                {item.new && (
                  <Badge className="absolute top-4 right-4 bg-green-500">
                    New
                  </Badge>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">{item.rating}</span>
                    <span className="ml-1 text-sm text-slate-500">({item.reviews})</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center text-slate-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{item.location}</span>
                  </div>
                  <div className="flex items-center text-slate-600">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="text-sm">Daily Rate</span>
                  </div>
                </div>

                {/* Owner Info */}
                <div className="flex items-center justify-between pb-4 border-b">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-slate-200 rounded-full mr-2" />
                    <div>
                      <div className="text-sm font-medium">{item.owner.name}</div>
                      <div className="flex items-center">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs ml-1">{item.owner.rating}</span>
                        {item.owner.verified && (
                          <Shield className="w-3 h-3 text-blue-500 ml-2" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      ${item.price}
                    </div>
                    <div className="text-xs text-slate-500">per day</div>
                  </div>
                </div>

                {/* Action Button */}
                <Button className="w-full mt-4">
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8">
            View All Equipment
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}