import React from 'react';
import { Shield, Lightbulb, Users, Clock, Scale } from 'lucide-react';

export default function ValuesSection() {
    const values = [
        {
            icon: <Shield className="h-8 w-8" />,
            title: "Trust",
            description: "We believe trust is the cornerstone of every successful transaction. From verified machine owners to transparent rental agreements, we work hard to create a platform where everyone feels secure."
        },
        {
            icon: <Lightbulb className="h-8 w-8" />,
            title: "Innovation",
            description: "The world is changing fast, and so are we. Whether it's integrating verified machine checks or enhancing our user interface, innovation drives us to make RentItUp better every day."
        },
        {
            icon: <Users className="h-8 w-8" />,
            title: "Community",
            description: "We're not just a platform; we're a network of individuals and businesses working together. By connecting local renters with machine owners, we foster relationships that benefit everyone."
        },
        {
            icon: <Clock className="h-8 w-8" />,
            title: "Efficiency",
            description: "Time is money, and we respect both. Our platform is designed to streamline the rental process, saving our users valuable time while maximizing their investment."
        },
        {
            icon: <Scale className="h-8 w-8" />,
            title: "Accountability",
            description: "Mistakes happen, but what matters is how we handle them. Our dispute resolution system ensures that every issue is addressed fairly and swiftly."
        }
    ];

    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    {/* Values Header */}
                    <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
                        Our Values
                    </h2>
                    <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12">
                        Our values are the foundation of everything we do
                    </p>

                    {/* Values Grid */}
                    <div className="space-y-8">
                        {values.map((value, index) => (
                            <div 
                                key={value.title}
                                className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg text-orange-500">
                                            {value.icon}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                            {value.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            {value.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}