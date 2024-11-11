
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Truck, 
  Hammer, 
  Scissors, 
  TreePine,
  Construction,
  PaintBucket,
  Wrench,
  Package
} from 'lucide-react';

export default function CategoriesSection() {
  const categories = [
    {
      icon: <Construction className="h-8 w-8" />,
      name: "Construction Equipment",
      description: "Excavators, Bulldozers, Cranes",
      count: 456,
      gradient: "from-orange-500 to-amber-500"
    },
    {
      icon: <TreePine className="h-8 w-8" />,
      name: "Landscaping Tools",
      description: "Lawn Mowers, Tillers, Chippers",
      count: 289,
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Truck className="h-8 w-8" />,
      name: "Transportation",
      description: "Trucks, Trailers, Forklifts",
      count: 167,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <PaintBucket className="h-8 w-8" />,
      name: "Painting Equipment",
      description: "Sprayers, Sanders, Scaffolding",
      count: 145,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Hammer className="h-8 w-8" />,
      name: "Power Tools",
      description: "Drills, Saws, Nail Guns",
      count: 392,
      gradient: "from-red-500 to-rose-500"
    },
    {
      icon: <Scissors className="h-8 w-8" />,
      name: "Garden Tools",
      description: "Pruners, Hedge Trimmers, Blowers",
      count: 234,
      gradient: "from-lime-500 to-green-500"
    },
    {
      icon: <Wrench className="h-8 w-8" />,
      name: "Maintenance",
      description: "Pressure Washers, Generators",
      count: 178,
      gradient: "from-teal-500 to-cyan-500"
    },
    {
      icon: <Package className="h-8 w-8" />,
      name: "Moving Equipment",
      description: "Dollies, Hand Trucks, Pallet Jacks",
      count: 123,
      gradient: "from-indigo-500 to-blue-500"
    }
  ];

  return (
    <div className="bg-white py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Popular Categories</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Browse through our most popular equipment categories. From construction machinery 
            to garden tools, find exactly what you need for your project.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                {/* Icon with gradient background */}
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${category.gradient} 
                  flex items-center justify-center text-white mb-4 
                  group-hover:scale-110 transition-transform duration-300`}>
                  {category.icon}
                </div>

                {/* Category Info */}
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-slate-600 mb-4">{category.description}</p>

                {/* Item Count & CTA */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    {category.count} items available
                  </span>
                  <Button 
                    variant="ghost" 
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  >
                    Browse →
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button 
            size="lg"
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            View All Categories
          </Button>
        </div>
      </div>
    </div>
  );
}