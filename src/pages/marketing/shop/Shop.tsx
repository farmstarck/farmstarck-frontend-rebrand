import { useState } from "react";
import HeroSection from "../../../components/marketing/Shop/landing/HeroSection";
import CategorySection from "../../../components/marketing/Shop/landing/CategorySection";
import ProductSection from "../../../components/marketing/Shop/landing/ProductSection";
import Request from "../../../components/marketing/Shop/landing/Request";
import { BackDrop } from "../../../components/common/BackDrop";
import RequestProductForm from "../../../components/marketing/Shop/landing/RequestProductForm";

const ShopPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className=" relative w-full flex flex-col mt-20 gap-8 max-w-6xl m-auto px-5 md:px-0 py-20">
        <HeroSection />
        <CategorySection />
        <ProductSection tag="popular products" />
        <ProductSection tag="best rated" />
      </div>
      <Request setIsModalOpen={setIsModalOpen} />

      <BackDrop isOpen={isModalOpen} handleClose={handleModalClose}>
        <RequestProductForm />
      </BackDrop>
    </div>
  );
};

export default ShopPage;
