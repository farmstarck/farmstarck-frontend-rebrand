import CustomTestimonial from "../../common/Testimonial";
import Statistics from "../../common/Statistics";
// import Partners from "./Partners";

const Testimonial: React.FC = () => {
  return (
    <div className="bg-secondary-light w-full px-5 py-10">
      <div className="relative w-full max-w-6xl m-auto mx-auto p-4">
        <CustomTestimonial
          title="testimonial"
          header="be inspired by our farmers success"
        />
      </div>
      <Statistics />
      {/* <Partners /> */}
    </div>
  );
};

export default Testimonial;
