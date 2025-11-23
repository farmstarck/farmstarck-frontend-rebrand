import Head from "next/head";
import { useEffect, useState } from "react";
import Image from "next/image";
import WhyUs from "@/components/common/WhyUs";
import HowItWorks from "@/components/common/HowItWorks";
import Faq from "@/components/Home/Faq";


export const ProcurementAccordionItems = [
  {
    header: "What is Farmstarck Procurement?",
    text: "It’s our service that helps source, transport, and deliver farm produce in bulk across Nigeria.",
  },
  {
    header: "Who is this service for?",
    text: "Retailers, food businesses, caterers, resellers, processors, exporters, and institutions.",
  },
  {
    header: "What crops do you procure?",
    text: "We handle tubers, grains, fruits, vegetables, and on-demand items like animal feed and agro-inputs.",
  },
  {
    header: "What’s the minimum order size?",
    text: "We typically start from 1 bag to full truckloads, depending on the crop and region.",
  },

  {
    header: "Can I get delivery to my doorstep?",
    text: "Yes. We handle end-to-end delivery to your specified address.",
  },
];

const whyUsIterms = [
  {
    img: '/assets/images/procure-why-1.png',
    header: "Institutional Supply",
    text: "Custom procurement solutions for restaurants, hotels, schools, and other institutions.",
  },
  {
    img: '/assets/images/procure-why-2.png',
    header: "Reliable Logistics",
    text: "Efficient transportation and delivery systems to ensure freshness and timeliness.",
  },
  {
    img: '/assets/images/procure-why-3.png',
    header: "Cost Effiency",
    text: "Optimize your spending with competitive pricing and volume discounts.",
  },
  {
    img: '/assets/images/procure-why-4.png',
    header: "Quality Assurance",
    text: "Rigorous quality control processes to ensure you receive only the best products.",
  },
];

const slideImages = [
  `/assets/images/procure-how.png`,
  `/assets/images/procure-how2.png`,
  `/assets/images/procure-how3.png`,
  `/assets/images/procure-how4.png`,
];

const busItems = [
  {
    img: '/assets/images/procure-bus1.png',
    title: "Food Manufacturing",
  },
  {
    img: `/assets/images/procure-bus2.png`,
    title: "Commercial",
  },
  {
    img: '/assets/images/procure-bus3.png',
    title: "Hotel",
  },
  {
    img: '/assets/images/procure-bus4.png',
    title: "Restaurant",
  },
];

