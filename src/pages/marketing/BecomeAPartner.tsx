import GenericHero from "../../components/common/GenericHero";
import Containers from "../../components/marketing/Become a Partner/Containers";
// import OurPartner from "../../components/marketing/Become a Partner/OurPartner";
import Ready from "../../components/marketing/Become a Partner/Ready";

const BecomeAPartner = () => {
  return (
    <div>
      <GenericHero
        header="Become our partner"
        paragraph="Collaborating for a Sustainable Agricultural Future"
      />
      <div className=" py-6 md:py-10">
        <div className="max-w-3xl m-auto flex flex-col gap-20 justify-between items-center md:items-start">
          <p className="text-center text-xs text-gray-700 md:text-start md:text-sm w-full md:w-5/6">
            At Farmstark, we believe in the power of collaboration. Our
            partnerships with government agencies, NGOs, financial institutions,
            and other organizations enable us to create a more robust and
            sustainable agricultural ecosystem. Together, we’re transforming
            agriculture in Nigeria and Africa.
          </p>
        </div>
        <Containers />
        {/* <OurPartner /> */}
        <Ready />
      </div>
    </div>
  );
};

export default BecomeAPartner;
