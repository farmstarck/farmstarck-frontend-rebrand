import Image from "next/image";


const programItems = [
  {
    icon: '/assets/svg/program1.svg',
    text: "Priority support for women farmers (70% of participants)",
  },
  {
    icon: '/assets/svg/program2.svg',
    text: "Access to low-interest financing and microloans",
  },
  {
    icon: '/assets/svg/program3.svg',
    text: "Comprehensive training on modern agricultural practices",
  },
  {
    icon: '/assets/svg/program4.svg',
    text: "Quality farm inputs including seeds, fertilizers, and tools",
  },
  {
    icon: '/assets/svg/program5.svg',
    text: "Access to modern farming equipment and technology",
  },
  {
    icon: '/assets/svg/program6.svg',
    text: "Direct market linkages through our digital marketplace",
  },
];

const ProgramHighlight = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 w-full gap-y-5 md:gap-y-10 gap-x-3 md:gap-x-16 items-center">
      {programItems.map((data, i) => (
        <div key={i} className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-[var(--lite)] rounded-full flex items-center justify-center">
            <Image src={data.icon} alt="" className="w-1/2" width={100} height={100}/>
          </div>
          <p className="text-center text-sm md:text-base font-subHeading2">
            {data.text}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProgramHighlight;
