"use cient"
import Containers from "@/components/common/Marketing/Become a Partner/Containers";
import GenericHero from "@/components/common/GenericHero";
import Ready from "@/components/common/Marketing/Become a Partner/Ready";
import OurPartner from "@/components/common/Marketing/Become a Partner/OurPartner";

const BecomeAPartner = () => {
  return (
    <div>
      <GenericHero
        header="Become our partner"
        paragraph="Collaborating for a Sustainable Agricultural Future"
      />
      <div className=" py-6 md:py-10">
        <div className="max-w-3xl m-auto flex flex-col gap-20 justify-between items-center md:items-start">
          <p className="text-center text-grey-700 text-xs  md:text-start md:text-sm w-full md:w-5/6">
            At Farmstark, we believe in the power of collaboration. Our
            partnerships with government agencies, NGOs, financial institutions,
            and other organizations enable us to create a more robust and
            sustainable agricultural ecosystem. Together, we're transforming
            agriculture in Nigeria and Africa.
          </p>
        </div>
        <Containers />
        <OurPartner />
        <Ready />
      </div>
    </div>
  );
};

export default BecomeAPartner;
