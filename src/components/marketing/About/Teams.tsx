import Team from "./Team";
import Img1 from "../../../assets/images/CHIDERA.png";
import Img2 from "../../../assets/images/JOSH.png";
import Img3 from "../../../assets/images/IKENNA.png";
import Img4 from "../../../assets/images/LOVINA.png";

const Teams = () => {
  const sectionData = [
    {
      name: "malachi .a",
      surname: "chidera",
      position: "Founder, CEO",
      img: Img1,
      twitter: "/",
      linkedin: "/",
      where: "left",
      description:
        "Chidera is a seasoned Product Manager and Developer with over 7 years of experience in driving innovative solutions and leading cross-functional teams. With a robust background in both product management and digital marketing, he excels at translating complex technical concepts into user-friendly products that meet market needs.",
    },
    {
      name: "nnaji .a",
      surname: "Joshua",
      position: "Co-Founder, COO",
      img: Img2,
      twitter: "/",
      linkedin: "/",
      where: "right",
      description:
        "Joshua is a seasoned Product Designer with 7 years of experience in both designing and managing innovative products. With a keen eye for detail and a strategic approach, he excels in creating user-centric designs that align with business goals and drive growth. His expertise spans the entire product lifecycle, from concept to launch, ensuring impactful and intuitive solutions.",
    },
    {
      name: "egbuonu .g",
      surname: "Ikenna",
      position: "Co-Founder, CTO",
      img: Img3,
      twitter: "/",
      linkedin: "/",
      where: "left",
      description:
        "Ikenna is an accomplished Full Stack Developer with over 7 years of experience in building and maintaining robust softwares. Proficient in both front-end and back-end technologies, he excels at creating seamless, user-centric solutions that drive business success.",
    },
    {
      name: "lovina",
      surname: "Fred",
      position: "Co-Founder, Board Advisor",
      img: Img4,
      twitter: "/",
      linkedin: "/",
      where: "right",
      description:
        "Lovina is a seasoned farmer with over 15 years of experience and a proven track record of high returns on farming investments. Known for her expertise in sustainable practices and innovative farming techniques, she has consistently achieved exceptional yields and profitability. Her  understanding of agricultural trends and commitment to quality have made her a respected leader in the farming community.",
    },
  ];
  return (
    <div className="mt-10">
      <div className="flex flex-col space-y-14 md:space-y-28 items-start">
        {sectionData.map((team, index) => (
          <Team
            key={index}
            name={team.name}
            surname={team.surname}
            position={team.position}
            img={team.img}
            twitter={team.twitter}
            linkedin={team.linkedin}
            where={team.where}
            description={team.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Teams;
