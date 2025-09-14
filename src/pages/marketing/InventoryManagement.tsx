import GenericHero from "../../components/common/GenericHero";
import Intro from "../../components/marketing/Inventory Management/Intro";
import Features from "../../components/marketing/Inventory Management/Features";
import Pricing from "../../components/marketing/Inventory Management/Pricing";
import CustomTestimonial from "../../components/common/Testimonial";
import Contact from "../../components/marketing/Inventory Management/Contact";

const InventoryManagementPage = () => {
  return (
    <div>
      <GenericHero
        header="Inventory Management"
        paragraph="Our platform simplifies your inventory management by tracking stock levels, automating reports, and offering real-time insights to optimize your resources and increase productivity. Manage your produce from farm to market with ease.
        "
      />
      <Intro />
      <Features />
      <Pricing />
      <div className="bg-secondary-light w-full px-5 py-10">
        <div className="relative w-full max-w-6xl m-auto mx-auto p-4">
          <CustomTestimonial header="What our users say" />
        </div>
      </div>
      <Contact />
    </div>
  );
};

export default InventoryManagementPage;
