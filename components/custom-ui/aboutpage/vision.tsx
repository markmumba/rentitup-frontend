import React from 'react';
import { Globe, Shield, Leaf } from 'lucide-react';

export default function VisionSection() {
    return (
        <section className="py-16 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    {/* Vision Header and Intro */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                            Our Vision
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            We dream big because we know the potential of this platform. Our vision is to make RentItUp the{' '}
                            <span className="font-bold text-gray-900 dark:text-white">
                                global leader in machinery rentals
                            </span>{' '}
                            by setting the standard for quality, reliability, and innovation.
                        </p>
                    </div>

                    {/* Vision Points */}
                    <div className="space-y-6 mb-12">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            We see a future where:
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 mt-1">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                </div>
                                <p className="text-lg text-gray-600 dark:text-gray-300">
                                    Renting a machine is as simple as placing an online order.
                                </p>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 mt-1">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                </div>
                                <p className="text-lg text-gray-600 dark:text-gray-300">
                                    Every renter has peace of mind knowing the equipment they receive is in excellent condition.
                                </p>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 mt-1">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                </div>
                                <p className="text-lg text-gray-600 dark:text-gray-300">
                                    Machine owners can confidently monetize their assets, knowing they&apos;re protected by fair policies and transparent practices.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Sustainability Section */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8">
                        <div className="flex items-center gap-4 mb-4">
                            <Leaf className="h-8 w-8 text-orange-500" />
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Sustainable Future
                            </h3>
                        </div>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            We also envision a sustainable future where the efficient sharing of resources reduces waste and promotes community growth. By unlocking the hidden potential of idle machinery, we&apos;re contributing to a more resourceful and eco-friendly world.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}