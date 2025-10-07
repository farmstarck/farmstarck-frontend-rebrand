const workItem = [
  {
    text: "Direct sourcing from trusted farms, processors, and cooperatives",
    iconBg:
      "bg-[#00C700] rounded-full flex justify-center items-center h-2 mt-2 w-2 mt-2",
  },
  {
    text: "Transparent pricing and consistent supply for operational efficiency",
    iconBg:
      "bg-[#EF4444] rounded-full flex justify-center items-center h-2 mt-2 w-2 mt-2",
  },
  {
    text: "Recurring restock options and inventory management support",
    iconBg:
      "bg-[#FFBB28] rounded-full flex justify-center items-center h-2 mt-2 w-2 mt-2",
  },
  {
    text: "Dedicated procurement assistance for custom or large orders",
    iconBg:
      "bg-[#00C700] rounded-full flex justify-center items-center h-2 mt-2 w-2 mt-2",
  },
  {
    text: "Flexible credit terms and full payment tracking",
    iconBg:
      "bg-[#EF4444] rounded-full flex justify-center items-center h-2 mt-2 w-2 mt-2",
  },
  {
    text: "Business dashboard to manage sourcing, delivery, and finances in one place",
    iconBg:
      "bg-[#FFBB28] rounded-full flex justify-center items-center h-2 mt-2 w-2 mt-2",
  },
  {
    text: "Integration options for enterprise systems where required",
    iconBg:
      "bg-[#00C700] rounded-full flex justify-center items-center h-2 mt-2 w-2 mt-2",
  },
];

const WhyChoose = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 w-full py-5 md:py-10 gap-y-5  md:gap-y-10 gap-x-3 md:gap-x-16  justify-center items-stretch">
      {workItem.map((item, i) => {
        return (
          <div key={i} className="flex items-start gap-2">
            <div className={item.iconBg}></div>
            <p className="text-sm w-full md:text-base md:w-5/6">{item.text}</p>
          </div>
        );
      })}
    </div>
  );
};

export default WhyChoose;
