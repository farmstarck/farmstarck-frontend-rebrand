import WriteUs from "../../components/marketing/Contact/WriteUs";
import MapSection from "../../components/marketing/Contact/MapSection";

const ContactPage = () => {
  return (
    <div className="flex flex-col">
      <div className="bg-secondary-veryLight ">
        <div className="p-5 relative flex flex-col justify-center items-center ">
          <div className="w-full flex flex-col py-10 gap-3 md:gap-5 items-center ">
            <h2 className="uppercase text-sm md:text-base text-center text-secondary-veryDark font-subHeading leading-relaxed">
              Write to us
            </h2>
            <h1 className="font-subHeading text-center text-2xl md:text-4xl text-secondary-veryDark font-extrabold">
              To reach out to us,{" "}
              <span className="text-secondary-light">
                Please fill in the form below
              </span>
            </h1>
          </div>
        </div>
      </div>
      <div className="bg-white ">
        <div className="p-5 relative flex flex-col justify-center items-center">
          <div className="w-full max-w-5xl m-auto py-10 gap-y-10 flex flex-col justify-between items-center">
            <WriteUs />
          </div>
        </div>
      </div>
      <div className="bg-secondary-veryLight ">
        <div className="p-5 relative flex flex-col justify-center items-center">
          <div className="w-full max-w-6xl pt-5 mx-auto px-5 py-10 relative flex flex-col justify-center items-center ">
            <div className=" py-10 md:py-20 relative flex flex-col justify-center items-center gap-5 md:gap-10">
              <MapSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
