const benefitItems = [
  {
    header: "Finacial Support",
    text: "Access to affordable loans, grants, and financial planning assistance to grow your farm business.",
  },
  {
    header: "Skills Development",
    text: "Regular training workshops on modern farming techniques, pest management, and sustainable practices.",
  },
  {
    header: "Quality Inputs",
    text: "Access to high-quality seeds, fertilizers, and other farm inputs at subsidized rates.",
  },
  {
    header: "Market Access",
    text: "Direct connections to buyers through our digital marketplace, ensuring fair prices for your produce.",
  },
  {
    header: "Technology Access",
    text: "Use of modern farm equipment, irrigation systems, and digital tools to improve productivity.",
  },
  {
    header: "Community Building",
    text: "Connect with other farmers, share knowledge, and build supportive networks in your region.",
  },
];

const Benefits = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 w-full gap-y-5 md:gap-y-10 gap-x-3 md:gap-x-16 items-center">
      {benefitItems.map((data, i) => (
        <div key={i} className="flex flex-col items-center gap-2">
          <h2 className="font-subHeading text-white  text-centertext-base lg:text-lg">
            {data.header}
          </h2>
          <p className="text-center text-sm sm:text-base  font-subHeading2 text-gray-300">
            {data.text}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Benefits;
