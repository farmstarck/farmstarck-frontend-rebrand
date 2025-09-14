import GenericHero from "../../components/common/GenericHero";
import Intro from "../../components/marketing/Investement Opportunity/Intro";
import Features from "../../components/marketing/Investement Opportunity/Features";
import Ready from "../../components/marketing/Investement Opportunity/Ready";

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
