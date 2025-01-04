import AboutHeroSection from "@/components/customui/aboutpage/aboutherosection";
import FuturePlansSection from "@/components/customui/aboutpage/futureplans";
import MissionSection from "@/components/customui/aboutpage/mission";
import ValuesSection from "@/components/customui/aboutpage/ourvalues";
import VisionSection from "@/components/customui/aboutpage/vision";
import ContactSection from "@/components/customui/homepage/contactus";



export default function AboutPage() {
    return (
        <>
            <AboutHeroSection />
            <MissionSection />
            <VisionSection />
            <ValuesSection />
            <FuturePlansSection />
            <ContactSection />
        </>
    )
}