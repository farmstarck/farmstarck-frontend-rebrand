import HeroSection from "../../components/marketing/Home/HeroSection";
import Market from "../../components/marketing/Home/Market";
import Foodvault from "../../components/marketing/Home/Foodvault";
import Procurement from "../../components/marketing/Home/Procurement";
import Testimonials from "../../components/marketing/Home/Testimonials";
import Faq from "../../components/marketing/Home/Faq";

const accordionItems = [
  {
    header: "What is Farmstarck?",
    text: "Farmstarck is an agri-tech platform that connects farmers, merchants, businesses, and consumers through a digital marketplace, smart savings wallet (Food Vault), AI-powered inventory tools, procurement services, and investment opportunities.",
  },
  {
    header: "Who can use Farmstarck?",
    text: "Farmers, agro-merchants, processors, restaurants, caterers, retailers, and even everyday consumers looking for quality food and agri-products can use Farmstarck.",
  },
  {
    header: "How do I register?",
    text: "Sign up on our website or mobile app. You’ll be onboarded based on whether you’re a farmer, merchant, consumer, or institutional buyer.",
  },
  {
    header: "Who can request procurement?",
    text: "Businesses, merchants, caterers, and organizations looking for large quantities of agricultural products can use this service.",
  },

  {
    header: "Who are the sellers on the platform?",
    text: "Sellers include verified farmers, cooperatives, and agro-merchants who list high-quality goods for retail and wholesale.",
  },
];

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <Market />
      <Foodvault />
      <Procurement />
      <Testimonials />
      <Faq accordionItems={accordionItems} />
    </div>
  );
};

export default HomePage;
