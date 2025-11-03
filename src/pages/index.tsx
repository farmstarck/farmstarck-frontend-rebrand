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
        <title>Farmstarck - Africa's Leading Agri-Commerce Ecosystem</title>
        <meta name="description" content="Empower farmers and merchants with tools, access, and opportunities that increase productivity, market reach, and profitability through agriculture." />
        <meta name="keywords" content="agriculture, farming, marketplace, procurement, food vault, investment, Nigeria, Africa, farmers, merchants" />
        <meta name="author" content="Farmstarck" />
        <meta property="og:title" content="Farmstarck - Africa's Leading Agri-Commerce Ecosystem" />
        <meta property="og:description" content="Empower farmers and merchants with tools, access, and opportunities that increase productivity, market reach, and profitability through agriculture." />
        <meta property="og:image" content="/assets/images/hero-bg.png" />
        <meta property="og:url" content="https://farmstarck.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Farmstarck - Africa's Leading Agri-Commerce Ecosystem" />
        <meta name="twitter:description" content="Empower farmers and merchants with tools, access, and opportunities that increase productivity, market reach, and profitability through agriculture." />
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
