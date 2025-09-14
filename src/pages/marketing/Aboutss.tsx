import GenericHero from "../../components/common/GenericHero";
import OriginSection from "../../components/marketing/About/OriginSection";
import Roadmap from "../../components/marketing/About/Roadmap";
import TeamSection from "../../components/marketing/About/TeamSection";

const AboutPage = () => {
  return (
    <div>
      <GenericHero
        header="our story & team"
        paragraph="Join an amazing team working on some of the most important challenges facing the world today!"
      />
      <OriginSection />
      <Roadmap />
      <TeamSection />
    </div>
  );
};

export default AboutPage;
