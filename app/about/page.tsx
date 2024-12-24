import FuturePlansSection from "@/components/custom-ui/aboutpage/futureplans";
import AboutHeroSection from "@/components/custom-ui/aboutpage/herosection";
import MissionSection from "@/components/custom-ui/aboutpage/mission";
import ValuesSection from "@/components/custom-ui/aboutpage/ourvalues";
import VisionSection from "@/components/custom-ui/aboutpage/vision";
import ContactSection from "@/components/custom-ui/homepage/contactus";



export default function AboutPage() {
    return (
        <>
        <AboutHeroSection />
        <MissionSection />
        <VisionSection />
        <ValuesSection />
        <FuturePlansSection/>
        <ContactSection/>
        </>
    )
}