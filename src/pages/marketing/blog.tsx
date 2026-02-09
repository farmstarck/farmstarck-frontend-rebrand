"use client";
import Head from "next/head";
import { useState } from "react";
import Insighter from "@/components/common/Marketing/Blog/Insighter";
import Media from "@/components/common/Marketing/Community/Media";

const networkItem = [
  {
    img: "/assets/svg/comnet1.svg",
    name: "X Space",
    link: "#",
  },
  {
    img: "/assets/svg/comnet2.svg",
    name: "LinedIn",
    link: "#",
  },
  {
    img: "/assets/svg/comnet3.svg",
    name: "Facebook",
    link: "#",
  },
  {
    img: "/assets/svg/comnet4.svg",
    name: "Instagram",
    link: "#",
  },
  {
    img: "/assets/svg/comnet5.svg",
    name: "Youtube",
    link: "#",
  },
  {
    img: "/assets/svg/comnet6.svg",
    name: "Whatsapp",
    link: "#",
  },
];

const Blog = () => {
  const [activeMap, setActiveMap] = useState(1);

  return (
    <>
      <Head>
        <title>
          Farmstarck Blog - Agricultural Trends, News & Publications
        </title>
        <meta
          name="description"
          content="Stay updated with Farmstarck's latest agricultural trends, news, publications, and community insights. Discover farming innovations and market updates in Nigeria."
        />
        <meta
          name="keywords"
          content="Farmstarck blog, agricultural news Nigeria, farming tips Africa, Nigeria agriculture insights, farm technology updates, sustainable farming practices, agricultural innovation platform, farming education blog, agricultural training resources, farm management tips, agricultural supply chain news, farming community blog, agricultural fintech news, farming app updates, agricultural platform insights, farming ecosystem blog, agricultural knowledge hub, farm technology adoption, agricultural extension services, farming education platform, agricultural mentorship blog, farming best practices, agricultural research updates, farm productivity tips, agricultural optimization strategies, farming efficiency improvements, agricultural data analytics, farm monitoring technology, agricultural IoT updates, farming automation news, agricultural robotics insights, drone farming blog, satellite agriculture updates, agricultural fintech trends, farm blockchain news, agricultural AI developments, farming app features, agricultural platform growth, farming ecosystem expansion, agricultural knowledge sharing, farm technology trends, agricultural extension news, farming education resources, agricultural mentorship programs, farming best practices guide, agricultural research findings, farm productivity enhancement, agricultural optimization tools, farming efficiency strategies, agricultural data insights, farm monitoring solutions, agricultural IoT applications, farming automation trends, agricultural robotics advancements, drone farming technology, satellite agriculture benefits, agricultural fintech innovations, farm blockchain applications, agricultural AI solutions, farming app development, agricultural platform features"
        />
        <meta name="author" content="Farmstarck" />
        <meta
          property="og:title"
          content="Farmstarck Blog - Agricultural Trends, News & Publications"
        />
        <meta
          property="og:description"
          content="Stay updated with Farmstarck's latest agricultural trends, news, publications, and community insights. Discover farming innovations and market updates in Nigeria."
        />
        <meta property="og:image" content="/assets/images/blog-hero.png" />
        <meta
          property="og:url"
          content="https://farmstarck.com/marketing/blog"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Farmstarck Blog - Agricultural Trends, News & Publications"
        />
        <meta
          name="twitter:description"
          content="Stay updated with Farmstarck's latest agricultural trends, news, publications, and community insights. Discover farming innovations and market updates in Nigeria."
        />
        <meta name="twitter:image" content="/assets/images/blog-hero.png" />
        <link rel="canonical" href="https://farmstarck.com/marketing/blog" />
      </Head>
      <div className="flex flex-col">
        <div className="bg-lite ">
          <div className="p-5 relative flex flex-col justify-center items-center ">
            <div className="w-full flex flex-col py-10 gap-3 md:gap-5 items-center ">
              <h2 className="uppercase text-sm md:text-base text-center text-dark-green font-bold leading-relaxed">
                Our Blogs
              </h2>
              <h1 className=" text-center text-2xl md:text-4xl text-dark-green font-extrabold">
                Stay up-to-date with Agricultural Trends.{" "}
                <span className="text-primary">Don&apos;t Miss Out</span>
              </h1>
            </div>
          </div>
        </div>
        <div className="bg-white ">
          <div className="p-5 relative flex flex-col justify-center items-center">
            <div className="w-full max-w-5xl m-auto py-10 gap-y-10 flex flex-col justify-between items-center">
              <div className="w-full flex items-center justify-center space-x-10">
                <p
                  className={` text-sm md:text-base   font-light cursor-pointer pb-2 uppercase ${
                    activeMap === 1 &&
                    "font-subHeading2 border-b-2 border-solid border-dark-green"
                  }`}
                  onClick={() => setActiveMap(1)}
                >
                  news & publications
                </p>
                <p
                  className={`text-sm md:text-base    font-light cursor-pointer pb-2 uppercase ${
                    activeMap === 2 &&
                    "font-subHeading2 border-b-2 border-solid border-dark-green"
                  }`}
                  onClick={() => setActiveMap(2)}
                >
                  media
                </p>
              </div>
              {activeMap === 1 && (
                <div className="flex flex-col space-y-20">
                  <Insighter />
                </div>
              )}
              {activeMap === 2 && <Media />}
            </div>
          </div>
        </div>
        <div className="bg-lite ">
          <div className="p-5 relative flex flex-col justify-center items-center">
            <div className="w-full max-w-6xl pt-5 mx-auto px-5 py-10 relative flex flex-col justify-center items-center ">
              <div className=" py-10 md:py-20 relative flex flex-col justify-center items-center gap-5 md:gap-10">
                <div className="w-full flex flex-col gap-3 md:gap-5 items-center ">
                  <h2 className="text-xl sm:text-3xl md:text-4xl  text-center font-subHeading leading-tight font-extrabold text-dark-green text-centers w-full md:w-2/3">
                    Our Community Network{" "}
                    <span className="text-primary">Our First Network</span>
                  </h2>
                </div>
                <div className="w-full max-w-5xl m-auto space-y-8 flex flex-col items-center">
                  <div className="grid grid-cols-2 md:grid-cols-3 w-full gap-y-5 md:gap-y-10 gap-x-3 md:gap-x-16 justify-center items-center">
                    {networkItem.map((item, i) => (
                      <a
                        href={item.link}
                        target="_blank"
                        key={i}
                        className="flex flex-col gap-2 bg-white justify-center items-center py-10 rounded-xl"
                      >
                        <img src={item.img} alt="" className="w-7" />
                        <p className="font-btnBody text-center text-sm md:text-base">
                          {item.name}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
