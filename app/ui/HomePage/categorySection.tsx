'use client';
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  PackagePlus, 
  Truck, 
  Building2, 
  Hammer,
  Construction,
  Combine
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CategoriesSection() {
  const router = useRouter();

  const categories = [
    {
      id: 1,
      icon: <PackagePlus className="h-8 w-8" />,
      name: "Material Handling Equipment",
      description: "Forklifts, pallet jacks, and hand trucks for efficient material transport",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      icon: <Truck className="h-8 w-8" />,
      name: "Earth Moving Equipment",
      description: "Excavators, bulldozers, and skid-steer loaders",
      gradient: "from-orange-500 to-amber-500"
    },
    {
      id: 3,
      icon: <Building2 className="h-8 w-8" />,
      name: "Concrete & Masonry Equipment",
      description: "Cement mixers, concrete saws, and mortar mixers",
      gradient: "from-gray-500 to-slate-500"
    },
    {
      id: 4,
      icon: <Hammer className="h-8 w-8" />,
      name: "Power Tools",
      description: "Drills, angle grinders, and electric saws",
      gradient: "from-red-500 to-rose-500"
    },
    {
      id: 5,
      icon: <Construction className="h-8 w-8" />,
      name: "Lifting & Hoisting Equipment",
      description: "Cranes, hoists, and jacks for heavy lifting",
      gradient: "from-yellow-500 to-amber-500"
    },
    {
      id: 6,
      icon: <Combine className="h-8 w-8" />,
      name: "Compaction Equipment",
      description: "Plate compactors, rollers, and rammers",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="bg-white py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Equipment Categories</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Explore our comprehensive range of construction and industrial equipment. 
            Find the right tools and machinery for your specific project needs.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Card 
              key={category.id}
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
                <p className="text-slate-600 mb-4 line-clamp-2">{category.description}</p>

                {/* CTA */}
                <div className="flex justify-end">
                  <Button 
                    variant="ghost" 
                    className="text-green-600 hover:text-green-700 hover:bg-blue-50"
                    onClick={() => router.push(`/categories/${category.id}`)}
                  >
                    View Equipment →
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/categories">
            <Button 
              size="lg"
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-blue-50"
            >
              View All Categories
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}