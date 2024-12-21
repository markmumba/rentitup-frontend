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
import {
  MotionDiv,
  MotionH1,
  MotionP,
  MotionCard
} from '@/components/motion';

export default function CategoriesSection() {
  const router = useRouter();

  // Animation variants remain the same

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2
      }
    }
  };

  const categories = [
    {
      id: 1,
      icon: <PackagePlus className="h-8 w-8 text-white" />,
      name: "Material Handling Equipment",
      description: "Forklifts, pallet jacks, and hand trucks for efficient material transport",
      gradient: "from-blue-500 to-cyan-500",
      darkGradient: "from-blue-700 to-cyan-700"
    },
    {
      id: 2,
      icon: <Truck className="h-8 w-8 text-white" />,
      name: "Earth Moving Equipment",
      description: "Excavators, bulldozers, and skid-steer loaders",
      gradient: "from-orange-500 to-amber-500",
      darkGradient: "from-orange-700 to-amber-700"
    },
    {
      id: 3,
      icon: <Building2 className="h-8 w-8 text-white" />,
      name: "Concrete & Masonry Equipment",
      description: "Cement mixers, concrete saws, and mortar mixers",
      gradient: "from-gray-500 to-slate-500",
      darkGradient: "from-gray-700 to-slate-700"
    },
    {
      id: 4,
      icon: <Hammer className="h-8 w-8 text-white" />,
      name: "Power Tools",
      description: "Drills, angle grinders, and electric saws",
      gradient: "from-red-500 to-rose-500",
      darkGradient: "from-red-700 to-rose-700"
    },
    {
      id: 5,
      icon: <Construction className="h-8 w-8 text-white" />,
      name: "Lifting & Hoisting Equipment",
      description: "Cranes, hoists, and jacks for heavy lifting",
      gradient: "from-yellow-500 to-amber-500",
      darkGradient: "from-yellow-700 to-amber-700"
    },
    {
      id: 6,
      icon: <Combine className="h-8 w-8 text-white" />,
      name: "Compaction Equipment",
      description: "Plate compactors, rollers, and rammers",
      gradient: "from-green-500 to-emerald-500",
      darkGradient: "from-green-700 to-emerald-700"
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 py-24">
      <MotionDiv
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          <MotionH1
            className="text-3xl font-bold mb-4 text-slate-900 dark:text-slate-100"
            variants={headerVariants}
          >
            Equipment Categories
          </MotionH1>
          <MotionP
            className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            variants={headerVariants}
          >
            Explore our comprehensive range of construction and industrial equipment.
            Find the right tools and machinery for your specific project needs.
          </MotionP>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <MotionCard
              key={category.id}
              variants={cardVariants}
              whileHover="hover"
              className="group relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl dark:hover:shadow-2xl transition-shadow duration-300 bg-white dark:bg-slate-800"
            >
              <div className="p-6">
                {/* Icon with gradient background */}
                <MotionDiv
                  className={`w-16 h-16 rounded-full bg-gradient-to-r 
                    ${category.gradient} dark:${category.darkGradient}
                    flex items-center justify-center text-white mb-4`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {category.icon}
                </MotionDiv>

                {/* Category Info */}
                <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100">{category.name}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">{category.description}</p>

                {/* CTA */}
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    className="text-green-600 dark:text-green-400 hover:text-green-700 hover:bg-blue-50 dark:hover:bg-slate-700"
                    onClick={() => router.push(`/categories/${category.id}`)}
                  >
                    View Equipment →
                  </Button>
                </div>
              </div>
            </MotionCard>
          ))}
        </div>

        {/* View All Button */}
        <MotionDiv
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Link href="/categories">
            <Button
              size="lg"
              variant="outline"
              className="border-green-600 text-green-600 dark:border-green-400 dark:text-green-400 hover:bg-blue-50 dark:hover:bg-slate-700"
            >
              View All Categories
            </Button>
          </Link>
        </MotionDiv>
      </MotionDiv>
    </div>
  );
}






