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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const categories = [
    {
      id: 1,
      icon: <PackagePlus className="h-8 w-8" />,
      name: "Material Handling",
      description: "Forklifts, pallet jacks, and hand trucks for efficient material transport"
    },
    {
      id: 2,
      icon: <Truck className="h-8 w-8" />,
      name: "Earth Moving",
      description: "Excavators, bulldozers, and skid-steer loaders for construction"
    },
    {
      id: 3,
      icon: <Building2 className="h-8 w-8" />,
      name: "Concrete & Masonry",
      description: "Cement mixers, concrete saws, and mortar mixers for construction"
    },
    {
      id: 4,
      icon: <Hammer className="h-8 w-8" />,
      name: "Power Tools",
      description: "Professional-grade drills, grinders, and electric saws"
    },
    {
      id: 5,
      icon: <Construction className="h-8 w-8" />,
      name: "Lifting Equipment",
      description: "Industrial cranes, hoists, and jacks for heavy lifting tasks"
    },
    {
      id: 6,
      icon: <Combine className="h-8 w-8" />,
      name: "Compaction",
      description: "Industrial plate compactors, rollers, and rammers"
    }
  ];

  return (
    <section className="bg-slate-50 dark:bg-slate-900 py-24">
      <div className="container mx-auto px-4">
        <MotionDiv
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-12"
        >
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto">
            <MotionH1
              variants={itemVariants}
              className="text-4xl font-bold mb-4 text-slate-900 dark:text-slate-100"
            >
              Browse Equipment
              <span className="block text-orange-500 mt-1">Categories</span>
            </MotionH1>
            <MotionP
              variants={itemVariants}
              className="text-slate-600 dark:text-slate-400"
            >
              Find the perfect machinery for your project from our comprehensive selection
            </MotionP>
          </div>

          {/* Standard Grid */}
          <MotionDiv
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {categories.map((category) => (
              <MotionCard
                key={category.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group overflow-hidden rounded-xl bg-white dark:bg-slate-800 
                  border border-slate-200 dark:border-slate-700
                  hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300"
              >
                <button
                  onClick={() => router.push(`/categories/${category.id}`)}
                  className="w-full h-full text-left p-6"
                >
                  <div className="flex flex-col h-full">
                    {/* Icon */}
                    <div className="mb-4">
                      <div className="w-14 h-14 rounded-xl bg-orange-100 dark:bg-orange-900/30 
                        flex items-center justify-center text-orange-600 dark:text-orange-400
                        group-hover:scale-110 transition-transform duration-300">
                        {category.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100">
                        {category.name}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                        {category.description}
                      </p>
                    </div>

                    {/* Action */}
                    <div className="flex items-center text-orange-500 dark:text-orange-400 
                      group-hover:translate-x-2 transition-transform duration-300">
                      <span className="text-sm font-medium">Browse Equipment</span>
                      <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </button>
              </MotionCard>
            ))}
          </MotionDiv>

          {/* View All Link */}
          <MotionDiv
            variants={itemVariants}
            className="text-center"
          >
            <Link href="/categories">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white
                  dark:bg-orange-600 dark:hover:bg-orange-700"
              >
                View All Categories
              </Button>
            </Link>
          </MotionDiv>
        </MotionDiv>
      </div>
    </section>
  );
}