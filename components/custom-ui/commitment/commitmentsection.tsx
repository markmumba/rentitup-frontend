import React, { ReactNode } from 'react';
import { Shield, ClipboardCheck, MessageSquare, Scale, Heart, BadgeCheck } from 'lucide-react';

interface SectionProps {
    title: string;
    children: ReactNode;
    className?: string;
}

interface VerificationListItem {
    title: string;
    description: string;
}

interface FeedbackFeature {
    icon: ReactNode;
    text: string;
}

interface CoverageItem {
    text: string;
}

const Section: React.FC<SectionProps> = ({ title, children, className = "" }) => (
    <div className={`py-8 ${className}`}>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{title}</h3>
        {children}
    </div>
);

const CommitmentPage: React.FC = () => {
    const verificationItems: VerificationListItem[] = [
        {
            title: "Proof of Maintenance",
            description: "Machine owners are required to provide evidence of regular maintenance, such as service logs or inspection certificates."
        },
        {
            title: "Detailed Listings",
            description: "Owners must upload clear photos and accurate descriptions of their machinery, including specifications, features, and condition."
        },
        {
            title: "Verified Machine Condition Checks (Coming Soon)",
            description: "Our team will periodically inspect machines to confirm their functionality and safety."
        }
    ];

    // Feedback system features
    const feedbackFeatures: FeedbackFeature[] = [
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

    // Insurance coverage items
    const coverageItems: CoverageItem[] = [
        { text: "Accidental damage" },
        { text: "Theft protection" },
        { text: "Loss during rental period" }
    ];

    return (
        <div className="bg-white dark:bg-gray-900">
            {/* Hero Section */}
            <div className="relative bg-gray-900 text-white">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-gray-900/60" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Our Commitment to Quality and Accountability
                    </h1>
                    <p className="text-xl text-gray-200 max-w-3xl">
                        At RentItUp, we understand that reliability and trust are the cornerstones of a successful rental experience. That's why we've built a comprehensive system to ensure the quality of machinery on our platform and hold all users accountable for their actions.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Machine Verification Process */}
                <Section title="Machine Verification Process">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <ClipboardCheck className="h-8 w-8 text-orange-500" />
                            <h4 className="text-xl font-semibold">Ensuring the Best Machines for Every Job</h4>
                        </div>
                        <div className="space-y-4">
                            <p className="text-gray-600 dark:text-gray-300">
                                Every machine listed on RentItUp undergoes a rigorous verification process before being approved:
                            </p>
                            <ul className="space-y-4 ml-6">
                                {verificationItems.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-500 mt-2" />
                                        <span className="text-gray-600 dark:text-gray-300">
                                            <strong>{item.title}:</strong> {item.description}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Section>

                {/* Customer Feedback System */}
                <Section title="Customer Feedback System">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <MessageSquare className="h-8 w-8 text-orange-500" />
                                <h4 className="text-xl font-semibold">Your Voice Matters</h4>
                            </div>
                            <ul className="space-y-4">
                                {feedbackFeatures.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        {feature.icon}
                                        <span>{feature.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <Scale className="h-8 w-8 text-orange-500" />
                                <h4 className="text-xl font-semibold">What Happens with Negative Feedback?</h4>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300">
                                If an issue arises, our feedback system ensures that we address concerns promptly and fairly through our comprehensive dispute resolution process.
                            </p>
                        </div>
                    </div>
                </Section>

                {/* Insurance Options */}
                <Section title="Insurance Options (Optional)">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Shield className="h-8 w-8 text-orange-500" />
                            <h4 className="text-xl font-semibold">Added Peace of Mind</h4>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            We've partnered with trusted insurance providers to offer optional coverage for renters and owners.
                        </p>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
                                <h5 className="font-semibold mb-3">What's Covered</h5>
                                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                    {coverageItems.map((item, index) => (
                                        <li key={index}>✓ {item.text}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
                                <h5 className="font-semibold mb-3">How It Works</h5>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Choose your preferred insurance option when booking or listing a machine for complete peace of mind.
                                </p>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Call to Action */}
                <div className="mt-12 text-center">
                    <h3 className="text-2xl font-bold mb-8">Ready to experience reliable machinery rental?</h3>
                    <div className="flex justify-center gap-4">
                        <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                            Sign Up Now
                        </button>
                        <button className="border border-gray-300 dark:border-gray-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            Contact Us
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommitmentPage;