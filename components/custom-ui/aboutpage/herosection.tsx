'use client';
import React from 'react';

export default function AboutHeroSection() {
    return (
        <section className="relative py-16 lg:py-24 overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-30">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 animate-pulse blur-3xl" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 animate-pulse delay-75 blur-3xl" />
            </div>

            {/* Main container with max width and padding */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Content wrapper with flex layout */}
                <div className="flex flex-col items-center text-center">
                    {/* Heading section with enhanced typography */}
                    <div className="space-y-2 mb-8">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl 
                                     bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-600
                                     animate-fade-in">
                            About Us
                        </h1>
                        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white opacity-0 animate-slide-up">
                            Our Story
                        </h2>
                    </div>

                    {/* Story content with enhanced typography */}
                    <div className="max-w-3xl mx-auto space-y-6 text-gray-600 dark:text-gray-300">
                        <p className="text-xl font-medium leading-relaxed opacity-0 animate-fade-in-delay-1">
                            The idea for <span className="text-2xl font-bold text-orange-500 dark:text-orange-400">RentItUp</span> began when we noticed a recurring challenge faced by contractors, small business owners, and even everyday homeowners: finding quality machinery at the right time and cost.
                        </p>
                        <p className="text-lg opacity-0 animate-fade-in-delay-2">
                            We asked ourselves, <span className="italic font-medium">"What if there was a way to connect those who have machinery with those who need it—quickly, safely, and affordably?"</span> That question sparked the creation of RentItUp.
                        </p>
                        <p className="text-lg opacity-0 animate-fade-in-delay-3">
                            <span className="text-xl font-semibold text-orange-500 dark:text-orange-600">RentItUp</span> is more than a platform; it's a solution born out of necessity.
                        </p>
                        <p className="text-lg opacity-0 animate-fade-in-delay-4">
                            Today, RentItUp serves as a trusted bridge between renters and machine owners, fostering connections that help businesses grow and individuals complete their projects efficiently.
                        </p>
                    </div>

                    {/* Stats and reviews section with animations */}
                    <div className="mt-12 opacity-0 animate-fade-in-delay-5">
                        <div className="flex items-center justify-center gap-8">
                            <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                                <svg className="w-5 h-5 text-orange-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="font-semibold">4.9/5</span>
                                <span className="text-sm">(2.5k+ Reviews)</span>
                            </div>
                            <div className="h-6 w-px bg-slate-300 dark:bg-slate-700" />
                            <div className="text-sm text-slate-600 dark:text-slate-400">
                                <span className="font-semibold">10,000+</span> Active Users
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes slide-up {
                    from { 
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 1s forwards;
                }

                .animate-slide-up {
                    animation: slide-up 1s forwards;
                }

                .animate-fade-in-delay-1 {
                    animation: fade-in 1s forwards;
                    animation-delay: 0.2s;
                }

                .animate-fade-in-delay-2 {
                    animation: fade-in 1s forwards;
                    animation-delay: 0.4s;
                }

                .animate-fade-in-delay-3 {
                    animation: fade-in 1s forwards;
                    animation-delay: 0.6s;
                }

                .animate-fade-in-delay-4 {
                    animation: fade-in 1s forwards;
                    animation-delay: 0.8s;
                }

                .animate-fade-in-delay-5 {
                    animation: fade-in 1s forwards;
                    animation-delay: 1s;
                }
            `}</style>
        </section>
    );
}