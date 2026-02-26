"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import LightPagination from "@/components/common/LightPagination";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const benefitItems = [
  {
    img: "/assets/images/insighter1.png",
    date: "Jun 01, 2025",
    author: "Farmstarck",
    link: "#",
    header: "Financial Support",
    text: "Access to affordable loans, grants, and financial planning assistance to grow your farm business.",
  },
  {
    img: "/assets/images/insighter2.png",
    date: "Jun 05, 2025",
    author: "Farmstarck",
    link: "#",
    header: "Skills Development",
    text: "Regular training workshops on modern farming techniques, pest management, and sustainable practices.",
  },
  {
    img: "/assets/images/insighter3.png",
    date: "Jun 10, 2025",
    author: "Farmstarck",
    link: "#",
    header: "Quality Inputs",
    text: "Access to high-quality seeds, fertilizers, and other farm inputs at subsidized rates.",
  },
  {
    img: "/assets/images/insighter4.png",
    date: "Jun 15, 2025",
    author: "Farmstarck",
    link: "#",
    header: "Market Access",
    text: "Direct connections to buyers through our digital marketplace, ensuring fair prices for your produce.",
  },
  {
    img: "/assets/images/insighter5.png",
    date: "Jun 27, 2025",
    author: "Farmstarck",
    link: "#",
    header: "Technology Access",
    text: "Use of modern farm equipment, irrigation systems, and digital tools to improve productivity.",
  },
  {
    img: "/assets/images/insighter6.png",
    date: "Jun 28, 2025",
    author: "Farmstarck",
    link: "#",
    header: "Community Building",
    text: "Connect with other farmers, share knowledge, and build supportive networks in your region.",
  },
];

const Insighter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [page, setPage] = useState(() => {
    const p = Number(searchParams.get("page"));
    return p > 0 ? p : 1;
  });

  const [_, setLimit] = useState(10);

  // ✅ Update URL when page changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  }, [page, router, pathname]);

  return (
    <div className="flex flex-col gap-14">
      <div className="grid grid-cols-2 md:grid-cols-3 w-full gap-y-5 md:gap-y-10 gap-x-3 md:gap-x-16 items-center">
        {benefitItems.map((data, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-2 border-2 border-primary rounded-lg p-2 md:p-5"
          >
            <img src={data.img} alt={data.header} className="rounded-lg" />
            <div className="flex justify-between w-full">
              <p className="text-gray-500 text-xs">{data.date}</p>
              <p className="text-gray-500 text-xs">By: {data.author}</p>
            </div>
            <div className="h-[100px]">
              <h2 className="font-subHeading text-secondary-veryDark text-base lg:text-lg">
                {data.header}
              </h2>
              <p className="line-clamp-3 text-sm font-subHeading2 text-gray-800">
                {data.text}
              </p>
            </div>
            <Link
              href={data.link}
              className="bg-primary transition-all duration-100 ease-in-out delay-75 hover:bg-white hover:text-primary hover:border hover:border-primary text-white rounded-full w-full py-3 text-center font-btnBody text-sm md:text-base"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
      <LightPagination
        pages={10}
        page={page}
        setPage={setPage}
        setLimit={setLimit}
      />
    </div>
  );
};

export default Insighter;
