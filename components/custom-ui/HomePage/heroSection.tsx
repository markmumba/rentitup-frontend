'use client'
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, TractorIcon, Timer, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { 
  MotionDiv, 
  MotionH1, 
  MotionP, 
  MotionSpan,
  MotionInput,
  MotionCard 
} from '@/components/motion';

export default function HeroSection() {
  const router = useRouter();
  const [searchWord, setSearchWord] = useState<string>("");

  const handleSearch = () => {
    if (searchWord.trim()) {
      router.push(`/machines?query=${encodeURIComponent(searchWord.trim())}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const searchBarVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.8
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-t from-green-100 dark:from-green-950 dark:bg-slate-900 min-h-screen">
      <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,black,rgba(0,0,0,0.6))] -z-10" />

      <MotionDiv
        className="container mx-auto px-4 md:pt-60 pb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-8">
            <MotionH1 
              className="text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
              variants={titleVariants}
            >
              Rent Any Machine,
              <MotionSpan 
                className="text-green-500 block mt-2"
                variants={titleVariants}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Anytime, Anywhere
              </MotionSpan>
            </MotionH1>

            <MotionP 
              className="text-xl text-slate-600 dark:text-slate-400 max-w-xl"
              variants={itemVariants}
            >
              Connect with local machine owners and rent the equipment you need.
              From construction gear to garden tools, find it all on RentItUp.
            </MotionP>

            <MotionDiv 
              className="flex gap-2 max-w-md"
              variants={searchBarVariants}
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400 dark:text-slate-500" />
                <MotionInput
                  type="text"
                  placeholder="What machinery do you need?"
                  value={searchWord}
                  onChange={(e) => setSearchWord(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                />
              </div>
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
                onClick={handleSearch}
              >
                Search
              </Button>
            </MotionDiv>
          </div>

          <MotionDiv 
            className="flex-1 grid grid-cols-2 gap-4"
            variants={containerVariants}
          >
            {[
              {
                icon: <TractorIcon className="h-8 w-8 text-green-600 dark:text-green-400 mb-4" />,
                title: "Wide Selection",
                description: "Access to various machinery from trusted owners"
              },
              {
                icon: <Timer className="h-8 w-8 text-green-600 dark:text-green-400 mb-4" />,
                title: "Real-time Booking",
                description: "Check availability and book instantly"
              },
              {
                icon: <Shield className="h-8 w-8 text-green-600 dark:text-green-400 mb-4" />,
                title: "Secure Platform",
                description: "Verified owners and secure payments"
              },
              {
                icon: (
                  <svg className="h-8 w-8 text-green-600 dark:text-green-400 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                ),
                title: "Quality Assured",
                description: "Rated and reviewed by real users"
              }
            ].map((item, index) => (
              <MotionCard
                key={index}
                className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm dark:shadow-lg"
                variants={cardVariants}
                whileHover="hover"
                custom={index}
              >
                {item.icon}
                <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-slate-100">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{item.description}</p>
              </MotionCard>
            ))}
          </MotionDiv>
        </div>
      </MotionDiv>
    </div>
  )
};