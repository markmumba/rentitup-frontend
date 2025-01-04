"use client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  PackagePlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { categoryAPI } from "@/lib/service";
import { Spinner } from "@/components/ui/spinner";
import { MotionCard, MotionDiv, MotionH1, MotionP } from "@/components/motion";
import { CategoryListResponse } from "@/lib/definitions";

// Map category names to their respective icons

export default function CategoriesSection() {
  const router = useRouter();

  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: categoryAPI.getAllCategories,
    retry: 2,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  if (isLoading) {
    return (
      <section className="bg-slate-50 dark:bg-slate-900 py-24">
        <div className="container mx-auto px-4 flex justify-center items-center min-h-[400px]">
          <Spinner />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="bg-slate-50 dark:bg-slate-900 py-24">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-500 dark:text-red-400">
            Error loading categories. Please try again later.
          </p>
          <Button
            onClick={() => router.refresh()}
            className="mt-4 bg-orange-500 hover:bg-orange-600"
          >
            Retry
          </Button>
        </div>
      </section>
    );
  }

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
              Find the perfect machinery for your project from our comprehensive
              selection
            </MotionP>
          </div>

          {/* Categories Grid */}
          <MotionDiv
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {categories?.map((category: CategoryListResponse) => (
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
                      <div
                        className="w-14 h-14 rounded-xl bg-orange-100 dark:bg-orange-900/30
                        flex items-center justify-center text-orange-600 dark:text-orange-400
                        group-hover:scale-110 transition-transform duration-300"
                      >
                        <PackagePlus className="h-8 w-8" />
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
                    <div
                      className="flex items-center text-orange-500 dark:text-orange-400
                      group-hover:translate-x-2 transition-transform duration-300"
                    >
                      <span className="text-sm font-medium">
                        Browse Equipment
                      </span>
                      <svg
                        className="w-5 h-5 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </button>
              </MotionCard>
            ))}
          </MotionDiv>

          {/* View All Link */}
          <MotionDiv variants={itemVariants} className="text-center">
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
