import { useState } from "react";

import CustomButton from "../../common/CustomButton";
import PartnerForm from "./PartnerForm";
import { BackDrop } from "../../common/BackDrop";

const Ready = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle closing modal
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-secondary-light mt-10 md:mt-20 w-full px-5 py-10 md:py-20">
      <div className="relative w-full max-w-3xl m-auto mx-auto">
        <div className="flex flex-col  items-center space-y-5 md:space-y-12 md:items-start">
          <h2 className="uppercase text-center text-xl w-full md:w-3/4 sm:text-2xl md:text-4xl md:text-start">
            Join Our Network of Partners
          </h2>
          <div className="flex flex-col gap-5 md:gap-12 w-full md:w-2/3">
            <p className="text-center text-xs md:text-sm text-gray-700 md:text-start">
              If you're interested in partnering with Farmstark to drive change
              in agriculture, contact us today. Together, we can make a
              difference.
            </p>

            <div className=" border border-solid border-secondary-dark rounded-full">
              <CustomButton
                color="green"
                text="become a partner"
                onClick={() => setIsModalOpen(true)}
              />
            </div>
          </div>
        </div>
      </div>
      <BackDrop isOpen={isModalOpen} handleClose={handleModalClose}>
        <PartnerForm setIsModalOpen={setIsModalOpen} />
      </BackDrop>
    </div>
  );
};

export default Ready;
