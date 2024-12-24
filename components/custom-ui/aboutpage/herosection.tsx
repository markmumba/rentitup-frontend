

export default function AboutHeroSection() {
    return (
        <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
            {/* Main container with max width and padding */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Content wrapper with flex layout */}
                <div className="flex flex-col items-center text-center">
                    {/* Heading section */}
                    <div className="space-y-2 mb-8">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                            About Us
                        </h1>
                        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
                            Our Story
                        </h2>
                    </div>

                    {/* Story content with responsive max-width */}
                    <div className="max-w-3xl mx-auto space-y-6 text-lg text-gray-600 dark:text-gray-300">
                        <p>
                            The idea for RentItUp began when we noticed a recurring challenge faced by contractors, small business owners, and even everyday homeowners: finding quality machinery at the right time and cost. Traditional rental options were limited, inconvenient, or overpriced, and machine owners often found their equipment sitting idle, losing value day by day.
                        </p>
                        <p>
                            We asked ourselves, "What if there was a way to connect those who have machinery with those who need it—quickly, safely, and affordably?" That question sparked the creation of RentItUp.
                        </p>
                        <p>
                            RentItUp is more than a platform; it's a solution born out of necessity. It's designed to break down barriers in the machinery rental industry, offering a new way to rent heavy and small-scale equipment without the hassle of middlemen or outdated processes. By leveraging technology, we aim to empower local communities, create economic opportunities, and make machinery rentals as easy as booking a ride.
                        </p>
                        <p>
                            Today, RentItUp serves as a trusted bridge between renters and machine owners, fostering connections that help businesses grow and individuals complete their projects efficiently.
                        </p>
                    </div>

                    {/* Stats and reviews section */}
                    <div className="mt-12">
                        <div className="flex items-center justify-center gap-8">
                            <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                                <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
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
        </section>
    );
}