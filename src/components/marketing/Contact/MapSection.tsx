const MapSection = () => {
  return (
    <div className=" w-full ">
      <div className="relative w-full max-w-3xl mx-auto">
        <div className="flex flex-col gap-5 items-center md:items-start">
          <h5 className="text-sm font-subHeading2 uppercase">our offices</h5>
          <h2 className="uppercase font-subHeading2 w-full text-center md:text-start  sm:text-2xl md:text-3xl">
            298, herbert macaulay way, sabo yaba, lagos state, nigeria.
          </h2>
          <h2 className="uppercase font-subHeading2 w-full text-center mt-3 md:text-start  sm:text-2xl md:text-3xl">
            +234 813 039 5444
          </h2>
          <h2 className="w-full font-subHeading2 text-center md:text-start  sm:text-2xl md:text-3xl">
            support@farmstarck.com
          </h2>
          <div className="w-full mt-10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.137152553332!2d3.3753607739746663!3d6.504316723388099!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8c5feaeb55b7%3A0x23cc385a475a1b06!2s294%20Herbert%20Macaulay%20Wy%2C%20Sabo%20yaba%2C%20Lagos%20101245%2C%20Lagos!5e0!3m2!1sen!2sng!4v1733172381692!5m2!1sen!2sng"
              height="250"
              style={{ border: 0, width: "100%" }}
              allowFullScreen={true}
              aria-hidden="false"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapSection;
