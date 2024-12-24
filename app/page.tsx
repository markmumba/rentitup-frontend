import Image from "next/image";
import HeroSection from "@/components/custom-ui/homepage/heroSection";
import CategoriesSection from "@/components/custom-ui/homepage/categorySection";
import HowItWorksSection from "@/components/custom-ui/homepage/howItWorks";
import FeaturedEquipment from "@/components/custom-ui/homepage/featuredEquipment";
import TestimonialsSection from "@/components/custom-ui/homepage/testimonialSection";
import FAQSection from "@/components/custom-ui/homepage/faqSection";
import ContactSection from "@/components/custom-ui/homepage/contactus";

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
