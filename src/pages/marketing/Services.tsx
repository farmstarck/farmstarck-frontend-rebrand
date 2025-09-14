import GenericHero from "../../components/common/GenericHero";
import Containers from "../../components/marketing/Service/Containers";
const ServicesPage = () => {
  return (
    <div>
      <GenericHero
        header="what we specialize in"
        paragraph="Join an amazing team working on some of the most important challenges facing the world today!"
      />
      <Containers />
    </div>
  );
};

export default ServicesPage;
