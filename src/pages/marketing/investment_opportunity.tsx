import Intro from "@/components/common/Marketing/Investement Opportunity/Intro";
import GenericHero from "../../components/common/GenericHero";
import Features from "@/components/common/Marketing/Investement Opportunity/Features";
import Ready from "@/components/common/Marketing/Investement Opportunity/Ready";

const InvestmentOpportunity = () => {
  return (
    <div>
      <GenericHero
        header="Investment Opportunity"
        paragraph="Discover how you can be part of the agricultural revolution with Farmstark. Explore various investment opportunities, understand potential returns, and manage your risks effectively. Our intuitive dashboard keeps you informed about your investments every step of the way."
      />
      <Intro />
      <Features />
      <Ready />
    </div>
  );
};

export default InvestmentOpportunity;
