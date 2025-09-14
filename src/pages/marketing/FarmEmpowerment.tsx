import FarmerHero from "../../assets/images/farmer-hero.png";
import Testimonial from "../../components/GenericTestimonial";
import Benefits from "../../components/marketing/Farm Empowerment/Benefits";
import ProgramHighlight from "../../components/marketing/Farm Empowerment/ProgramHighlight";
import Faq from "../../components/marketing/Home/Faq";

const accordionItems = [
  {
    header: "How do I sell my produce on Farmstarck?",
    text: "Register as a farmer, list your crops or join our cooperative vendor network.",
  },
  {
    header: "Do I need a smartphone to sell?",
    text: "While it helps, we also support low-tech onboarding via field agents and USSD (coming soon).",
  },
  {
    header: "Can I get support with transport and logistics?",
    text: "Yes. We work with logistics partners to help farmers reach bigger markets.",
  },
  {
    header: "What types of crops can I sell?",
    text: "Yams, maize, rice, vegetables, cassava, tomatoes, and more.",
  },

  {
    header: "Will I get paid immediately?",
    text: "Yes. Once your produce is verified and delivered, payment is processed same or next day.",
  },
];

const FarmEmpowerment = () => {
  return (
    <div className="flex flex-col">
      <div className="bg-secondary-veryLight ">
        <div className="p-5 relative flex flex-col justify-center items-center ">
          <div className="w-full flex flex-col gap-3 md:gap-5 items-center ">
            <h2 className="uppercase text-sm md:text-base text-center text-secondary-veryDark font-subHeading leading-relaxed">
              Your journey
            </h2>
            <h1 className="font-subHeading text-2xl md:text-4xl text-secondary-veryDark font-extrabold">
              Farmer Empowerment
            </h1>
          </div>
          <div className="w-full max-w-3xl m-auto space-y-8 pt-5 flex flex-col items-center">
            <img
              src={FarmerHero}
              alt="market-img"
              className="object-contain w-full h-auto min-w-[350px]"
            />
            <div className="w-full flex flex-col items-center gap-3 md:gap-7 md:w-5/6 m-auto pb-8 px-4">
              <h2 className="text-xl sm:text-3xl md:text-4xl  text-center font-subHeading leading-tight font-extrabold text-secondary-veryDark text-centers">
                Supporting smallholder farmers with{" "}
                <span className="text-secondary-light">
                  resources, training and market access
                </span>
              </h2>
              <p className="text-sm font-subHeading2 text-secondary-veryDark sm:text-base md:text-lg text-center">
                Our Farmer Empowerment Program provides comprehensive support to
                smallholder farmers across Nigeria, with a focus on 70% women
                and 30% male participation. We aim to increase agricultural
                productivity, improve livelihoods, and create sustainable
                farming practices.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="p-5 py-10 md:py-20 gap-5 md:gap-10 relative flex flex-col justify-center items-center ">
          <div className="w-full flex flex-col gap-3 md:gap-5 items-center ">
            <h1 className="font-subHeading text-2xl md:text-3xl text-secondary-veryDark font-extrabold">
              Program Highlights
            </h1>
          </div>
          <div className="w-full max-w-5xl m-auto space-y-8 flex flex-col items-center">
            <ProgramHighlight />
          </div>
        </div>
        <div className="p-5 py-10 md:py-20 relative flex flex-col justify-center items-center ">
          <div className="p-5 py-10 md:py-20 w-full max-w-6xl m-auto flex flex-col gap-5 md:gap-10 justify-between items-center bg-secondary-veryDark rounded-2xl px-5 md:px-10">
            <div className="w-full flex flex-col gap-3 md:gap-5 items-center md:w-1/2">
              <h1 className="font-subHeading text-2xl md:text-3xl text-center text-white font-extrabold">
                <span className="text-secondary-light">Program Benefits</span>
              </h1>

              <p className="text-sm font-subHeading2 text-white sm:text-base md:text-lg text-center">
                Join thousands of farmers already benefiting from our
                comprehensive support
              </p>
            </div>
            <Benefits />
          </div>
        </div>
        <div className="p-5 py-10 md:py-20 gap-5 md:gap-10 relative flex flex-col justify-center items-center ">
          <Testimonial />
        </div>
      </div>
      <Faq accordionItems={accordionItems} />
    </div>
  );
};

export default FarmEmpowerment;
