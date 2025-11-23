import Head from "next/head";
import GenericHero from "@/components/common/GenericHero";
import CustomTestimonial from "../../components/common/Testimonial";
import Statistics from "../../components/common/Statistics";
import StepByStep from "@/components/common/Marketing/Become a Farmer/StepByStep";
import Benefits from "@/components/common/Marketing/Become a Farmer/Benefits";
import Insight from "@/components/common/Marketing/Become a Farmer/Insight";

const BecomeAFarmerPage = () => {
  return (
    <>
      <Head>
        <title>Farmstarck Become a Farmer - Join Our Agricultural Community</title>
        <meta name="description" content="Become a Farmstarck farmer and join our community committed to improving food security in Nigeria. Access farming insights, tools, and support to grow your agricultural business." />
        <meta name="keywords" content="become farmer Farmstarck, farm empowerment program Nigeria, agricultural training Africa, farming education platform, farmer onboarding Farmstarck, sustainable farming practices, climate-smart agriculture training, farm technology adoption, agricultural innovation education, farming best practices, agricultural extension services, farm advisory services, farming mentorship, agricultural capacity building, farm education platform, agricultural training programs, farming skill development, agricultural mentorship, farm advisory services, farming best practices, agricultural research, farm productivity enhancement, agricultural optimization, farming efficiency improvement, agricultural data analytics, farm monitoring, agricultural IoT, farming automation, agricultural robotics, drone farming, satellite agriculture, agricultural fintech, farm blockchain, agricultural AI, farming app development, agricultural platform engineer, farming ecosystem development, agricultural knowledge sharing, farm technology adoption, agricultural extension services, farming education platform, agricultural mentorship, farming best practices, agricultural research platform, farming innovation network, climate resilient agriculture, regenerative farming practices, agricultural sustainability goals, farming community builders, agricultural knowledge sharing, farm technology adoption, agricultural capacity building, farming education platform, agricultural training programs, farming skill development, agricultural mentorship, farm advisory services, farming best practices, agricultural research, farm productivity enhancement, agricultural optimization, farming efficiency improvement, agricultural data analytics, farm monitoring, agricultural IoT, farming automation, agricultural robotics, drone farming, satellite agriculture, agricultural fintech, farm blockchain, agricultural AI, farming app development, agricultural platform engineer" />
        <meta name="author" content="Farmstarck" />
        <meta property="og:title" content="Farmstarck Become a Farmer - Join Our Agricultural Community" />
        <meta property="og:description" content="Become a Farmstarck farmer and join our community committed to improving food security in Nigeria. Access farming insights, tools, and support to grow your agricultural business." />
        <meta property="og:image" content="/assets/images/farmer-hero.png" />
        <meta property="og:url" content="https://farmstarck.com/marketing/becomeafarmer" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Farmstarck Become a Farmer - Join Our Agricultural Community" />
        <meta name="twitter:description" content="Become a Farmstarck farmer and join our community committed to improving food security in Nigeria. Access farming insights, tools, and support to grow your agricultural business." />
        <meta name="twitter:image" content="/assets/images/farmer-hero.png" />
        <link rel="canonical" href="https://farmstarck.com/marketing/becomeafarmer" />
      </Head>
      <div>
      <GenericHero
        header="Become a farmer"
        paragraph="By joining us, you'll become part of a community committed to improving food security and strengthening the agricultural supply chain in Nigeria. Let’s grow together!"
      />
      <StepByStep />
      <Benefits />
      <div className=" w-full px-5 py-10 my-20">
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
    </>
  );
};

export default BecomeAFarmerPage;
