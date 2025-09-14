import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import LocationImg from "../../../assets/svg/location.svg";
import BusImg from "../../../assets/svg/bus.svg";
import WalletImg from "../../../assets/svg/wallet.svg";
import AngleRightImg from "../../../assets/svg/angle-right.svg";
import { BackDrop } from "../../../components/common/BackDrop";
import DeliveryForm from "../../../components/marketing/Shop/checkout/DeliveryForm";
import DeliveryMethodForm from "../../../components/marketing/Shop/checkout/DeliveryMethodForm";
import PaymentMethodForm from "../../../components/marketing/Shop/checkout/PaymentMethodForm";
import SuccessModal from "../../../components/marketing/Shop/checkout/SuccessModal";

export type DeliveryDetailsProps = {
  buyerName: string;
  buyerEmail: string;
  buyerDeliveryAddress: string;
  landmark?: string;
  buyerPhoneNumber: string;
};

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeliverysModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const [deliveryDetails, setDeliveryDetails] =
    useState<DeliveryDetailsProps>();
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const [isAddressDefault, setIsAddressDefault] = useState(false);
  const [isStandandardDelivery, setIsStandandardDelivery] = useState(false);
  const [isExpressDelivery, setIsExpressDelivery] = useState(false);

  const [totalAmount, setTotalAmount] = useState(10);
  const [deliveryFee, setDeliveryFee] = useState<number | null>(10);

  const [isSuccessful, setIsSuccessful] = useState(false);

  const handleModalClose = () => {
    setIsDetailsModalOpen(false);
    setIsDeliveryModalOpen(false);
    setIsPaymentModalOpen(false);
  };

  const handleDeliveryType = (e: boolean, select: string) => {
    if (!deliveryMethod) {
      toast.error("Please select delivery method.");
      return;
    }
    setIsStandandardDelivery(false);
    setIsExpressDelivery(false);

    if (select === "standard") setIsStandandardDelivery(e);

    if (select === "express") setIsExpressDelivery(e);
  };

  // Fetch products in cart
  useEffect(() => {
    // retrive cart items
    const cart = localStorage.getItem("cart");
    const parsedCart = cart ? JSON.parse(cart) : [];

    setCartItems(parsedCart);
  }, []);

  // Calculate total amount
  useEffect(() => {
    let total = 0;
    cartItems?.forEach((item: any) => {
      const price = item?.discountPerUnit || item?.pricePerUnit;
      total += item.quantity * price;
    });
    setTotalAmount(total);
  }, [cartItems]);

  useEffect(() => {
    setDeliveryFee(
      isStandandardDelivery ? 12000 : isExpressDelivery ? 20500 : null
    );
  }, [isStandandardDelivery, isExpressDelivery]);
  return (
    <div className="w-full  pt-36 px-5 md:pt-48">
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-14">
        <header className="w-full flex items-center justify-between">
          <h2 className="font-subHeading text-xl text-gray-700">
            Checkout Order
          </h2>
        </header>
        <div className="grid grid-cols-2 w-full mt-5 py-3 gap-y-8  md:gap-y-10 gap-x-3 md:gap-x-16 lg:grid-cols-3 justify-center items-stretch">
          {cartItems.length > 0 &&
            cartItems.map((item: any) => (
              <div
                key={item.id}
                className="flex flex-col gap-5 items-center md:flex-row"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-12 h-12 md:w-24 md:h-24 rounded-md"
                />
                <div className="text-center md:text-left">
                  <p className="text-btn-txt text-gray-700 font-light uppercase">
                    {item.category}
                  </p>
                  <p className="text-xs  uppercase h-10">{item.name}</p>
                  <p className="text-sm text-gray-600 font-subHeading border-t border-gray-300 pt-1">
                    N
                    {(item?.discountPerUnit > 0 &&
                      item?.discountPerUnit.toLocaleString()) ||
                      (item?.pricePerUnit).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
        </div>
        {/* Checkout details display */}
        <div className="flex flex-col gap-y-12">
          {/* Delivery details */}
          <div className="flex flex-col gap-4">
            <label className="text-sm capitalize font-light text-gray-500">
              Delivery Details
            </label>
            <div
              className="p-4 rounded bg-[#edf7ed] flex justify-between cursor-pointer"
              onClick={() => setIsDetailsModalOpen(true)}
            >
              <div className="flex items-center gap-5 flex-1">
                <img src={LocationImg} alt="" className="w-4" />
                <p className="text-sm md:text-[0.9rem] text-gray-700 capitalize">
                  {deliveryDetails
                    ? deliveryDetails.buyerDeliveryAddress
                    : "Fill in delivery details"}
                </p>
              </div>
              <img src={AngleRightImg} alt="" className="w-[0.4rem]" />
            </div>
            {deliveryDetails && (
              <div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="custom-checkbox4"
                    checked={isAddressDefault}
                    onChange={(e) => setIsAddressDefault(e.target.checked)}
                    className="hidden peer"
                  />
                  <label
                    htmlFor="custom-checkbox4"
                    className={`w-4 h-4  flex items-center justify-center rounded-full ${
                      !isAddressDefault && "border border-gray-400"
                    } peer-checked:bg-secondary-dark peer-checked:border-secondary-dark cursor-pointer transition-all`}
                  ></label>
                  <label
                    htmlFor="custom-checkbox4"
                    className="text-sm text-gray-600 cursor-pointer"
                  >
                    Save shipping address as default
                  </label>
                </div>
              </div>
            )}
          </div>
          {/* Delivery method */}
          <div className="flex flex-col gap-4">
            <label className="text-sm capitalize font-light text-gray-500">
              Delivery Method
            </label>
            <div
              className="p-4 rounded bg-[#edf7ed] flex justify-between cursor-pointer"
              onClick={() => setIsDeliveryModalOpen(true)}
            >
              <div className="flex items-center gap-5 flex-1">
                <img src={BusImg} alt="" className="w-4" />
                <p className="text-sm md:text-[0.9rem] text-gray-700 capitalize">
                  {deliveryMethod || "Select A Delivery Dethod"}
                </p>
              </div>
              <img src={AngleRightImg} alt="" className="w-[0.4rem]" />
            </div>
            {deliveryMethod && (
              <div className="flex flex-col gap-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="custom-checkbox5"
                    checked={isStandandardDelivery}
                    onChange={(e) =>
                      handleDeliveryType(e.target.checked, "standard")
                    }
                    className="hidden peer"
                  />
                  <label
                    htmlFor="custom-checkbox5"
                    className={`w-4 h-4  flex items-center justify-center rounded-full ${
                      !isStandandardDelivery && "border border-gray-400"
                    } peer-checked:bg-secondary-dark peer-checked:border-secondary-dark cursor-pointer transition-all`}
                  ></label>
                  <label
                    htmlFor="custom-checkbox5"
                    className="text-sm cursor-pointer text-gray-600"
                  >
                    Standard Delivery{" "}
                    <span className="font-light">2-3 days shipping</span>
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="custom-checkbox6"
                    checked={isExpressDelivery}
                    onChange={(e) =>
                      handleDeliveryType(e.target.checked, "express")
                    }
                    className="hidden peer"
                    disabled
                  />
                  <label
                    htmlFor="custom-checkbox6"
                    className={`w-4 h-4  flex items-center justify-center rounded-full ${
                      !isExpressDelivery && "border border-gray-400"
                    } peer-checked:bg-secondary-dark peer-checked:border-secondary-dark cursor-auto transition-all`}
                  ></label>
                  <label className="text-sm cursor-pointer text-gray-600 ">
                    Express Delivery{" "}
                    <span className="font-light">Within 24 hours</span>
                  </label>
                  <span className="py-[0.1rem] px-[0.3rem] text-[0.7rem] text-center bg-secondary-light text-gray-900 rounded sm:relative sm:right-0 sm:ml-2">
                    Coming soon
                  </span>
                </div>
              </div>
            )}
          </div>
          {/* Payment method */}
          <div className="flex flex-col gap-2">
            <label className="text-sm capitalize font-light text-gray-500">
              Payment Method
            </label>
            <div
              className="p-4 rounded bg-[#edf7ed] flex justify-between cursor-pointer"
              onClick={() => setIsPaymentModalOpen(true)}
            >
              <div className="flex items-center gap-5 flex-1">
                <img src={WalletImg} alt="" className="w-4" />
                <p className="text-sm md:text-[0.9rem] text-gray-700 capitalize">
                  {paymentMethod
                    ? `pay with ${paymentMethod}`
                    : "Select payment method"}
                </p>
              </div>
              <img src={AngleRightImg} alt="" className="w-[0.4rem]" />
            </div>
          </div>
        </div>
        {/* delivery details modals*/}
        <BackDrop
          isOpen={isDetailsModalOpen}
          handleClose={handleModalClose}
          title="Delivery Details"
        >
          <DeliveryForm
            setDeliveryDetails={setDeliveryDetails}
            setIsDetailsModalOpen={setIsDetailsModalOpen}
            deliveryDetails={deliveryDetails}
          />
        </BackDrop>
        {/* delivery method modals*/}
        <BackDrop
          isOpen={isDeliverysModalOpen}
          handleClose={handleModalClose}
          title="Choose Delivery Method"
        >
          <DeliveryMethodForm
            setDeliveryMethod={setDeliveryMethod}
            setIsDeliveryModalOpen={setIsDeliveryModalOpen}
            deliveryMethod={deliveryMethod}
          />
        </BackDrop>
        {/* payment method modals */}
        <BackDrop
          isOpen={isPaymentModalOpen}
          handleClose={handleModalClose}
          title="Choose Payment Method"
        >
          <PaymentMethodForm
            setPaymentMethod={setPaymentMethod}
            setIsPaymentModalOpen={setIsPaymentModalOpen}
            paymentMethod={paymentMethod}
          />
        </BackDrop>
        {/* Subtoal and total view */}
        {deliveryDetails && deliveryMethod && paymentMethod && deliveryFee && (
          <div className="flex flex-col gap-5">
            <p className="font-subHeading2 text-sm md:text-base">Order Info</p>
            <div className="gap-10 bg-[#edf7ed] rounded-md p-7  w-full sm:w-1/2 md:p-12">
              {/* Total view */}
              <div className="flex flex-col gap-5">
                <div className="flex justify-between gap-3">
                  <p className="text-sm text-gray-600">Items Price:</p>
                  <p className="text-sm text-gray-700 font-subHeading2 ">
                    N {totalAmount?.toLocaleString()}
                  </p>
                </div>
                <div className="flex justify-between gap-3">
                  <p className=" text-sm text-gray-600">Shipping Price:</p>
                  <p className="text-sm text-gray-700 font-subHeading2 ">
                    N {deliveryFee.toLocaleString()}
                  </p>
                </div>
                <div className="flex justify-between gap-3 border-t border-gray-300 pt-3">
                  <p className=" text-sm font-subHeading">Total:</p>
                  <p className="text-sm font-subHeading">
                    N {(totalAmount + deliveryFee).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <div
              className="bg-secondary-dark py-2 mt-3 w-full flex justify-center items-center sm:py-3 text-white text-sm sm:text-sm rounded-md cursor-pointer font-subHeading2"
              onClick={() => setIsSuccessful(true)}
            >
              Continue
            </div>
          </div>
        )}
        {isSuccessful && <SuccessModal setIsSuccessful={setIsSuccessful} />}
      </div>
    </div>
  );
};

export default Checkout;
