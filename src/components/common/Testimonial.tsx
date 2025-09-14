import React, { useEffect, useState } from "react";
import TestimonialImg from "../../assets/images/testimonial-img1.png";
import QuoteImg from "../../assets/svg/quote.svg";

type TestimonialProps = {
  title?: string;
  header: string;
  headerLeft?: boolean;
  description?: string;
};

const testimonials = [
  {
    id: 1,
    text: "Farmstark has been a game-changer for my business. The funding and educational resources have helped me expand and improve my farm operations.",
    author: "Sarah Adewale",
    img: TestimonialImg,
    location: "Abuja, Nigeria",
  },
  {
    id: 2,
    text: "I would highly recommend this to everyone. A true game-changer.",
    author: "John Smith",
    img: TestimonialImg,
    location: "Lagos, Nigeria",
  },
  {
    id: 3,
    text: "Excellent service and fantastic results. Couldn't ask for more.",
    author: "Alice Johnson",
    img: TestimonialImg,
    location: "Calabar, Nigeria",
  },
];

const CustomTestimonial: React.FC<TestimonialProps> = ({
  title,
  header,
  headerLeft,
  description,
}) => {
  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {}, [current]);
  return (
    <div>
      <div
        className={`flex flex-col ${
          headerLeft
            ? "items-center max-w-3xl m-auto md:items-start"
            : "items-center"
        } mb-10`}
      >
        <h5 className="text-xs uppercase">{title}</h5>
        <h2
          className={`uppercase text-lg text-center leading-relaxed sm:text-2xl ${
            headerLeft ? "md:text-4xl mb-5" : "md:text-3xl"
          } md:text-start`}
        >
          {header}
        </h2>
        <p className="text-center md:text-start text-xs md:text-sm">
          {description}
        </p>
      </div>
      {/* Testimonial Content */}
      <div className="flex flex-col items-center justify-center px-0 md:px-16 gap:3 md:gap-10 md:flex-row">
        <img src={testimonials[current].img} alt="" className="w-40 md:w-60" />

        <div className="w-full text-center space-y-2 md:space-y-5 md:text-start md:w-1/2 ">
          <img src={QuoteImg} alt="" className="w-5 md:w-10" loading="lazy" />
          <p className="text-xs text-gray-700 md:text-sm">
            {testimonials[current].text}
          </p>
          <div>
            <h4 className="mt-4 font-subHeading text-primary text-sm md:text-base">
              {testimonials[current].author}
            </h4>
            <p className="text-xs  text-gray-400 md:text-sm">
              {testimonials[current].location}
            </p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <button
        className={`absolute top-1/3 md:top-1/2 left-0 md:left-4 transform translate-y-1/2  p-2 text-gray-400 hover:text-secondary-dark transition ease-out duration-100 md:text-2xl cursor-pointer`}
        onClick={handlePrev}
      >
        ◀
      </button>
      <button
        className={`absolute top-1/3 md:top-1/2 right-0 md:right:4 transform translate-y-1/2 p-2 text-gray-400 hover:text-secondary-dark transition ease-out duration-100 md:text-2xl cursor-pointer`}
        onClick={handleNext}
      >
        ▶
      </button>
    </div>
  );
};

export default CustomTestimonial;
