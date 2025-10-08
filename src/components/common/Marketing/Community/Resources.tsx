import { useState } from "react";
import Insight from "./Insight";
import Img1 from "../../../assets/svg/insight-1.svg";
import Img2 from "../../../assets/svg/insight-2.svg";
import Img3 from "../../../assets/svg/insight-3.svg";
import Img4 from "../../../assets/svg/insight-4.svg";
import Media from "./Media";

const Resources = () => {
  const [activeMap, setActiveMap] = useState(1);
  const sectionData = [
    {
      section: "december 2024",
      header: "industry report",
      url: "/",
      paragraph:
        "Lorem ipsum dolor sit amet consectetur. Amet ligula sem adipiscing velit congue purus ullamcorper at eget. Amet tortor feugiat nam. Lorem ipsum dolor sit amet consectetur. Amet ligula sem adipiscing velit congue purus ullamcorper at eget. Amet tortor feugiat nam.",
      img: Img1,
      btn: "view",
    },
    {
      section: "december 2024",
      header: "industry report",
      url: "/",
      paragraph:
        "Lorem ipsum dolor sit amet consectetur. Amet ligula sem adipiscing velit congue purus ullamcorper at eget. Amet tortor feugiat nam. Lorem ipsum dolor sit amet consectetur. Amet ligula sem adipiscing velit congue purus ullamcorper at eget. Amet tortor feugiat nam.",
      img: Img2,
      btn: "view",
    },
    {
      section: "december 2024",
      header: "industry report",
      url: "/",
      paragraph:
        "Lorem ipsum dolor sit amet consectetur. Amet ligula sem adipiscing velit congue purus ullamcorper at eget. Amet tortor feugiat nam. Lorem ipsum dolor sit amet consectetur. Amet ligula sem adipiscing velit congue purus ullamcorper at eget. Amet tortor feugiat nam.",
      img: Img3,
      btn: "view",
    },
    {
      section: "december 2024",
      header: "industry report",
      url: "/",
      paragraph:
        "Lorem ipsum dolor sit amet consectetur. Amet ligula sem adipiscing velit congue purus ullamcorper at eget. Amet tortor feugiat nam. Lorem ipsum dolor sit amet consectetur. Amet ligula sem adipiscing velit congue purus ullamcorper at eget. Amet tortor feugiat nam.",
      img: Img4,
      btn: "view",
    },
  ];
  return (
    <div>
      <div className="max-w-3xl m-auto flex flex-col space-y-14 md:space-y-16 px-5 py-6 md:py-12">
        <h2 className="w-full text-center md:text-start md:w-2/3 sm:text-2xl md:text-3xl">
          OUR RESOURCES
        </h2>
      </div>
      <div className="max-w-6xl m-auto px-5 flex flex-col space-y-8 ">
        <div className="flex items-center space-x-10">
          <p
            className={`text-btn-txt md:text-xs  font-light cursor-pointer pb-2 uppercase ${
              activeMap === 1 &&
              "font-subHeading2 border-b-2 border-solid border-secondary-dark"
            }`}
            onClick={() => setActiveMap(1)}
          >
            insights
          </p>
          <p
            className={`text-btn-txt md:text-xs  font-light cursor-pointer pb-2 uppercase ${
              activeMap === 2 &&
              "font-subHeading2 border-b-2 border-solid border-secondary-dark"
            }`}
            onClick={() => setActiveMap(2)}
          >
            news & publications
          </p>
          <p
            className={`text-btn-txt md:text-xs   font-light cursor-pointer pb-2 uppercase ${
              activeMap === 3 &&
              "font-subHeading2 border-b-2 border-solid border-secondary-dark"
            }`}
            onClick={() => setActiveMap(3)}
          >
            media
          </p>
        </div>
        {activeMap === 1 && (
          <div className="flex flex-col space-y-20">
            {sectionData.map((section, index) => (
              <Insight
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
        )}
        {activeMap === 3 && <Media />}
      </div>
    </div>
  );
};

export default Resources;
