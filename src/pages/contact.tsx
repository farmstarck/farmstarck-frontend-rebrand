import Head from "next/head";
import MapSection from "@/components/common/Marketing/Contact/MapSection";
import WriteUs from "@/components/common/Marketing/Contact/WriteUs";


const ContactPage = () => {
  return (
    <>
      <Head>
        <title>Contact Farmstarck - Get in Touch with Our Team</title>
        <meta name="description" content="Reach out to Farmstarck for inquiries about our agricultural marketplace, procurement services, investment opportunities, and farmer empowerment programs. We're here to help transform agriculture in Nigeria and Africa." />
        <meta name="keywords" content="contact Farmstarck, customer support, agriculture support, Nigeria contact, farmstarck team, get in touch, agricultural services" />
        <meta name="author" content="Farmstarck" />
        <meta property="og:title" content="Contact Farmstarck - Get in Touch with Our Team" />
        <meta property="og:description" content="Reach out to Farmstarck for inquiries about our agricultural marketplace, procurement services, investment opportunities, and farmer empowerment programs. We're here to help transform agriculture in Nigeria and Africa." />
        <meta property="og:image" content="/assets/images/contact-hero.png" />
        <meta property="og:url" content="https://farmstarck.com/contact" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Farmstarck - Get in Touch with Our Team" />
        <meta name="twitter:description" content="Reach out to Farmstarck for inquiries about our agricultural marketplace, procurement services, investment opportunities, and farmer empowerment programs. We're here to help transform agriculture in Nigeria and Africa." />
        <meta name="twitter:image" content="/assets/images/contact-hero.png" />
        <link rel="canonical" href="https://farmstarck.com/contact" />
      </Head>
      <div className="flex flex-col">
      <div className="bg-[var(--lite)] ">
        <div className="p-5 relative flex flex-col justify-center items-center ">
          <div className="w-full flex flex-col py-10 gap-3 md:gap-5 items-center ">
            <h2 className="uppercase text-sm md:text-base text-center text-[var(--dark-green)] font-subHeading leading-relaxed">
              Write to us
            </h2>
            <h1 className="font-subHeading text-center text-2xl md:text-4xl text-[var(--dark-green)] font-extrabold">
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
      <div className="bg-[var(--lite)] ">
        <div className="p-5 relative flex flex-col justify-center items-center">
          <div className="w-full max-w-6xl pt-5 mx-auto px-5 py-10 relative flex flex-col justify-center items-center ">
            <div className=" py-10 md:py-20 relative flex flex-col justify-center items-center gap-5 md:gap-10">
              <MapSection />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ContactPage;
