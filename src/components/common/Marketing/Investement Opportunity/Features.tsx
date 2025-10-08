"use client"
import Feature from "./Feature";
const firstData = [
  {
    img: '/assets/svg/investment-1.svg',
    title: "Direct Farm Investments",
    description:
      "Invest directly in farms or agricultural projects. Support specific farms or crops and become part of their growth journey.",
  },
  {
    img: '/assets/svg/investment-2.svg',
    title: "Agricultural Bonds",
    description:
      "Purchase bonds that fund agricultural initiatives. Enjoy fixed returns and support the agricultural sector’s development.",
  },
  {
    img: '/assets/svg/investment-3.svg',
    title: "Agricultural Funds",
    description:
      "Invest in diversified agricultural funds that pool resources into various farming projects. Spread your risk and potentially increase returns.",
  },
  {
    img: '/assets/svg/investment-4.svg',
    title: "Sustainable Farming Projects",
    description:
      "Invest in eco-friendly and sustainable farming practices that promote environmental stewardship and long-term growth.",
  },
];

const secondData = [
  {
    img: '/assets/svg/investment-5.svg',
    title: "Diversification",
    description:
      "Spread your investments across different projects and options to minimize risk.",
  },
  {
    img: '/assets/svg/investment-6.svg',
    title: "Insurance and Guarantee",
    description:
      "Information about any insurance or guarantees available for certain investments.",
  },
  {
    img: '/assets/svg/investment-7.svg',
    title: "Market Analysis",
    description:
      "Regular updates and analysis on market trends and their impact on your investments.",
  },
  {
    img: '/assets/svg/investment-8.svg',
    title: "Expert Consultation",
    description:
      "Access to financial advisors and experts to guide your investment decisions",
  },
];

const thirdData = [
  {
    img: '/assets/svg/investment-9.svg',
    title: "Investment Overview",
    description:
      "View all your investments in one place with a summary of current status and performance.",
  },
  {
    img: '/assets/svg/investment-10.svg',
    title: "Performance Metrics",
    description:
      "Access detailed metrics such as ROI, profit/loss, and historical performance.",
  },
  {
    img: '/assets/svg/investment-11.svg',
    title: "Transaction History",
    description: "Review past transactions and investment activities.",
  },
  {
    img: '/assets/svg/investment-12.svg',
    title: "Alerts and Notifications",
    description:
      "Set up alerts for important updates or changes in your investments.",
  },
];
const Features = () => {
  return (
    <div className="px-5 py-6 md:py-20">
      <div className="max-w-4xl m-auto flex flex-col gap-20 justify-between items-center md:items-start">
        <Feature
          data={firstData}
          header="Explore your investment opportunities"
        />
        <Feature data={secondData} header="Manage your investment risks" />
        <div className="flex flex-col space-y-10">
          <h2 className="uppercase text-center text-xl w-full sm:text-2xl md:text-4xl md:text-start md:w-3/4">
            Dashboard - Track Your Investments Easily
          </h2>
          <div className="bg-primary w-full min-h-60 md:w-4/5 md:min-h-80"></div>
          <Feature data={thirdData} />
        </div>
      </div>
    </div>
  );
};

export default Features;
