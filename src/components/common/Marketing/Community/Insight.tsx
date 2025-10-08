import { Link } from "react-router-dom";
import CustomButton from "../../common/CustomButton";

type InsightSectionProps = {
  section: string;
  header: string;
  url: string;
  paragraph: string;
  img: string;
  btn: string;
};

const Insight: React.FC<InsightSectionProps> = ({
  section,
  header,
  url,
  btn,
  img,
  paragraph,
}) => {
  return (
    <div className="p-5 bg-secondary-light">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-8 md:flex-row sm:p-10">
        <div className="w-2/3 sm:w-1/2  md:w-1/3">
          <img src={img} alt="" loading="lazy" />
        </div>
        <div className="w-full flex flex-col items-center md:w-2/4 md:items-start">
          <h5 className="text-xs capitalize mb-2 md:mb-0">{section}</h5>
          <h2 className="uppercase text-base text-center leading-tight md:leading-relaxed md:text-lg md:text-start">
            {header}
          </h2>
          <p className="mb-6 text-xs text-center pt-3  md:text-start">
            {paragraph}
          </p>
          <Link
            to={url}
            className="w-full border block border-solid border-secondary-dark rounded-full sm:w-5/6 md:w-2/3"
          >
            <CustomButton color="green" text={btn} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Insight;
