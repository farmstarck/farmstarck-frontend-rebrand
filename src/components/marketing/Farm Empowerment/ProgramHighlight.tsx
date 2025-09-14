import Program1 from "../../../assets/svg/program1.svg";
import Program2 from "../../../assets/svg/program2.svg";
import Program3 from "../../../assets/svg/program3.svg";
import Program4 from "../../../assets/svg/program4.svg";
import Program5 from "../../../assets/svg/program5.svg";
import Program6 from "../../../assets/svg/program6.svg";

const programItems = [
  {
    icon: Program1,
    text: "Priority support for women farmers (70% of participants)",
  },
  {
    icon: Program2,
    text: "Access to low-interest financing and microloans",
  },
  {
    icon: Program3,
    text: "Comprehensive training on modern agricultural practices",
  },
  {
    icon: Program4,
    text: "Quality farm inputs including seeds, fertilizers, and tools",
  },
  {
    icon: Program5,
    text: "Access to modern farming equipment and technology",
  },
  {
    icon: Program6,
    text: "Direct market linkages through our digital marketplace",
  },
];

const ProgramHighlight = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 w-full gap-y-5 md:gap-y-10 gap-x-3 md:gap-x-16 items-center">
      {programItems.map((data, i) => (
        <div key={i} className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-secondary-veryLight rounded-full flex items-center justify-center">
            <img src={data.icon} alt="" className="w-1/2" />
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
