import ServiceSection from "./ServiceSection";
import Img1 from "../../../assets/images/home-secs1.png";
import Img2 from "../../../assets/images/home-secs2.png";
import Img3 from "../../../assets/images/home-secs3.png";
import Img4 from "../../../assets/images/home-secs4.png";
import Img5 from "../../../assets/images/home-secs5.png";

const ServiceSections = () => {
  const sectionData = [
    {
      section: "inventory managament",
      header: "Monitor, Manage, and Maximize Your Yield - All in One Platform",
      url: "/inventory-management",
      paragraph:
        "Explore our all-in-one solution for farmers, agribusinesses, and distributors. Our platform simplifies your inventory management by tracking stock levels, automating reports, and offering real-time insights to optimize your resources and increase productivity. Manage your produce from farm to market with ease.",
      img: Img1,
      reverse: false,
      btn: "learn more",
    },
    {
      section: "farmers empowerment",
      header: "EMPOWERING FARMERS WITH OUR FUNDING SOLUTIONS",
      url: "/farm-funding",
      paragraph:
        "Farmstark is committed to supporting farmers by providing financial solutions that help you grow and sustain your agricultural business. Learn about our funding opportunities, how to qualify, and hear from farmers who have successfully leveraged our resources.",
      img: Img2,
      reverse: true,
      btn: "learn more",
    },
    {
      section: "become a merchant",
      header: "EXPAND YOUR BUSINESS WITH FARMSTACK",
      url: "/become-merchant",
      paragraph:
        "Join Farmstark and connect with a vast network of farmers and consumers. Whether you're a retailer or a wholesaler, our platform offers you the tools and support to grow your business and reach new markets.",
      img: Img3,
      reverse: false,
      btn: "become a merchant",
    },
    {
      section: "partnership",
      header: "COLLABORATING FOR A SUSTAINABLE AGRICULTURAL FUTURE",
      url: "/become-partner",
      paragraph:
        "Farmstark is committed to supporting farmers by providing financial solutions that help you grow and sustain your agricultural business. Learn about our funding opportunities, how to qualify, and hear from farmers who have successfully leveraged our resources.",
      img: Img4,
      reverse: true,
      btn: "become a partner",
    },
    {
      section: "marketplace",
      header: "LOOKING FOR A DIRECT FROM FARM PRODUCE?",
      url: "/marketplace",
      paragraph:
        "Join Farmstark and connect with a vast network of farmers and consumers. Whether you're a retailer or a wholesaler, our platform offers you the tools and support to grow your business and reach new markets.",
      img: Img5,
      reverse: false,
      btn: "go to marketplace",
    },
  ];
  return (
    <div className="p-5 relative top-40">
      <div className="max-w-5xl m-auto space-y-20">
        {sectionData.map((section, index) => (
          <ServiceSection
            key={index}
            section={section.section}
            header={section.header}
            url={section.url}
            paragraph={section.paragraph}
            img={section.img}
            reverse={section.reverse}
            btn={section.btn}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceSections;
