import Image from "next/image";
import HeroSection from "@/components/custom-ui/HomePage/heroSection";
import CategoriesSection from "@/components/custom-ui/HomePage/categorySection";
import HowItWorksSection from "@/components/custom-ui/HomePage/howItWorks";
import FeaturedEquipment from "@/components/custom-ui/HomePage/featuredEquipment";
import TestimonialsSection from "@/components/custom-ui/HomePage/testimonialSection";
import FAQSection from "@/components/custom-ui/HomePage/faqSection";
import ContactSection from "@/components/custom-ui/HomePage/contactus";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <HowItWorksSection />
      <FeaturedEquipment />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
    </>
  );
}
