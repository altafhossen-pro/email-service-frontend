import AboutSection from "@/components/Homepage/AboutSection/AboutSection";
import ContactSection from "@/components/Homepage/ContactSection/ContactSection";
import FeaturesSection from "@/components/Homepage/FeaturesSection/FeaturesSection";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import HeroSection from "@/components/Homepage/HeroSection/HeroSection";
import PricingSection from "@/components/Homepage/PricingSection/PricingSection";
import StatsSection from "@/components/Homepage/StatsSection/StatsSection";


export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <StatsSection />
      <AboutSection />
      <ContactSection />
      <Footer />

    </div>
  );
}
