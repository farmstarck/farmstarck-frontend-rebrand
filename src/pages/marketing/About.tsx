import HeroImg1 from "../../assets/images/about-hero1.png";
import HeroImg2 from "../../assets/images/about-hero2.png";
import HeroImg3 from "../../assets/images/about-hero3.png";
import Team1 from "../../assets/images/CHIDERA.png";
import Team2 from "../../assets/images/JOSH.png";
import Team3 from "../../assets/images/IKENNA.png";
import Team4 from "../../assets/images/LOVINA.png";
import Ximg from "../../assets/svg/twitter.svg";
import Linkedin from "../../assets/svg/linkedin.svg";

const solutionItem = [
  {
    text: "The Marketplace connects sellers and buyers directly, from crops to chemicals to tools",
    bg: "bg-[#00C700] rounded-xl flex items-center justify-center p-2 sm:p-14 md:p-20 h-[200px] md:h-auto",
  },
  {
    text: "The Food Vault helps families and businesses save gradually for food without pressure",
    bg: "bg-[#EF4444] rounded-xl flex items-center justify-center p-2 sm:p-14 md:p-20 h-[200px] md:h-auto",
  },
  {
    text: "Our Procurement Services move crops in bulk across cities and states with efficiency",
    bg: "bg-[#FFBB28] rounded-xl flex items-center justify-center p-2 sm:p-14 md:p-20 h-[200px] md:h-auto",
  },
  {
    text: "Our Inventory System gives merchants visibility, tracking, and control over their stock",
    bg: "bg-[#5341CD] rounded-xl flex items-center justify-center p-2 sm:p-14 md:p-20 h-[200px] md:h-auto",
  },
  {
    text: "Our Empowerment Program offers funding, training, and support, prioritizing women in agriculture",
    bg: "bg-[#0F172A] rounded-xl flex items-center justify-center p-2 sm:p-14 md:p-20 h-[200px] md:h-auto",
  },
  {
    text: "Our Empowerment Program offers funding, training, and support, prioritizing women in agriculture",
    bg: "bg-[#22C55E] rounded-xl flex items-center justify-center p-2 sm:p-14 md:p-20 h-[200px] md:h-auto",
  },
];

const teamItems = [
  {
    img: Team1,
    name: "Malachi Chidera A.",
    role: "Co-Founder, CEO",
    paraOne:
      "Malachi is a tech-savvy agripreneur, startup operator, and business strategist with over a decade of experience across agriculture, blockchain, and digital innovation.",
    paraTwo:
      "Growing up on his mother’s farm, he developed firsthand knowledge of the agricultural value chain and the challenges farmers face. At Farmstarck, he leads the company vision, partnerships, investor relations, and operations. Malachi is passionate about solving real problems with scalable tech and believes agriculture can be Africa’s greatest economic driver.",
    linkedin: "#",
    twitter: "#",
  },
  {
    img: Team2,
    name: "Nnaji Joshua A.",
    role: "Co-Founder, COO/Head of Product",
    paraOne:
      "Joshua oversees product development and daily team operations at Farmstarck. With a strong background in UI/UX design, digital strategy, and process optimization, he bridges the gap between vision and execution. ",
    paraTwo:
      "Joshua is focused on building tools that are not only functional but deeply intuitive for both rural and urban users. He ensures that every user experience reflects Farmstarck’s core mission of access, simplicity, and impact.",
    linkedin: "#",
    twitter: "#",
  },
  {
    img: Team3,
    name: "Egbuonu Ikenna .G",
    role: "Co-Founder, COO/Head of Product",
    paraOne:
      "Ikenna is a full-stack engineer and system architect with a deep background in web and mobile app development, API integration, and AI systems. He leads the technical infrastructure behind Farmstarck, building reliable, user-friendly, and scalable platforms that serve both farmers and merchants.",
    paraTwo:
      "With a passion for using technology to improve lives, Ikenna ensures that Farmstarck stays at the cutting edge of agri-tech innovation.",
    linkedin: "#",
    twitter: "#",
  },
  {
    img: Team4,
    name: "Lovina Fred",
    role: "Board Advisior | Field Operations Officer (FOP)",
    paraOne:
      "Lovina brings over 25 years of experience in grassroots farming, community leadership, and agricultural trade. As a mother, farmer, and businesswoman, she represents the very community Farmstarck serves.",
    paraTwo:
      "She advises the team on farmer relations, oversees field operations, and leads our farmer onboarding and empowerment programs. Her lived experience and leadership provide the soul of Farmstarck’s mission.",
    linkedin: "#",
    twitter: "#",
  },
];

