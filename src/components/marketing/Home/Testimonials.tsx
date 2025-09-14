import Link from "next/link";
import Testimonial from "../../GenericTestimonial";

const Testimonials = () => {
  return (
    <div className="px-5 relative pt-12 md:pt-10 pb-20">
      <div className="w-full max-w-6xl m-auto space-y-8 flex flex-col items-center">
        <Testimonial />
        <div className="w-full bg-secondary-veryLight rounded-xl px-5 py-10 md:p-20">
          <div className="w-full max-w-3xl m-auto  flex flex-col gap-8 items-center">
            <h2 className="capitalize ext-xl sm:text-3xl md:text-4xl  text-center font-subHeading leading-tight font-extrabold text-secondary-veryDark text-centers">
              Ready to grow your{" "}
              <span className="text-secondary-light">business</span>? Start
              where the <span className="text-secondary-light">buyers</span> are
            </h2>
            <div className="w-full md:w-4/5 flex flex-col gap-2">
              <p className="text-sm  sm:text-base md:text-lg text-center">
                Join thousands of farmers, agro-merchants, and suppliers already
                scaling their income with Farmstarck.
              </p>
              <p className="text-sm font-subHeading2 sm:text-base md:text-lg text-center">
                Sell faster. Reach more. Earn without limits.
              </p>
            </div>
            <Link
              href=""
              className="px-16 self-auto text-center py-2  md:px-32 md:py-4 bg-secondary-light text-white text-base rounded-full font-btnBody transition-all duration-300 hover:bg-white hover:text-secondary-light"
            >
              Start Selling Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
