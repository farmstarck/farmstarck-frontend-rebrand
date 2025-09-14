import { useSearchParams } from "next/navigation";
import Image1 from "../../../assets/images/insighter1.png";
import Image2 from "../../../assets/images/insighter2.png";
import Image3 from "../../../assets/images/insighter3.png";
import Image4 from "../../../assets/images/insighter4.png";
import Image5 from "../../../assets/images/insighter5.png";
import Image6 from "../../../assets/images/insighter6.png";
import LightPagination from "../../common/LightPagination";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const benefitItems = [
  {
    img: Image1,
    date: "Jun 01, 2025",
    author: "Farmstarck",
    link: "#",
    header: "Finacial Support",
    text: "Access to affordable loans, grants, and financial planning assistance to grow your farm business.",
  },
  {
    img: Image2,
    date: "Jun 05, 2025",
    author: "Farmstarck",
    link: "#",
    header: "Skills Development",
    text: "Regular training workshops on modern farming techniques, pest management, and sustainable practices.",
  },
  {
    img: Image3,
    date: "Jun 10, 2025",
    author: "Farmstarck",
    link: "#",
    header: "Quality Inputs",
    text: "Access to high-quality seeds, fertilizers, and other farm inputs at subsidized rates.",
  },
  {
    img: Image4,
    date: "Jun 15, 2025",
    author: "Farmstarck",
    link: "#",
    header: "Market Access",
    text: "Direct connections to buyers through our digital marketplace, ensuring fair prices for your produce.",
  },
  {
    img: Image5,
    date: "Jun 27, 2025",
    author: "Farmstarck",
    link: "#",
    header: "Technology Access",
    text: "Use of modern farm equipment, irrigation systems, and digital tools to improve productivity.",
  },
  {
    img: Image6,
    date: "Jun 28, 2025",
    author: "Farmstarck",
    link: "#",
    header: "Community Building",
    text: "Connect with other farmers, share knowledge, and build supportive networks in your region.",
  },
];

const Insighter = () => {
  // const [willFilter, setWillFilter] = useState("");
  // const [pageParams, setPageParams] = useSearchParams();
  const pageParams = useSearchParams();
  const [page, setPage] = useState(() => {
    let p = Number(pageParams!.get("page"));
    return p > 0 ? p : 1;
  });
  //   const [pages, setPages] = useState<number>(0);
  //   const [limit, setLimit] = useState(10);
  const [_, setLimit] = useState(10);

  return (
    <div className="flex flex-col gap-14">
      <div className="grid grid-cols-2 md:grid-cols-3 w-full gap-y-5 md:gap-y-10 gap-x-3 md:gap-x-16 items-center">
        {benefitItems.map((data, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-2 border-2 border-secondary-light rounded-lg p-2 md:p-5"
          >
            <Image src={data.img} alt={data.header} className="rounded-lg" />
            <div className="flex justify-between w-full">
              <p className="text-gray-500 text-xs">{data.date}</p>
              <p className="text-gray-500 text-xs">By:{data.author}</p>
            </div>
            <div className="h-[100px] ">
              <h2 className="font-subHeading text-secondary-veryDark text-base lg:text-lg">
                {data.header}
              </h2>
              <p className="line-clamp-3 text-sm font-subHeading2 text-gray-800">
                {data.text}
              </p>
            </div>
            <Link
              href={data.link}
              className="bg-secondary-light text-white rounded-full w-full py-3 text-center font-btnBody text-sm md:text-base"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
      <LightPagination
        // page={1}
        pages={10}
        // setPage={(page) => console.log(page)}
        // setLimit={(limit) => console.log(limit)}

        page={page}
        // pages={pages}
        setPage={setPage}
        setLimit={setLimit}
      />
    </div>
  );
};

export default Insighter;
