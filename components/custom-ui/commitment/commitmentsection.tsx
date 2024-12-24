'use client';
import React, { ReactNode, useState } from 'react';
import { Shield, ClipboardCheck, MessageSquare, Scale, BadgeCheck, Check } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import Link from 'next/link';

interface TimelineItemProps {
    title: string;
    description: string;
    detailedContent: ReactNode;
    icon: ReactNode;
    isLeft: boolean;
}

interface CommitmentItem {
    title: string;
    description: string;
    icon: ReactNode;
    detailedContent: ReactNode;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
    title,
    description,
    detailedContent,
    icon,
    isLeft
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const containerClass = isLeft ? 'flex-row' : 'flex-row-reverse';
    const cardClass = isLeft ? 'mr-12' : 'ml-12';
    const lineClass = isLeft ? 'right-12' : 'left-12';

    return (
        <>
            <div className={`flex ${containerClass} items-center opacity-0 animate-fade-in`}>
                {/* Content Card */}
                <div className={`w-[calc(50%-3rem)] ${cardClass} group`}>
                    <div
                        onClick={() => setIsModalOpen(true)}
                        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm cursor-pointer
                                 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="text-orange-500">{icon}</div>
                            <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h4>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">{description}</p>
                    </div>
                </div>

                {/* Checkpoint */}
                <div className="relative h-full">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center
                                transform transition-transform duration-300 group-hover:scale-110">
                        <Check className="w-6 h-6 text-white" />
                    </div>
                    {/* Connecting Line */}
                    <div className={`absolute top-1/2 w-12 h-px bg-orange-500 ${lineClass}`} />
                </div>
            </div>

            {/* Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-4 text-2xl">
                            <div className="text-orange-500">{icon}</div>
                            {title}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                        {detailedContent}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

const CommitmentPage: React.FC = () => {
    const verificationListItems = [
        {
            title: "Proof of Maintenance",
            description: "Machine owners are required to provide evidence of regular maintenance, such as service logs or inspection certificates."
        },
        {
            title: "Detailed Listings",
            description: "Owners must upload clear photos and accurate descriptions of their machinery, including specifications, features, and condition."
        },
        {
            title: "Verified Machine Condition Checks",
            description: "Our team will periodically inspect machines to confirm their functionality and safety."
        }
    ];

    const feedbackFeatures = [
        {
            icon: <BadgeCheck className="h-5 w-5 text-orange-500 mt-1" />,
            text: "Rate and review machines and owners after every rental"
        },
        {
            icon: <BadgeCheck className="h-5 w-5 text-orange-500 mt-1" />,
            text: "'Top Rated' badges for consistently high-rated machines and owners"
        },
        {
            icon: <BadgeCheck className="h-5 w-5 text-orange-500 mt-1" />,
            text: "Public reviews for complete transparency"
        }
    ];

    const coverageItems = [
        { text: "Accidental damage" },
        { text: "Theft protection" },
        { text: "Loss during rental period" }
    ];

    const commitmentItems: CommitmentItem[] = [
        {
            title: "Machine Verification Process",
            description: "Every machine undergoes a rigorous verification process before being approved.",
            icon: <ClipboardCheck className="w-6 h-6" />,
            detailedContent: (
                <div className="space-y-4">
                    <p className="text-gray-600 dark:text-gray-300">
                        Every machine listed on RentItUp undergoes a rigorous verification process before being approved:
                    </p>
                    <ul className="space-y-4">
                        {verificationListItems.map((item, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-500 mt-2" />
                                <span className="text-gray-600 dark:text-gray-300">
                                    <strong>{item.title}:</strong> {item.description}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        },
        {
            title: "Customer Feedback System",
            description: "Rate and review machines after every rental with our comprehensive feedback system.",
            icon: <MessageSquare className="w-6 h-6" />,
            detailedContent: (
                <div className="space-y-6">
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">Your Voice Matters</h4>
                        <ul className="space-y-4">
                            {feedbackFeatures.map((feature, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    {feature.icon}
                                    <span>{feature.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">What Happens with Negative Feedback?</h4>
                        <p className="text-gray-600 dark:text-gray-300">
                            If an issue arises, our feedback system ensures that we address concerns promptly and fairly through our comprehensive dispute resolution process.
                        </p>
                    </div>
                </div>
            )
        },
        {
            title: "Dispute Resolution",
            description: "Our comprehensive dispute resolution process ensures all concerns are addressed promptly and fairly.",
            icon: <Scale className="w-6 h-6" />,
            detailedContent: (
                <div className="space-y-4">
                    <p className="text-gray-600 dark:text-gray-300">
                        Our dispute resolution process is designed to be fair, transparent, and efficient:
                    </p>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <BadgeCheck className="h-5 w-5 text-orange-500 mt-1" />
                            <span>Immediate response to all reported issues</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <BadgeCheck className="h-5 w-5 text-orange-500 mt-1" />
                            <span>Fair mediation between parties</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <BadgeCheck className="h-5 w-5 text-orange-500 mt-1" />
                            <span>Clear resolution timeline and process</span>
                        </li>
                    </ul>
                </div>
            )
        },
        {
            title: "Insurance Options",
            description: "Optional insurance coverage for complete peace of mind during rentals.",
            icon: <Shield className="w-6 h-6" />,
            detailedContent: (
                <div className="space-y-6">
                    <p className="text-gray-600 dark:text-gray-300">
                        We&apos;ve partnered with trusted insurance providers to offer optional coverage for renters and owners.
                    </p>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h5 className="font-semibold">What&apos;s Covered</h5>
                            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                {coverageItems.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <BadgeCheck className="h-5 w-5 text-orange-500 mt-1" />
                                        <span>{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h5 className="font-semibold">How It Works</h5>
                            <p className="text-gray-600 dark:text-gray-300">
                                Choose your preferred insurance option when booking or listing a machine for complete peace of mind.
                            </p>
                        </div>
                    </div>
                </div>
            )
        }
    ];

    return (
        <div className="bg-gradient-to-b from-orange-200 to-white dark:from-gray-900 dark:to-gray-800">
            {/* Hero Section */}
            <div className="relative bg-gray-900 text-white min-h-[90vh] flex items-center">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-gray-900/60" />
                <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-5xl md:text-6xl lg:text-5xl font-bold mb-6 opacity-0 animate-fade-in">
                            Our Commitment to Quality
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 opacity-0 animate-fade-in-delay-1">
                            At RentItUp, we&apos;ve built a comprehensive system to ensure reliability and trust in every rental experience.
                        </p>
                    </div>
                </div>
            </div>

            {/* Timeline Section */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                {/* Center Line */}
                <div className="absolute left-1/2 transform -translate-x-[0.5px] w-px h-full bg-orange-200 dark:bg-orange-800/30" />

                {/* Timeline Items */}
                <div className="relative space-y-24">
                    {commitmentItems.map((item, index) => (
                        <TimelineItem
                            key={index}
                            title={item.title}
                            description={item.description}
                            detailedContent={item.detailedContent}
                            icon={item.icon}
                            isLeft={index % 2 === 0}
                        />
                    ))}
                </div>
            </div>

            {/* Call to Action */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <h3 className="text-2xl font-bold mb-8 opacity-0 animate-fade-in">
                    Ready to experience reliable machinery rental?
                </h3>
                <div className="flex justify-center gap-4 opacity-0 animate-fade-in-delay-1">
                    <Link href="/register">
                        <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold 
                                   hover:bg-orange-600 transition-colors">
                            Sign Up Now
                        </button>
                    </Link>
                    <button className="border border-gray-300 dark:border-gray-600 px-6 py-3 rounded-lg 
                                   font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        Contact Us
                    </button>
                </div>
            </div>

            <style jsx global>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .animate-fade-in {
                    animation: fade-in 1s forwards;
                }

                .animate-fade-in-delay-1 {
                    animation: fade-in 1s forwards 0.3s;
                }
            `}</style>
        </div>
    );
};

export default CommitmentPage;