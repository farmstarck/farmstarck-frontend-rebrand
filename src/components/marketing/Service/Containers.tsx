import Container from "./Container";
import Img1 from "../../../assets/images/section-img1.png";
import Img2 from "../../../assets/images/section-img2.png";
import Img3 from "../../../assets/images/section-img3.png";
import Img4 from "../../../assets/images/section-img4.png";
import Img5 from "../../../assets/images/section-img5.png";
import Img6 from "../../../assets/images/section-img6.png";
import Img7 from "../../../assets/images/section-img7.png";

const Containers = () => {
  const sectionData = [
    {
      section: "become a farmer",
      header: "Join the Farmstark Family AND BECOME A SUCCESSFUL FARMER",
      url: "/become-a-farmer",
      paragraph:
        "Welcome to Farmstark! We're here to support your farming journey every step of the way. By joining us, you'll become part of a community committed to improving food security and strengthening the agricultural supply chain in Nigeria. Let’s grow together!",
      img: Img1,
      btn: "get started",
    },
    {
      section: "inventory management",
      header: "Monitor, Manage, and Maximize Your Yield - All in One Platform",
      url: "/inventory-management",
      paragraph:
        "Explore our all-in-one solution for farmers, agribusinesses, and distributors. Our platform simplifies your inventory management by tracking stock levels, automating reports, and offering real-time insights to optimize your resources and increase productivity. Manage your produce from farm to market with ease.",
      img: Img2,
      btn: "learn more",
    },
    {
      section: "farmers enpowerment",
      header: "EMPOWERING FARMERS WITH OUR FUNDING SOLUTIONS",
      url: "/farm-funding",
      paragraph:
        "Farmstark is committed to supporting farmers by providing financial solutions that help you grow and sustain your agricultural business. Learn about our funding opportunities, how to qualify, and hear from farmers who have successfully leveraged our resources.",
      img: Img3,
      btn: "get started",
    },
    {
      section: "become a merchant",
      header: "EXPAND YOUR BUSINESS WITH FARMSTACK",
      url: "/become-merchant",
      paragraph:
        "Join Farmstark and connect with a vast network of farmers and consumers. Whether you're a retailer or a wholesaler, our platform offers you the tools and support to grow your business and reach new markets.",
      img: Img4,
      btn: "get started",
    },
    {
      section: "artificial intelligence",
      header: "MAXIMIZE YOUR ASSETS PRODUCTIVITY WITH STARCKAI",
      url: "/",
      paragraph:
        "We provide farmers with real-time insights and guidance, helping them make smarter decisions, reduce waste, and maximize their productivity with our AI Integration. This approach not only boosts individual success but also drives the overall growth of the agricultural sector and the economy of the country",
      img: Img5,
      btn: "try now",
    },
    {
      section: "marketplace",
      header: "LOOKING FOR A DIRECT FROM FARM PRODUCE?",
      url: "/marketplace",
      paragraph:
        "Join Farmstark and connect with a vast network of farmers and consumers. Whether you're a retailer or a wholesaler, our platform offers you the tools and support to grow your business and reach new markets.",
      img: Img6,
      btn: "get started",
    },
    {
      section: "investment opportunity",
      header: "INVEST IN THE FUTURE OF AGRICULTURE",
      url: "/investment-opportunity",
      paragraph:
        "Discover how you can be part of the agricultural revolution with Farmstark. Explore various investment opportunities, understand potential returns, and manage your risks effectively. Our intuitive dashboard keeps you informed about your investments every step of the way",
      img: Img7,
      btn: "get started",
    },
  ];
  return (
    <div className="p-5 mt-10">
      <div className="max-w-3xl m-auto flex flex-col space-y-14 md:space-y-28 items-start">
        {sectionData.map((section, index) => (
          <Container
            key={index}
            section={section.section}
            header={section.header}
            url={section.url}
            paragraph={section.paragraph}
            img={section.img}
            btn={section.btn}
          />
        ))}
      </div>
    </div>
  );
};

export default Containers;
