import ProcurementImg from "../../assets/images/landing-procurement.png";
import ProcureHowImg1 from "../../assets/images/procure-how.png";
import ProcureHowImg2 from "../../assets/images/procure-how2.png";
import ProcureHowImg3 from "../../assets/images/procure-how3.png";
import ProcureHowImg4 from "../../assets/images/procure-how4.png";
import WhyImg1 from "../../assets/images/procure-why-1.png";
import WhyImg2 from "../../assets/images/procure-why-2.png";
import WhyImg3 from "../../assets/images/procure-why-3.png";
import WhyImg4 from "../../assets/images/procure-why-4.png";
import ProcureBusmg1 from "../../assets/images/procure-bus1.png";
import ProcureBusmg2 from "../../assets/images/procure-bus2.png";
import ProcureBusmg3 from "../../assets/images/procure-bus3.png";
import ProcureBusmg4 from "../../assets/images/procure-bus4.png";
import Faq from "../../components/marketing/Home/Faq";
import WhyUs from "../../components/marketing/Procurement/WhyUs";
import HowItWorks from "../../components/marketing/Procurement/HowItWorks";
import { useEffect, useState } from "react";

const accordionItems = [
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
    img: WhyImg1,
    header: "Institutional Supply",
    text: "Custom procurement solutions for restaurants, hotels, schools, and other institutions.",
  },
  {
    img: WhyImg2,
    header: "Reliable Logistics",
    text: "Efficient transportation and delivery systems to ensure freshness and timeliness.",
  },
  {
    img: WhyImg3,
    header: "Cost Effiency",
    text: "Optimize your spending with competitive pricing and volume discounts.",
  },
  {
    img: WhyImg4,
    header: "Quality Assurance",
    text: "Rigorous quality control processes to ensure you receive only the best products.",
  },
];

const slideImages = [
  ProcureHowImg1,
  ProcureHowImg2,
  ProcureHowImg3,
  ProcureHowImg4,
];

const busItems = [
  {
    img: ProcureBusmg1,
    title: "Food Manufacturing",
  },
  {
    img: ProcureBusmg2,
    title: "Commercial",
  },
  {
    img: ProcureBusmg3,
    title: "Hotel",
  },
  {
    img: ProcureBusmg4,
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
    <div className="flex flex-col">
      <div className="bg-secondary-veryLight ">
        <div className="p-5 relative flex flex-col justify-center items-center ">
          <div className="w-full flex flex-col gap-3 md:gap-5 items-center ">
            <h2 className="uppercase text-sm md:text-base text-center text-secondary-veryDark font-subHeading leading-relaxed">
              our product
            </h2>
            <h1 className="font-subHeading text-2xl md:text-4xl text-secondary-veryDark font-extrabold">
              Procurement Services
            </h1>
          </div>
          <div className="w-full max-w-5xl m-auto space-y-8 flex flex-col items-center">
            <img
              src={ProcurementImg}
              alt="market-img"
              className="object-contain w-full h-auto min-w-[350px]"
            />
            <div className="w-full flex flex-col items-center gap-3 md:gap-7 md:w-5/6 m-auto pb-8 px-4">
              <p className="text-sm font-subHeading2 text-secondary-veryDark sm:text-base md:text-lg text-center">
                From field to facility, get reliable access to high-quality
                produce, transparent pricing, and scalable supply on your terms.
              </p>
              <button className="px-12 cursor-pointer self-auto text-center py-2  md:py-4 md:px-28 bg-secondary-light text-white text-base rounded-full font-btnBody transition-all duration-300 hover:bg-white hover:text-secondary-light">
                Request a Quote
              </button>
            </div>
          </div>
        </div>
        <div className="px-5 py-10 md:py-20 relative flex flex-col justify-center items-center ">
          <div className="w-full flex flex-col gap-3 md:gap-5 items-center ">
            <h1 className="font-subHeading text-2xl md:text-3xl text-secondary-veryDark font-extrabold">
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
            <h1 className="font-subHeading text-2xl md:text-3xl text-secondary-veryDark font-extrabold">
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
                      <img
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
          <div className="p-5 py-10 md:py-20 w-full max-w-6xl m-auto flex flex-col gap-5 md:gap-10 justify-between items-center bg-secondary-veryDark rounded-2xl px-5 md:px-10">
            <div className="w-full flex flex-col gap-3 md:gap-5 items-center md:w-1/2">
              <h1 className="font-subHeading text-2xl md:text-3xl text-center text-white font-extrabold">
                What <span className="text-secondary-light">business</span> are
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
                  <img
                    src={item.img}
                    alt={item.title}
                    className="object-contain  md:w-full h-auto "
                  />
                  <p className="text-sm font-subHeading2 text-white sm:text-base text-center">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
            <button className="px-12 cursor-pointer self-auto text-center py-2  md:py-4 md:px-28 bg-secondary-light text-white text-base rounded-full font-btnBody transition-all duration-300 hover:bg-white hover:text-secondary-light">
              Request a Quote
            </button>
          </div>
        </div>
      </div>
      <Faq accordionItems={accordionItems} />
    </div>
  );
};

export default Procurement;
