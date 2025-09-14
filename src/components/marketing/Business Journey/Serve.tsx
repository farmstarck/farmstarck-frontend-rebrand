import Image from "next/image";
import Business1 from "../../../assets/images/business-thumb1.png";
import Business2 from "../../../assets/images/business-thumb2.png";
import Business3 from "../../../assets/images/business-thumb3.png";
import Business4 from "../../../assets/images/business-thumb4.png";
import Business5 from "../../../assets/images/business-thumb5.png";
import Business6 from "../../../assets/images/business-thumb6.png";

const serveItem = [
  {
    img: Business1,
    header: "Manufacturers and Agro-Processors",
    text: "Add agricultural commodities to diversify your investment portfolio and reduce risk.",
  },
  {
    img: Business2,
    header: "Retailers and Distributors",
    text: "Traceable, standardized supply of agri-products for resale.",
  },
  {
    img: Business3,
    header: "Hotels, Restaurants, and Caterers",
    text: "Fresh and shelf-stable items delivered to your kitchen or central store.",
  },
  {
    img: Business4,
    header: "Commercial Kitchens and Institutions",
    text: "Supply for schools, hospitals, cooperatives, and food programs.",
  },
  {
    img: Business5,
    header: "Exporters and Agribusinesses",
    text: "Commodity sourcing at scale with quality assurance and logistics support.",
  },
  {
    img: Business6,
    header: "SMEs Across the Agri Sector",
    text: "Input dealers, resellers, and food brands sourcing with simplicity and confidence.",
  },
];

const Serve = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 w-full py-5 md:py-10 gap-y-5  md:gap-y-10 gap-x-3 md:gap-x-16  justify-center items-stretch">
      {serveItem.map((item, i) => {
        return (
          <div key={i} className="flex flex-col items-center gap-3">
            <Image
              src={item.img}
              alt={item.header}
              className="object-contain w-1/2 h-auto min-w-[150px]"
            />
            <h2 className="font-subHeading  text-center text-sm md:text-base">
              {item.header}
            </h2>
            <p className="text-center text-sm w-full md:text-base md:w-5/6">
              {item.text}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Serve;
