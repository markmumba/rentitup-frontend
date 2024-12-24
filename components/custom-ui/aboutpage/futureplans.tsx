import React from 'react';
import { 
    CheckCircle, 
    Shield, 
    Boxes, 
    Globe, 
    Leaf, 
    Laptop 
} from 'lucide-react';

export default function FuturePlansSection() {
    const plans = [
        {
            icon: <CheckCircle className="h-6 w-6" />,
            title: "Verified Machine Condition Checks",
            description: "We're introducing a feature to ensure that every machine listed on our platform meets high-quality standards. Through a combination of user reviews and periodic inspections, we'll ensure that renters can trust the equipment they receive."
        },
        {
            icon: <Shield className="h-6 w-6" />,
            title: "Insurance Options",
            description: "To provide additional peace of mind, we're partnering with insurance providers to offer coverage for damages, theft, or accidents during rentals."
        },
        {
            icon: <Boxes className="h-6 w-6" />,
            title: "Expanded Machine Categories",
            description: "We plan to grow our inventory by adding more equipment types, from specialized construction tools to gardening equipment and beyond."
        },
        {
            icon: <Globe className="h-6 w-6" />,
            title: "Global Expansion",
            description: "Starting with local markets, we aim to expand RentItUp to cities and regions worldwide, bringing our seamless rental experience to a global audience."
        },
        {
            icon: <Leaf className="h-6 w-6" />,
            title: "Sustainability Initiatives",
            description: "We're exploring ways to make machinery sharing more eco-friendly, reducing waste, and promoting the sustainable use of resources."
        },
        {
            icon: <Laptop className="h-6 w-6" />,
            title: "Enhanced User Experience",
            description: "Our roadmap includes constant improvements to the platform, such as AI-driven recommendations for renters and personalized dashboards for machine owners."
        }
    ];

    return (
        <section className="py-16 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Future Plans
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            At RentItUp, we don't just aim to solve today's problems—we're already preparing for tomorrow. Here's a glimpse of what's in store:
                        </p>
                    </div>

                    {/* Plans Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {plans.map((plan, index) => (
                            <div 
                                key={plan.title}
                                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="text-orange-500">
                                        {plan.icon}
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {plan.title}
                                    </h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {plan.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Closing Statement */}
                    <div className="mt-12 text-center">
                        <p className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            RentItUp isn't just a platform—it's a movement to transform how machinery is rented, one transaction at a time.
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                            We invite you to join us in this exciting journey as we innovate, grow, and make renting smarter and more efficient for everyone.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}