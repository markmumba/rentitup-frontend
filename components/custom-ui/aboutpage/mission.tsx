import React from 'react';

export default function MissionSection() {
    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    {/* Mission Header */}
                    <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
                        Our Mission
                    </h2>
                    
                    {/* Mission Statement */}
                    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 mb-8">
                        <p className="text-xl text-gray-900 dark:text-white text-center italic">
                            "To revolutionize the machinery rental industry by creating a seamless and trustworthy platform that empowers people to achieve their goals, one machine at a time."
                        </p>
                    </div>
                    
                    {/* Mission Description */}
                    <div className="text-lg text-gray-600 dark:text-gray-300">
                        <p>
                            At RentItUp, our mission is simple but powerful: We strive to remove the barriers between need and access by building a platform that offers real-time availability, secure payments, and a reliable rating system. Whether you're tackling a home improvement project or managing a large construction site, we're here to provide the tools you need—literally.
                        </p>
                    </div>

                    {/* Feature Highlights */}
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
                            <div className="h-12 w-12 text-orange-500 mb-4">
                                <svg className="h-full w-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Real-time Availability</h3>
                            <p className="text-center text-gray-600 dark:text-gray-300">Find and book equipment instantly when you need it</p>
                        </div>

                        <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
                            <div className="h-12 w-12 text-orange-500 mb-4">
                                <svg className="h-full w-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Secure Payments</h3>
                            <p className="text-center text-gray-600 dark:text-gray-300">Protected transactions for peace of mind</p>
                        </div>

                        <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
                            <div className="h-12 w-12 text-orange-500 mb-4">
                                <svg className="h-full w-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Reliable Ratings</h3>
                            <p className="text-center text-gray-600 dark:text-gray-300">Trust built through community reviews</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}