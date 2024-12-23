'use client';
import React from 'react';
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Star,
  Quote,
  Building2,
  Hammer,
  TreePine,
  Users,
  Package,
  MapPin,
  Heart
} from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Michael Roberts",
      role: "Construction Manager",
      company: "Roberts Construction LLC",
      image: "image.jpg",
      rating: 5,
      review: "RentItUp has transformed how we handle equipment needs. The platform is incredibly easy to use, and the quality of machinery available is outstanding.",
      equipmentRented: "CAT Excavator 320",
      icon: <Building2 className="h-5 w-5" />,
      industry: "Construction"
    },
    {
      name: "Sarah Chen",
      role: "Landscape Architect",
      company: "Green Space Designs",
      image: "image.jpg",
      rating: 5,
      review: "Finding specialized landscaping equipment used to be a hassle. With RentItUp, I can quickly locate and rent exactly what I need for each project.",
      equipmentRented: "Kubota Tractor",
      icon: <TreePine className="h-5 w-5" />,
      industry: "Landscaping"
    },
    {
      name: "David Martinez",
      role: "Independent Contractor",
      company: "Martinez Home Services",
      image: "image.jpg",
      rating: 4,
      review: "As a small contractor, owning all the equipment I need isn't feasible. RentItUp lets me access professional-grade tools when I need them.",
      equipmentRented: "Power Tools Set",
      icon: <Hammer className="h-5 w-5" />,
      industry: "Home Services"
    }
  ];

  return (
    <section className="bg-slate-50 dark:bg-slate-900 py-24">
      <div className="container mx-auto px-4">
        {/* Header with Featured Stat */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 
            text-orange-600 px-4 py-1 rounded-full text-sm font-medium mb-4">
            <Star className="h-4 w-4 fill-current" />
            4.9 out of 5 based on 2,500+ reviews
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Trusted by Professionals
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Join thousands of satisfied customers who have transformed their equipment rental experience
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {[
            { icon: <Users />, label: "Active Users", value: "15,000+" },
            { icon: <Package />, label: "Equipment Listed", value: "25,000+" },
            { icon: <MapPin />, label: "Cities Covered", value: "500+" },
            { icon: <Heart />, label: "Satisfaction Rate", value: "98%" }
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 rounded-lg bg-white dark:bg-slate-800 
              shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-orange-100 dark:bg-orange-900/30 
                flex items-center justify-center text-orange-500">
                {React.cloneElement(stat.icon, { className: "h-6 w-6" })}
              </div>
              <div className="font-bold text-2xl text-slate-900 dark:text-slate-100 mb-1">
                {stat.value}
              </div>
              <div className="text-slate-600 dark:text-slate-400 text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="relative bg-white dark:bg-slate-800 border-slate-200 
                dark:border-slate-700 hover:shadow-lg transition-shadow"
            >
              {/* Main Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="h-12 w-12 border-2 border-white dark:border-slate-700">
                    <img src={testimonial.image} alt={testimonial.name} />
                  </Avatar>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-slate-100">
                      {testimonial.name}
                    </div>
                    <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                      {React.cloneElement(testimonial.icon, { className: "h-4 w-4 mr-1" })}
                      {testimonial.industry}
                    </div>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating 
                          ? 'text-orange-400 fill-current' 
                          : 'text-slate-300 dark:text-slate-600'
                      }`}
                    />
                  ))}
                </div>

                <blockquote className="text-slate-600 dark:text-slate-400 mb-4">
                  "{testimonial.review}"
                </blockquote>

                <div className="text-sm bg-slate-50 dark:bg-slate-900 rounded-lg p-3">
                  <div className="text-slate-500 dark:text-slate-400">Equipment Rented:</div>
                  <div className="font-medium text-slate-900 dark:text-slate-100">
                    {testimonial.equipmentRented}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Button 
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8"
          >
            Start Renting Now
          </Button>
        </div>
      </div>
    </section>
  );
}