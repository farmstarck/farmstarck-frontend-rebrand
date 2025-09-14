import Image from "next/image";
import InsightImg from "../../../assets/images/funding-insight.png";
const Inspired = () => {
  return (
    <div className="bg-secondary-light w-full px-5 py-10">
      <div className="relative w-full max-w-4xl m-auto mx-auto">
        <div className="flex flex-col  items-center space-y-8 md:items-start">
          <h2 className="uppercase text-center text-xl w-full md:w-3/4 sm:text-2xl md:text-4xl md:text-start">
            Be inspired by our farmers' success
          </h2>
          <div className="w-full flex justify-center gap-2">
            <div className="w-full md:w-3/4 flex justify-center gap-2">
              <Image src={InsightImg} alt="" loading="lazy" className="w-1/2" />
              <Image src={InsightImg} alt="" loading="lazy" className="w-1/2" />
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full md:w-2/3">
            <h3 className="text-center text-xs md:text-sm font-subHeading2 md:text-start">
              Mary’s Journey to Expansion
            </h3>
            <p className="text-center text-xs md:text-sm text-gray-700 md:text-start">
              Mary, a smallholder farmer in Ogun State, accessed funding to
              purchase new equipment and seeds.
            </p>
          </div>
          <div className="flex flex-col gap-4 w-full md:w-2/3">
            <h3 className="text-center text-xs md:text-sm font-subHeading2 md:text-start">
              Outcome
            </h3>
            <p className="text-center text-xs md:text-sm text-gray-700 md:text-start">
              Within a year, Mary increased her crop yield by 40%, allowing her
              to expand her farm and hire additional workers.
            </p>
          </div>

          <div className="w-full flex justify-center gap-2">
            {/* <div className="w-full md:w-3/4 flex justify-center gap-2">
              <iframe
                width="100%"
                //   height="400"
                className="h-40 md:h-80"
                src="https://www.youtube.com/embed/Q49EhjZAJNI?si=9XjXQkQmPXP0Teq_"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div> */}
          </div>
          <div className="flex flex-col gap-4 w-full md:w-2/3">
            <h3 className="text-center text-xs md:text-sm font-subHeading2 md:text-start">
              Joseph’s Livestock Revolution
            </h3>
            <p className="text-center text-xs md:text-sm text-gray-700 md:text-start">
              Joseph from Kaduna used funding to improve his livestock
              facilities and purchase quality feed.
            </p>
          </div>
          <div className="flex flex-col gap-4 w-full md:w-2/3">
            <h3 className="text-center text-xs md:text-sm font-subHeading2 md:text-start">
              Outcome 
            </h3>
            <p className="text-center text-xs md:text-sm text-gray-700 md:text-start">
              Within a year, Mary increased her crop yield by 40%, allowing her
              to expand her farm and hire additional workers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inspired;
