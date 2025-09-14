import { useState } from "react";

const Roadmap = () => {
  const [activeMap, setActiveMap] = useState(1);
  return (
    <div className="py-14">
      <div className=" max-w-6xl m-auto px-5 flex items-center space-x-10">
        <p
          className={`text-xs  font-light cursor-pointer pb-2 ${
            activeMap === 1 &&
            "font-subHeading2 border-b-2 border-solid border-secondary-dark"
          }`}
          onClick={() => setActiveMap(1)}
        >
          2025
        </p>
        <p
          className={`text-xs  font-light cursor-pointer pb-2 ${
            activeMap === 2 &&
            "font-subHeading2 border-b-2 border-solid border-secondary-dark"
          }`}
          onClick={() => setActiveMap(2)}
        >
          2026
        </p>
        <p
          className={`text-xs  font-light cursor-pointer pb-2 ${
            activeMap === 3 &&
            "font-subHeading2 border-b-2 border-solid border-secondary-dark"
          }`}
          onClick={() => setActiveMap(3)}
        >
          2027
        </p>
      </div>
      <div className="max-w-3xl m-auto  w-full flex flex-col my-10 md:mt-20 md:mb-14 md:my-0 px-5 md:px-24 py-12 md:py-32 bg-secondary-light">
        {activeMap === 1 && (
          <div className="md:w-3/4 flex flex-col space-y-10 items-center md:items-start">
            <h3 className="uppercase text-2xl text-center md:text-start sm:text-3xl md:text-4xl">
              1st, 2nd quarter,2025
            </h3>
            <div className="flex flex-col items-start space-y-3 md:space-x-10 md:space-y-0 md:flex-row">
              <ul className="flex flex-col gap-3 list-disc pl-5 md:pl-0">
                <li className="text-xs md:text-sm">
                  Development of the Website and App
                </li>
                <li className="text-xs md:text-sm">
                  Development of the Starck AI (Artificial Intelligence for
                  operational excellence)
                </li>
                <li className="text-xs md:text-sm">
                  Farmstarck Community Hangout (FCH 1.0)
                </li>
              </ul>
              <ul className="flex flex-col gap-3 list-disc pl-5 md:pl-0">
                <li className="text-xs md:text-sm">
                  Launch of Website and Mobile App
                </li>
                <li className="text-xs md:text-sm">
                  Farmers, Investors and Merchants outreach and onboarding
                </li>
              </ul>
            </div>
          </div>
        )}
        {activeMap === 2 && (
          <div className="md:w-3/4 flex flex-col space-y-10 items-center md:items-start">
            <h3 className="uppercase text-2xl text-center md:text-start sm:text-3xl md:text-4xl">
              3rd, 4th quarter,2026
            </h3>
            <div className="flex flex-col items-start space-y-3 md:space-x-10 md:space-y-0 md:flex-row">
              <ul className="flex flex-col gap-3 list-disc pl-5 md:pl-0">
                <li className="text-xs md:text-sm">
                  Development of the Website and App
                </li>
                <li className="text-xs md:text-sm">
                  Development of the Starck AI (Artificial Intelligence for
                  operational excellence)
                </li>
                <li className="text-xs md:text-sm">
                  Farmstarck Community Hangout (FCH 1.0)
                </li>
              </ul>
              <ul className="flex flex-col gap-3 list-disc pl-5 md:pl-0">
                <li className="text-xs md:text-sm">
                  Launch of Website and Mobile App
                </li>
                <li className="text-xs md:text-sm">
                  Farmers, Investors and Merchants outreach and onboarding
                </li>
              </ul>
            </div>
          </div>
        )}
        {activeMap === 3 && (
          <div className="md:w-3/4 flex flex-col space-y-10 items-center md:items-start">
            <h3 className="uppercase text-2xl text-center md:text-start sm:text-3xl md:text-4xl">
              1st, 2nd quarter,2026
            </h3>
            <div className="flex flex-col items-start space-y-3 md:space-x-10 md:space-y-0 md:flex-row">
              <ul className="flex flex-col gap-3 list-disc pl-5 md:pl-0">
                <li className="text-xs md:text-sm">
                  Development of the Website and App
                </li>
                <li className="text-xs md:text-sm">
                  Development of the Starck AI (Artificial Intelligence for
                  operational excellence)
                </li>
                <li className="text-xs md:text-sm">
                  Farmstarck Community Hangout (FCH 1.0)
                </li>
              </ul>
              <ul className="flex flex-col gap-3 list-disc pl-5 md:pl-0">
                <li className="text-xs md:text-sm">
                  Launch of Website and Mobile App
                </li>
                <li className="text-xs md:text-sm">
                  Farmers, Investors and Merchants outreach and onboarding
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Roadmap;
