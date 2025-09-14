import Link from "next/link";
import CustomButton from "../../common/CustomButton";
import Image, { StaticImageData } from "next/image";

type ContainerSectionProps = {
  section: string;
  header: string;
  url: string;
  paragraph: string;
  img: string | StaticImageData;
  btn: string;
};

const Container: React.FC<ContainerSectionProps> = ({
  section,
  header,
  url,
  btn,
  img,
  paragraph,
}) => {
  return (
    <div className="flex flex-col gap-5 items-center md:items-start">
      <h5 className="text-xs uppercase">{section}</h5>
      <Image src={img} alt="" className="w-5/6 rounded-md" loading="lazy" />
      <div className="w-full md:w-2/3">
        <h2 className="uppercase text-base text-center leading-tight  sm:text-2xl md:text-2xl md:text-start">
          {header}
        </h2>
        <p className="text-xs text-center pt-3 md:text-sm md:text-start">
          {paragraph}
        </p>
        <Link
          href={url}
          className="w-full block border border-solid border-secondary-dark rounded-full mt-5"
        >
          <CustomButton color="white" text={btn} />
        </Link>
      </div>
    </div>
  );
};

export default Container;