const Procurement = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slideImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <Head>
        <title>Farmstarck Procurement Services - Bulk Farm Produce Sourcing</title>
        <meta name="description" content="Farmstarck procurement services for bulk sourcing, transportation, and delivery of farm produce across Nigeria. Reliable logistics, quality assurance, and competitive pricing for businesses." />
        <meta name="keywords" content="agricultural procurement services Nigeria Africa, bulk farm produce sourcing platform, farming logistics Nigeria Africa, farm produce delivery services Nigeria, institutional agricultural supply platform, food manufacturing procurement Nigeria, Farmstarck procurement solutions Africa, agricultural supply chain management Nigeria, farm produce transportation platform, bulk agricultural sourcing Nigeria, farming procurement platform Africa, agricultural logistics solutions Nigeria, farm produce supply chain platform, institutional procurement services Nigeria, food industry procurement Africa, agricultural bulk buying Nigeria, farming delivery services platform, agricultural procurement management Nigeria, farm produce logistics platform Africa, bulk procurement agriculture Nigeria, farming supply chain optimization platform, agricultural procurement technology Nigeria, farm produce sourcing solutions Africa, institutional agricultural procurement Nigeria, food manufacturing sourcing platform, agricultural procurement automation Nigeria, farming procurement analytics Africa, agricultural supply chain traceability Nigeria, farm produce procurement security platform, bulk agricultural procurement Nigeria, farming logistics management Africa, agricultural procurement scalability Nigeria, farm produce sourcing innovation platform, agricultural procurement partnerships Nigeria, farming procurement expansion Africa, agricultural procurement adoption Nigeria, farm produce procurement engagement platform, agricultural procurement retention Nigeria, farming procurement monetization Africa, agricultural procurement sustainability Nigeria, farm produce procurement impact platform" />
        <meta name="author" content="Farmstarck" />
        <meta property="og:title" content="Farmstarck Procurement Services - Bulk Farm Produce Sourcing" />
        <meta property="og:description" content="Farmstarck procurement services for bulk sourcing, transportation, and delivery of farm produce across Nigeria. Reliable logistics, quality assurance, and competitive pricing for businesses." />
        <meta property="og:image" content="/assets/images/landing-procurement.png" />
        <meta property="og:url" content="https://farmstarck.com/marketing/procurement" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Farmstarck Procurement Services - Bulk Farm Produce Sourcing" />
        <meta name="twitter:description" content="Farmstarck procurement services for bulk sourcing, transportation, and delivery of farm produce across Nigeria. Reliable logistics, quality assurance, and competitive pricing for businesses." />
        <meta name="twitter:image" content="/assets/images/landing-procurement.png" />
        <link rel="canonical" href="https://farmstarck.com/marketing/procurement" />
      </Head>
      <div className="flex flex-col">
      <div className="bg-[var(--lite)] ">
        <div className="p-5 relative flex flex-col justify-center items-center ">
          <div className="w-full flex flex-col gap-3 md:gap-5 items-center ">
            <h2 className="uppercase text-sm md:text-base text-center text-[var(--dark-green)] font-subHeading leading-relaxed">
              our product
            </h2>
            <h1 className="font-subHeading text-2xl md:text-4xl text-[var(--dark-green)] font-extrabold">
              Procurement Services
            </h1>
          </div>
          <div className="w-full max-w-5xl m-auto space-y-8 flex flex-col items-center">
            <Image
              height={800}
              width={800}
              src={`/assets/images/landing-procurement.png`}
              alt="market-img"
              className="object-contain w-full h-auto min-w-[350px]"
            />
            <div className="w-full flex flex-col items-center gap-3 md:gap-7 md:w-5/6 m-auto pb-8 px-4">
              <p className="text-sm font-subHeading2 text-[var(--dark-primary)] sm:text-base md:text-lg text-center">
                From field to facility, get reliable access to high-quality
                produce, transparent pricing, and scalable supply on your terms.
              </p>
              <button className="px-12 cursor-pointer self-auto text-center py-2  md:py-4 md:px-28 bg-[var(--primary)] text-white text-base rounded-full font-btnBody transition-all duration-300 hover:bg-white hover:text-[var(--primary)]">
                Request a Quote
              </button>
            </div>
          </div>
        </div>
        <div className="px-5 py-10 md:py-20 relative flex flex-col justify-center items-center ">
          <div className="w-full flex flex-col gap-3 md:gap-5 items-center ">
            <h1 className="font-subHeading text-2xl md:text-3xl text-[var(--dark-primary)] font-extrabold">
              Why Us?
            </h1>
          </div>
          <div className="w-full max-w-5xl m-auto space-y-8 flex flex-col items-center">
            <p className="text-sm font-subHeading2 sm:text-base md:text-lg text-center">
              We help businesses of all sizes optimize their agricultural supply
              chains, reduce costs, and ensure consistent quality.
            </p>
            <div className="grid grid-cols-2 w-full gap-y-5  md:gap-y-10 gap-x-3 md:gap-x-16  justify-center items-stretch">
              {whyUsIterms.map((item, i) => {
                return (
                  <WhyUs
                    key={i}
                    img={item.img}
                    header={item.header}
                    text={item.text}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="p-5 py-10 md:py-20 relative flex flex-col justify-center items-center ">
          <div className="w-full flex flex-col gap-3 md:gap-5 items-center ">
            <h1 className="font-subHeading text-2xl md:text-3xl text-[var(--dark-primary)] font-extrabold">
              How it Works
            </h1>
          </div>
          <div className="w-full max-w-5xl m-auto space-y-8 flex flex-col items-center">
            <p className="text-sm font-subHeading2 sm:text-base md:text-lg text-center">
              Our streamlined process makes procurement simple and efficient
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-y-5 md:gap-y-10 gap-x-3 md:gap-x-16 items-center">
              <HowItWorks />

              <div className="flex justify-center md:justify-end px-5">
                <div className="relative w-[330px] md:w-[400px] overflow-hidden rounded-lg">
                  <div
                    className="flex transition-transform duration-1000 ease-in-out"
                    style={{
                      transform: `translateX(-${currentIndex * 100}%)`,
                    }}
                  >
                    {slideImages.map((src, idx) => (
                      <Image
                        width={500}
                        height={500}
                        key={idx}
                        src={src}
                        alt={`Slide ${idx + 1}`}
                        className="w-full flex-shrink-0 object-cover"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-5 py-10 md:py-20 relative flex flex-col justify-center items-center ">
          <div className="p-5 py-10 md:py-20 w-full max-w-6xl m-auto flex flex-col gap-5 md:gap-10 justify-between items-center bg-[var(--dark-green)] rounded-2xl px-5 md:px-10">
            <div className="w-full flex flex-col gap-3 md:gap-5 items-center md:w-1/2">
              <h1 className="font-subHeading text-2xl md:text-3xl text-center text-white font-extrabold">
                What <span className="text-[var(--primary)]">business</span> are
                you in ?
              </h1>

              <p className="text-sm font-subHeading2 text-white sm:text-base md:text-lg text-center">
                Farmstarck Procurement gives your business direct access to
                verified farm produce. Make bulk orders, track deliveries, and
                source with confidence. All in one place.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-y-5 md:gap-y-10 gap-x-3 md:gap-x-16 items-center">
              {busItems.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-3 md:gap-5 items-center"
                >
                  <Image
                    src={item.img}
                    height={500}
                    width={500}
                    alt={item.title}
                    className="object-contain  md:w-full h-auto "
                  />
                  <p className="text-sm font-subHeading2 text-white sm:text-base text-center">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
            <button className="px-12 cursor-pointer self-auto text-center py-2  md:py-4 md:px-28 bg-[var(--primary)] text-white text-base rounded-full font-btnBody transition-all duration-300 hover:bg-white hover:text-[var(--primary)]">
              Request a Quote
            </button>
          </div>
        </div>
      </div>
      <Faq  accordionItems={ProcurementAccordionItems} />
    </div>
    </>
  );
};

export default Procurement;
