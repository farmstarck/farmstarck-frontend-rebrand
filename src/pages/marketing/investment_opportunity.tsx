import Head from "next/head";
import Intro from "@/components/common/Marketing/Investement Opportunity/Intro";
import GenericHero from "../../components/common/GenericHero";
import Features from "@/components/common/Marketing/Investement Opportunity/Features";
import Ready from "@/components/common/Marketing/Investement Opportunity/Ready";

const InvestmentOpportunity = () => {
  return (
    <>
      <Head>
        <title>Farmstarck Investment Opportunities - Invest in Agriculture Nigeria</title>
        <meta name="description" content="Explore investment opportunities in Farmstarck's agricultural platform. Discover potential returns, manage risks, and be part of Nigeria's agricultural revolution with our intuitive investment dashboard." />
        <meta name="keywords" content="investment opportunities Nigeria Africa, agricultural investments platform, Farmstarck investments program, agribusiness funding opportunities, agricultural returns dashboard, investment dashboard Nigeria app, farm investment platform technology, farming investment opportunities, agricultural investment returns, farm investment dashboard, agricultural funding platform, farming returns calculator, agricultural investment risks, farm investment management, agricultural portfolio dashboard, farming investment analytics, agricultural investment tracking, farm investment reporting, agricultural investment diversification, farming investment strategy, agricultural investment education, farm investment community, agricultural investment network, farming investment partnerships, agricultural investment innovation, farm investment technology, agricultural investment automation, farming investment AI, agricultural investment blockchain, farm investment fintech, agricultural investment app, farming investment platform, agricultural investment ecosystem, farm investment network, agricultural investment partnerships, farming investment expansion, agricultural investment adoption, farm investment engagement, agricultural investment retention, farming investment monetization, agricultural investment sustainability, farm investment impact" />
        <meta name="author" content="Farmstarck" />
        <meta property="og:title" content="Farmstarck Investment Opportunities - Invest in Agriculture Nigeria" />
        <meta property="og:description" content="Explore investment opportunities in Farmstarck's agricultural platform. Discover potential returns, manage risks, and be part of Nigeria's agricultural revolution with our intuitive investment dashboard." />
        <meta property="og:image" content="/assets/images/investment-hero.png" />
        <meta property="og:url" content="https://farmstarck.com/marketing/investment_opportunity" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Farmstarck Investment Opportunities - Invest in Agriculture Nigeria" />
        <meta name="twitter:description" content="Explore investment opportunities in Farmstarck's agricultural platform. Discover potential returns, manage risks, and be part of Nigeria's agricultural revolution with our intuitive investment dashboard." />
        <meta name="twitter:image" content="/assets/images/investment-hero.png" />
        <link rel="canonical" href="https://farmstarck.com/marketing/investment_opportunity" />
      </Head>
      <div>
      <GenericHero
        header="Investment Opportunity"
        paragraph="Discover how you can be part of the agricultural revolution with Farmstark. Explore various investment opportunities, understand potential returns, and manage your risks effectively. Our intuitive dashboard keeps you informed about your investments every step of the way."
      />
      <Intro />
      <Features />
      <Ready />
    </div>
    </>
  );
};

export default InvestmentOpportunity;
