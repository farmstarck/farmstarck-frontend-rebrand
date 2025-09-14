import GenericHero from "../../components/common/GenericHero";
import Intro from "../../components/marketing/Farm Funding/Intro";
import Features from "../../components/marketing/Farm Funding/Features";
import Inspired from "../../components/marketing/Farm Funding/Inspired";
import Ready from "../../components/marketing/Farm Funding/Ready";
const FarmFundingPage = () => {
  return (
    <div>
      <GenericHero
        header="Farm funding"
        paragraph="Farmstark is committed to supporting farmers by providing financial solutions that help you grow and sustain your agricultural business. Learn about our funding opportunities, how to qualify, and hear from farmers who have successfully leveraged our resources."
      />
      <Intro />
      <Features />
      <Inspired />
      <Ready />
    </div>
  );
};

export default FarmFundingPage;
