import CategoriesSection from "@/components/custom-ui/homepage/categorySection";
import ContactSection from "@/components/custom-ui/homepage/contactus";
import FAQSection from "@/components/custom-ui/homepage/faqSection";
import FeaturedEquipment from "@/components/custom-ui/homepage/featuredequipments";
import ModernHeroSection from "@/components/custom-ui/homepage/homeherosection";
import HowItWorksSection from "@/components/custom-ui/homepage/howItWorks";
import TestimonialsSection from "@/components/custom-ui/homepage/testimonial";

export default function Home() {
  return (
    <>
      <ModernHeroSection />
      <CategoriesSection />
      <HowItWorksSection />
      <FeaturedEquipment />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
    </>
  );
}
