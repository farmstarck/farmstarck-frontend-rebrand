import Image from "next/image";
const Insight = () => {
  return (
    <div>
      <div className="flex flex-col max-w-3xl m-auto items-center py-16 nd:mb-10 md:items-start">
        <h2 className="uppercase text-lg text-center leading-relaxed sm:text-2xl md:text-4xl mb-5 md:text-start">
          Insights
        </h2>
        <p className="text-center  text-xs w-full md:w-2/3 md:text-start md:text-sm">
          Hear directly from farmers who have found success with Farmstark.
          Their stories are sure to inspire you
        </p>
      </div>
      <div className="flex flex-col max-w-6xl m-auto items-center md:items-start">
        <iframe
          width="100%"
          //   height="400"
          className="h-52 md:h-80"
          src="https://www.youtube.com/embed/Q49EhjZAJNI?si=9XjXQkQmPXP0Teq_"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
      <div className="flex flex-col max-w-3xl m-auto items-center py-16 md:items-start">
        <p className="text-center  text-xs w-full md:w-2/3 md:text-start md:text-sm">
          Training sessions and mentor-mentee interactions.
        </p>
      </div>
      <div className="flex justify-center max-w-6xl m-auto items-center md:items-start">
        <Image width={900} height={900} src={'/assets/images/community-media-1.png'} alt="" loading="lazy" />
      </div>
    </div>
  );
};

export default Insight;
