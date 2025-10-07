import Faq from "@/components/Home/Faq";
import Foodvault from "@/components/Home/Foodvault";
import HeroSection from "@/components/Home/HeroSection";
import Market from "@/components/Home/Market";
import Procurement from "@/components/Home/Procurement";
import Testimonials from "@/components/Home/Testimonials";


export default function Home() {
  return (
    <div>
      <HeroSection />
      <Market />
      <Foodvault />
      <Procurement />
      <Testimonials />
      <Faq />
    </div>
  );
}
