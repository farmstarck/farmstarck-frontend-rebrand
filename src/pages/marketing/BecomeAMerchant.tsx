import GenericHero from "../../components/common/GenericHero";
import StepByStep from "../../components/marketing/Become a Merchant/StepByStep";
import Benefits from "../../components/marketing/Become a Merchant/Benefits";
import Features from "../../components/marketing/Become a Merchant/Features";
import Listing from "../../components/marketing/Become a Merchant/Listing";
import Ready from "../../components/marketing/Become a Merchant/Ready";

const BecomeAMerchant = () => {
  return (
    <div>
      <GenericHero
        header="Become our merchant"
        paragraph="Join Farmstark and connect with a vast network of farmers and consumers. Whether you're a retailer or a wholesaler, our platform offers you the tools and support to grow your business and reach new markets."
      />
      <StepByStep />
      <Benefits />
      <Features />
      <Listing />
      <Ready />
    </div>
  );
};

export default BecomeAMerchant;