const About = () => {
  return (
    <div className="flex flex-col">
      <div className="bg-secondary-veryLight ">
        <div className="p-5 relative flex flex-col justify-center items-center ">
          <div className="w-full flex flex-col gap-3 md:gap-5 items-center ">
            <h2 className="uppercase text-sm md:text-base text-center text-secondary-veryDark font-subHeading leading-relaxed">
              About us
            </h2>
            <h1 className="font-subHeading text-2xl md:text-4xl text-secondary-veryDark font-extrabold">
              Our Story
            </h1>
          </div>
          <div className="w-full max-w-6xl pt-5 mx-auto space-x-5 flex overflow-x-auto scrollbar-hide">
            <img
              src={HeroImg2}
              alt="about-hero"
              className="object-contain h-auto w-2/3 min-w-[300px] flex-shrink-0"
            />
            <img
              src={HeroImg3}
              alt="about-hero"
              className="object-contain h-auto w-2/3 min-w-[300px] flex-shrink-0"
            />
            <img
              src={HeroImg1}
              alt="about-hero"
              className="object-contain h-auto w-2/3 min-w-[300px] flex-shrink-0"
            />
          </div>
        </div>
        <div className="w-full max-w-6xl pt-5 mx-auto px-5 py-10 relative flex flex-col justify-center items-center ">
          <div className="w-full flex flex-col gap-3 md:gap-5 ">
            <p className="text-sm font-subHeading2 sm:text-base md:text-lg">
              Farmstarck started with a woman, a farm, and a fight to survive.
            </p>
            <p className="text-sm font-subHeading2 sm:text-base md:text-lg">
              Our founder, Malachi Chidera, was raised watching his mother
              struggle through the rough edges of Nigeria’s farming system. She
              planted by sunrise and fought for fair prices by sunset. She lost
              crops to poor infrastructure, faced price mafias at markets, and
              still managed to feed her children with whatever was left. Every
              season was a gamble. Every harvest, a hustle. Yet she never
              stopped.
            </p>
            <p className="text-sm font-subHeading2 sm:text-base md:text-lg">
              What she faced was more than a personal burden. It was a mirror of
              what thousands of farmers across Africa endure every day. That
              became our fuel. Today, she’s no longer just a farmer. She sits on
              our board, leads our field operations, and ensures that Farmstarck
              always remembers the people it was built to serve.
            </p>
            <p className="text-sm font-subHeading2 sm:text-base md:text-lg">
              But we didn’t stop there. In the cities, we saw families
              struggling to restock food every month. Prices kept shifting.
              Markets stayed unpredictable. People couldn’t plan. On the
              business side, agro-retailers, processors, and caterers were
              dealing with unreliable supply chains and too many middlemen.
              There was no structure. No transparency. No relief.That’s where
              Farmstarck comes in.
            </p>
            <p className="text-sm font-subHeading2 sm:text-base md:text-lg">
              We built a full ecosystem for Africa’s agricultural economy. A
              platform where farmers, merchants, consumers, and agri-investors
              can meet, trade, save, and grow.
            </p>
          </div>
          <div className=" py-10 md:py-20 relative flex flex-col justify-center items-center gap-5 md:gap-10">
            <div className="w-full flex flex-col gap-3 md:gap-5 items-center ">
              <h2 className="text-xl sm:text-3xl md:text-4xl  text-center font-subHeading leading-tight font-extrabold text-secondary-veryDark text-centers w-full md:w-2/3">
                Our solutions are designed to be{" "}
                <span className="text-secondary-light">
                  simple but powerful
                </span>
              </h2>
            </div>
            <div className="w-full max-w-5xl m-auto space-y-8 flex flex-col items-center">
              <div className="grid grid-cols-2 md:grid-cols-2 w-full gap-y-5 md:gap-y-10 gap-x-3 md:gap-x-16 justify-center items-center">
                {solutionItem.map((item, i) => (
                  <div key={i} className={item.bg}>
                    <p className="font-subHeading text-white text-center text-sm md:text-base">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-sm font-subHeading2 text-center sm:text-base md:text-lg">
                Every product we build is driven by a real need we’ve lived
                through. Farmstarck is not just a company. It’s a movement
                powered by resilience, built with heart, and shaped by the
                realities of those we serve. We believe in agriculture not just
                as a sector, but as the engine for economic transformation in
                Africa. This is our story. And we’re just getting started.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white ">
        <div className="p-5 relative flex flex-col justify-center items-center ">
          <div className="flex flex-col gap-y-5 space-y-10 py-10 md:py-16">
            <div className="w-full flex flex-col gap-3  md:gap-5 items-center ">
              <h1 className="font-subHeading text-2xl md:text-3xl text-secondary-veryDark font-extrabold">
                Our Vision
              </h1>
              <p className="text-sm w-full md:w-3/4 text-center sm:text-base md:text-lg">
                To become Africa's leading agri-commerce ecosystem, driving
                inclusive growth, digital transformation, and agricultural
                prosperity through innovation.
              </p>
            </div>
            <div className="w-full flex flex-col gap-3 md:gap-5 items-center ">
              <h1 className="font-subHeading text-2xl md:text-3xl text-secondary-veryDark font-extrabold">
                Our Mission
              </h1>
              <p className="text-sm w-full md:w-3/4 text-center sm:text-base md:text-lg">
                To empower farmers and merchants with tools, access, and
                opportunities that increase productivity, market reach, and
                profitability through agriculture.
              </p>
            </div>
          </div>
          <div className="w-full max-w-6xl pt-5 mx-auto space-x-5 flex overflow-x-auto scrollbar-hide">
            <div className="flex flex-col gap-y-5 space-y-10 py-10 md:py-16">
              <div className="w-full flex flex-col gap-3  md:gap-5 items-center ">
                <h1 className="font-subHeading text-2xl md:text-3xl text-secondary-light font-extrabold">
                  Meet The Team
                </h1>
                <p className="text-sm w-full md:w-3/4 text-center sm:text-base md:text-lg">
                  Meet the minds revolutionizing Africa’s agricultural ecosystem
                </p>
              </div>
              <div className="w-full max-w-5xl m-auto space-y-8 flex flex-col items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-y-5 md:gap-y-10 gap-x-3 md:gap-x-16 justify-center items-center">
                  {teamItems.map((item, i) => (
                    <div
                      key={i}
                      className={`flex flex-col gap-2  items-center ${
                        i >= 1 && "mt-10 md:mt-0"
                      }`}
                    >
                      <div className="w-2/3 flex justify-center">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="rounded-md w-full"
                        />
                      </div>
                      <h2 className="font-subHeading text-center text-secondary-veryDark text-lg md:text-xl ">
                        {item.name}
                      </h2>
                      <p className=" text-center font-subHeading2  text-secondary-light  text-base md:text-lg ">
                        {item.role}
                      </p>
                      <div className="flex gap-3">
                        <a
                          href="https://lucide.dev/icons/linkedin"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img src={Linkedin} alt="" className="w-5" />
                        </a>
                        <a
                          href="http://"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img src={Ximg} alt="" className="w-5" />
                        </a>
                      </div>
                      <div className="flex flex-col gap-3 h-auto md:h-[250px]">
                        <p className="text-sm md:text-base text-center md:text-start">
                          {item.paraOne}
                        </p>
                        <p className="text-sm md:text-base text-center md:text-start">
                          {item.paraTwo}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
