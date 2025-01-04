import CategoriesSection from "@/components/customui/homepage/categorysection";
import ContactSection from "@/components/customui/homepage/contactus";
import FAQSection from "@/components/customui/homepage/faqsection";
import FeaturedEquipment from "@/components/customui/homepage/featuredequipments";
import ModernHeroSection from "@/components/customui/homepage/homeherosection";
import HowItWorksSection from "@/components/customui/homepage/howitworks";
import TestimonialsSection from "@/components/customui/homepage/testimonial";

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
