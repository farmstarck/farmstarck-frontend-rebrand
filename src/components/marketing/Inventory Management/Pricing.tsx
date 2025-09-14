import Link from "next/link";
import CheckIcon from "../../../assets/svg/check-color.svg";

type PricingPlan = {
  name: string;
  features: string[];
  btnText: string;
  url: string;
};

const data = [
  {
    name: "starter plan",
    features: [
      "Limited product entries",
      "Basic inventory management",
      "Simple reporting",
      "One user",
      "Limited customer support (email only)",
    ],
    btnText: "free",
    url: "/",
  },
  {
    name: "basic plan",
    features: [
      "Unlimited product entries",
      "Full inventory management",
      "Basic sales tracking",
      "Integration with basic accounting software",
      "Multi-user access (Up to 3)",
      "Email and chat support",
    ],
    btnText: "$19/month or $199/year",
    url: "/",
  },
  {
    name: "enterprice plan",
    features: [
      "All Professional Plan features",
      "Customizable dashboards",
      "API access for integration with other software",
      "Unlimited users and product entries",
      "Advanced analytics and forecasting",
      "Custom reporting and automation",
      "Dedicated account manager",
      "Priority customer support (24/7)",
    ],
    btnText: "Starting from $99/month",
    url: "/",
  },
];

const Pricing = () => {
  return (
    <div className="w-full px-5 space-y-10">
      <div className="max-w-3xl m-auto flex flex-col space-y-10 justify-between items-center md:items-start">
        <h2 className="uppercase text-center text-xl sm:text-2xl md:text-4xl md:text-start">
          pricing plan
        </h2>
      </div>
      <div className="max-w-6xl m-auto flex flex-col gap-20 items-center md:items-start md:justify-between md:flex-row">
        {data.map((plan: PricingPlan, index) => (
          <div key={index} className="">
            <div
              className={`flex flex-col space-y-5 px-10 py-10 rounded-2xl border-2 border-solid border-secondary-dark ${
                index % 2 === 0 && "md:border-none"
              } ${
                index % 2 === 1 &&
                "md:border-l md:border-r md:border-t-0 md:border-b-0 border-solid md:border-gray-300 md:rounded-none"
              }`}
            >
              <h3 className="text-lg md:text-2xl font-subHeading2 capitalize text-gray-600">
                {plan.name}
              </h3>
              <div className="flex flex-col gap-3">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <img
                      src={CheckIcon}
                      alt=""
                      loading="lazy"
                      className="w-2"
                    />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
                <Link
                  href="/underconstruction"
                  className={`px-4 py-2 mt-4 text-sm transition ease-out duration-200 font-subHeading2 ${
                    index === 0 && "uppercase"
                  } w-full text-center sm:w-fit border border-solid border-secondary-dark  rounded shadow-xl text-secondary-dark bg-white hover:bg-secondary-dark hover:text-white`}
                >
                  {plan.btnText}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
