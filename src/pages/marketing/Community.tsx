import GenericHero from "../../components/common/GenericHero";
import Network from "../../components/marketing/Community/Network";
import Resources from "../../components/marketing/Community/Resources";

const CommunityPage = () => {
  return (
    <div>
      <GenericHero
        header="Community"
        paragraph="Welcome to Farmstark! We're here to support your farming journey every step of the way. By joining us, you'll become part of a community committed to improving food security and strengthening the agricultural supply chain in Nigeria. Let’s grow together!
        "
      />
      <Network />
      <Resources />
    </div>
  );
};

export default CommunityPage;
