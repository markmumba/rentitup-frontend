import ContactSection from "@/components/custom-ui/homepage/contactus";
import FeaturedEquipment from "@/components/custom-ui/homepage/featuredequipments";
import ModernHeroSection from "@/components/custom-ui/homepage/homeherosection";
import TestimonialsSection from "@/components/custom-ui/homepage/testimonial";
import HowItWorksSection from "@/components/custom-ui/homepage/howitworks";
import CategoriesSection from "@/components/custom-ui/homepage/categorysection";
import FAQSection from "@/components/custom-ui/homepage/faqsection";

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
