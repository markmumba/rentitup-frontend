'use client';
import React from 'react';
import { Timer, Shield, Star, Target, Users, Workflow, LucideIcon } from 'lucide-react';

// Define types for our feature card props
interface FeatureCardProps {
    Icon: LucideIcon;  // LucideIcon type ensures we only use valid Lucide icons
    title: string;
    description: string;
}

// Define our feature data structure
interface Feature {
    Icon: LucideIcon;
    title: string;
    description: string;
}

// Create a type-safe array of features
const features: Feature[] = [
    {
        Icon: Timer,
        title: "Real-time Availability",
        description: "Instant equipment access"
    },
    {
        Icon: Shield,
        title: "Secure Payments",
        description: "Protected transactions"
    },
    {
        Icon: Star,
        title: "Reliable Ratings",
        description: "Community-driven trust"
    },
    {
        Icon: Users,
        title: "Community Focus",
        description: "Built for collaboration"
    },
    {
        Icon: Workflow,
        title: "Streamlined Process",
        description: "Effortless rentals"
    },
    {
        Icon: Target,
        title: "Targeted Solutions",
        description: "Right tool, right time"
    }
];

// Type-safe Feature Card component
const FeatureCard: React.FC<FeatureCardProps> = ({ Icon, title, description }) => {
    return (
        <div className="group flex flex-col items-center p-6 bg-white dark:bg-gray-900 rounded-lg 
                        transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-4 transform transition-transform duration-300 group-hover:scale-110">
                <Icon className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {title}
            </h3>
            <p className="text-sm text-center text-gray-600 dark:text-gray-300">
                {description}
            </p>
        </div>
    );
};

export default function MissionSection(): JSX.Element {
    return (
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    {/* Mission Header with subtle animation */}
                    <div className="text-center space-y-4 mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white 
                                     opacity-0 animate-fade-in">
                            Our Mission
                        </h2>
                        
                        {/* Animated decorative line */}
                        <div className="flex justify-center">
                            <div className="h-1 w-24 bg-orange-500 rounded-full 
                                         opacity-0 animate-scale-x"></div>
                        </div>
                    </div>
                    
                    {/* Mission Statement with floating effect */}
                    <div className="relative mb-16 opacity-0 animate-fade-in-delay-1">
                        <div className="absolute inset-0 bg-orange-500 opacity-5 rounded-xl transform rotate-1"></div>
                        <div className="relative bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm">
                            <Target className="w-8 h-8 text-orange-500 mx-auto mb-4" />
                            <p className="text-xl text-gray-900 dark:text-white text-center">
                                "To revolutionize the machinery rental industry by creating a seamless and trustworthy platform that empowers people to achieve their goals, one machine at a time."
                            </p>
                        </div>
                    </div>

                    {/* Feature Grid with hover effects */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-0 animate-fade-in-delay-2">
                        {features.map((feature, index) => (
                            <FeatureCard
                                key={index}
                                Icon={feature.Icon}
                                title={feature.title}
                                description={feature.description}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes scale-x {
                    from { 
                        transform: scaleX(0);
                        opacity: 0;
                    }
                    to { 
                        transform: scaleX(1);
                        opacity: 1;
                    }
                }

                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .animate-scale-x {
                    animation: scale-x 1s forwards 0.5s;
                }

                .animate-fade-in {
                    animation: fade-in 1s forwards;
                }

                .animate-fade-in-delay-1 {
                    animation: fade-in 1s forwards 0.5s;
                }

                .animate-fade-in-delay-2 {
                    animation: fade-in 1s forwards 1s;
                }
            `}</style>
        </section>
    );
}