import Twitter from "../../../assets/svg/about-twitter.svg";
import Linkedin from "../../../assets/svg/about-linkedin.svg";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

type TeamProps = {
  name: string;
  surname: string;
  position: string;
  img: string | StaticImageData;
  twitter: string;
  linkedin: string;
  where: string;
  description: string;
};

const Team: React.FC<TeamProps> = ({
  name,
  surname,
  position,
  img,
  twitter,
  linkedin,
  where,
  description,
}) => {
  return (
    <div
      className={`flex flex-col w-full ${
        where === "left" ? "items-start" : "items-end"
      }`}
    >
      <div className="flex flex-col space-y-4 w-full md:w-1/2">
        <div className="flex flex-col items-center gap-5 md:flex-row">
          <div className="w-1/2">
            <Image src={img} alt="" className="w-fit" loading="lazy" />
          </div>
          <div className="space-y-1 flex flex-col items-center md:items-start">
            <div className="space-x-2 md:space-x-0 md:-space-y-2 flex flex-row items-center md:flex-col md:items-start">
              <h2 className="capitalize text-lg">{name}</h2>
              <h2 className="capitalize text-lg">{surname}</h2>
            </div>
            <p className="text-xs  text-secondary-dark">{position}</p>
            <div className="flex gap-2 items-center">
              <Link href={twitter}>
                <Image src={Twitter} alt="" className="w-4" loading="lazy" />
              </Link>
              <Link href={linkedin}>
                <Image src={Linkedin} alt="" className="w-4" loading="lazy" />
              </Link>
            </div>
          </div>
        </div>
        <p className="text-xs text-center md:text-sm md:text-start">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Team;
