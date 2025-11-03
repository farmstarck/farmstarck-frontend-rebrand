"use client"
import Head from "next/head";
import Containers from "@/components/common/Marketing/Become a Partner/Containers";
import GenericHero from "@/components/common/GenericHero";
import Ready from "@/components/common/Marketing/Become a Partner/Ready";
import OurPartner from "@/components/common/Marketing/Become a Partner/OurPartner";

const BecomeAPartner = () => {
  return (
    <>
      <Head>
        <title>Farmstarck Become a Partner - Collaborate for Sustainable Agriculture</title>
        <meta name="description" content="Become a Farmstarck partner and collaborate for a sustainable agricultural future in Nigeria. Join government agencies, NGOs, and institutions in transforming agriculture." />
        <meta name="keywords" content="become partner Farmstarck, agricultural partnerships Nigeria, sustainable agriculture collaboration, NGO partnerships, government partnerships Farmstarck, agricultural ecosystem" />
        <meta name="author" content="Farmstarck" />
        <meta property="og:title" content="Farmstarck Become a Partner - Collaborate for Sustainable Agriculture" />
        <meta property="og:description" content="Become a Farmstarck partner and collaborate for a sustainable agricultural future in Nigeria. Join government agencies, NGOs, and institutions in transforming agriculture." />
        <meta property="og:image" content="/assets/images/partner-hero.png" />
        <meta property="og:url" content="https://farmstarck.com/marketing/becomepartner" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Farmstarck Become a Partner - Collaborate for Sustainable Agriculture" />
        <meta name="twitter:description" content="Become a Farmstarck partner and collaborate for a sustainable agricultural future in Nigeria. Join government agencies, NGOs, and institutions in transforming agriculture." />
        <meta name="twitter:image" content="/assets/images/partner-hero.png" />
        <link rel="canonical" href="https://farmstarck.com/marketing/becomepartner" />
      </Head>
      <div>
      <GenericHero
        header="Become our partner"
        paragraph="Collaborating for a Sustainable Agricultural Future"
      />
      <div className=" py-6 md:py-10">
        <div className="max-w-3xl m-auto flex flex-col gap-20 justify-between items-center md:items-start">
          <p className="text-center text-grey-700 text-xs  md:text-start md:text-sm w-full md:w-5/6">
            At Farmstark, we believe in the power of collaboration. Our
            partnerships with government agencies, NGOs, financial institutions,
            and other organizations enable us to create a more robust and
            sustainable agricultural ecosystem. Together, we're transforming
            agriculture in Nigeria and Africa.
          </p>
        </div>
        <Containers />
        <OurPartner />
        <Ready />
      </div>
    </div>
    </>
  );
};

export default BecomeAPartner;
