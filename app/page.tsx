import Image from "next/image";
import HeroSection from "./ui/HomePage/heroSection";
import CategoriesSection from "./ui/HomePage/categorySection";
import HowItWorksSection from "./ui/HomePage/howItWorks";
import FeaturedEquipment from "./ui/HomePage/featuredEquipment";
import TestimonialsSection from "./ui/HomePage/testimonialSection";
import FAQSection from "./ui/HomePage/faqSection";
import ContactSection from "./ui/HomePage/contactus";

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
