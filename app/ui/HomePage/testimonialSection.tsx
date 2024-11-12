import React from 'react';
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  Star,
  Quote,
  ChevronRight,
  ChevronLeft,
  Building2,
  Hammer,
  TreePine
} from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Michael Roberts",
      role: "Construction Manager",
      company: "Roberts Construction LLC",
      image: "image.jpg",
      rating: 5,
      review: "RentItUp has transformed how we handle equipment needs. The platform is incredibly easy to use, and the quality of machinery available is outstanding. We've saved significantly on equipment costs.",
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
      review: "Finding specialized landscaping equipment used to be a hassle. With RentItUp, I can quickly locate and rent exactly what I need for each project. The verification system gives me confidence in the equipment quality.",
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
      review: "As a small contractor, owning all the equipment I need isn't feasible. RentItUp lets me access professional-grade tools when I need them. The pickup and delivery options are super convenient.",
      equipmentRented: "Professional Power Tools Set",
      icon: <Hammer className="h-5 w-5" />,
      industry: "Home Services"
    }
  ];

  const stats = [
    { label: "Active Users", value: "15,000+" },
    { label: "Equipment Listed", value: "25,000+" },
    { label: "Cities Covered", value: "500+" },
    { label: "Customer Satisfaction", value: "98%" }
  ];

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have transformed their equipment rental experience with RentItUp.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative p-6">
              {/* Quote Icon */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                <Quote className="w-4 h-4" />
              </div>

              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-slate-600 mb-6">"{testimonial.review}"</p>

              {/* Equipment Rented */}
              <div className="bg-slate-50 rounded-lg p-3 mb-6">
                <div className="text-sm text-slate-600">Equipment Rented:</div>
                <div className="font-medium">{testimonial.equipmentRented}</div>
              </div>

              {/* User Info */}
              <div className="flex items-center">
                <Avatar className="h-12 w-12 border-2 border-white">
                  <img src={testimonial.image} alt={testimonial.name} />
                </Avatar>
                <div className="ml-4">
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-slate-600">{testimonial.role}</div>
                  <div className="flex items-center text-sm text-slate-500 mt-1">
                    {testimonial.icon}
                    <span className="ml-1">{testimonial.industry}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <Card className="bg-green-600 text-white p-8 rounded-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-6">Ready to Get Started?</h3>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Rent Equipment
            </Button>
            <Button size="lg" variant="outline">
              List Your Equipment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}