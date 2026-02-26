import Head from "next/head";
import Faq from "@/components/Home/Faq";
import Foodvault from "@/components/Home/Foodvault";
import HeroSection from "@/components/Home/HeroSection";
import Market from "@/components/Home/Market";
import Procurement from "@/components/Home/Procurement";
import Testimonials from "@/components/Home/Testimonials";

export default function Home() {
  return (
    <>
      <Head>
        <title>
          Farmstarck - Africa&apos;s Leading Agri-Commerce Ecosystem
        </title>
        <meta
          name="description"
          content="Empower farmers and merchants with tools, access, and opportunities that increase productivity, market reach, and profitability through agriculture."
        />
        <meta
          name="keywords"
          content="climate-smart agriculture Africa, AgriTech platform Nigeria, sustainable agriculture ecosystem, precision farming technology, digital agriculture platform, agricultural transformation Africa, farm-to-table supply chain, food security solutions, agricultural marketplace Nigeria, smallholder farmer empowerment, agricultural fintech platform, carbon-neutral farming, IoT farming solutions, agricultural e-commerce Nigeria, blockchain agriculture platform, mobile banking farmers, agricultural supply chain optimization, regenerative agriculture practices, AI agriculture solutions, remote sensing agriculture, variable rate technology, ESG agricultural investments, impact investing agriculture, pan-African agriculture network, food traceability platform, smart irrigation systems, vertical farming technology, organic farming marketplace, agricultural data analytics, drone farming Nigeria, satellite crop monitoring, soil health monitoring, agricultural robotics platform, integrated agriculture solution, comprehensive farming ecosystem, end-to-end agriculture platform, agriculture super app"
        />
        <meta name="author" content="Farmstarck" />
        <meta
          property="og:title"
          content="Farmstarck - Africa's Leading Agri-Commerce Ecosystem"
        />
        <meta
          property="og:description"
          content="Empower farmers and merchants with tools, access, and opportunities that increase productivity, market reach, and profitability through agriculture."
        />
        <meta property="og:image" content="/assets/images/hero-bg.png" />
        <meta property="og:url" content="https://farmstarck.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Farmstarck - Africa's Leading Agri-Commerce Ecosystem"
        />
        <meta
          name="twitter:description"
          content="Empower farmers and merchants with tools, access, and opportunities that increase productivity, market reach, and profitability through agriculture."
        />
        <meta name="twitter:image" content="/assets/images/hero-bg.png" />
        <link rel="canonical" href="https://farmstarck.com" />
      </Head>
      <div>
        <HeroSection />
        <Market />
        <Foodvault />
        <Procurement />
        <Testimonials />
        <Faq />
      </div>
    </>
  );
}
