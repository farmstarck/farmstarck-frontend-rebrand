import GenericHero from "../../components/common/GenericHero";
import StepByStep from "../../components/marketing/Become a Farmer/StepByStep";
import Benefits from "../../components/marketing/Become a Farmer/Benefits";
import CustomTestimonial from "../../components/common/Testimonial";
import Insight from "../../components/marketing/Become a Farmer/Insight";
import Statistics from "../../components/common/Statistics";

const BecomeAFarmerPage = () => {
  return (
    <div>
      <GenericHero
        header="Become a farmer"
        paragraph="By joining us, you'll become part of a community committed to improving food security and strengthening the agricultural supply chain in Nigeria. Let’s grow together!"
      />
      <StepByStep />
      <Benefits />
      <div className="bg-secondary-light w-full px-5 py-10 my-20">
        <div className="relative w-full max-w-6xl m-auto mx-auto p-4">
          <CustomTestimonial
            header="Success stories"
            headerLeft={true}
            description="Read quotes and stories from fellow farmers about their achievements."
          />
        </div>
        <div className="relative w-full max-w-6xl m-auto mx-auto p-4">
          <Insight />
        </div>
      </div>
      <Statistics insight={true} />
    </div>
  );
};

export default BecomeAFarmerPage;
