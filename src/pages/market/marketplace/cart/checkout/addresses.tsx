import Navigation from "@/components/common/MarketPlace/Navigation";
import MarketPlaceLayout from "@/layouts/MarketPlaceLayout";
import React, { useEffect, useState } from "react";
import { useNavigate } from "@/hooks/useNavigate";
import { Pencil, Plus, Trash2Icon } from "lucide-react";
import { BackDrop } from "@/components/common/BackDrop";
import AddOrEditAddressForm from "@/components/common/MarketPlace/Checkout/AddOrEditAddressForm";
import AddressService from "@/services/address.service";
import { Address } from "@/types/prisma-schema-types";
import { ErrorMessage, SuccessMessage } from "@/utils/PageUtils";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import { useCheckoutStore } from "@/store/slices/checkout.slice";

const Addresses = () => {
  const { navigate } = useNavigate();
  const { setUserSelectedAddress, selectedAddress } = useCheckoutStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [pickedAddress, setPickedAddress] = useState<Address | null>(null);
  const [reload, setReload] = useState<number>(0);

  // Handle closing modal
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAddNewAddress = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address); // EDIT MODE
    setIsModalOpen(true);
  };

  // Fetch User Addresses

  useEffect(() => {
    AddressService.getUserAddresses()
      .then((res) => setAddresses(res.data))
      .catch(console.error);
  }, [reload]);

  useEffect(() => {
    if (addresses.length < 1) return;

    const defaultAddress = addresses.find((address) => address.isDefault);
    if (defaultAddress) {
      setPickedAddress(defaultAddress);
    }
  }, [addresses]);

  useEffect(() => {
    if (!pickedAddress) return;
    setUserSelectedAddress(pickedAddress);
  }, [pickedAddress]);

  const handleDeleteAddress = async (addressId: string) => {
    try {
      await AddressService.deleteAddress(addressId);
      SuccessMessage("Address deleted successfully");
      setReload((prev) => prev + 1);
      const isSelectedAddressDeleted = selectedAddress?.id === addressId;
      if (isSelectedAddressDeleted) {
        setUserSelectedAddress(null);
      }
    } catch (error) {
      console.error(error);
      const msg = renderAxiosOrAuthError(error);
      ErrorMessage(msg);
    }
  };

  const handleSetDefaultAddress = async (addressId: string) => {
    try {
      await AddressService.setDefaultAddress(addressId);
      SuccessMessage("Address set as default successfully");
      setReload((prev) => prev + 1);
    } catch (error) {
      console.error(error);
      const msg = renderAxiosOrAuthError(error);
      ErrorMessage(msg);
    }
  };

  return (
    <div className="w-full py-5 satoshi bg-lite min-h-screen">
      <div className="w-11/12 lg:max-w-7xl mx-auto">
        <Navigation
          routes={[
            { name: "Cart", href: "/market/marketplace/cart-items" },
            { name: "Checkout", href: "/market/marketplace/cart/checkout" },
            {
              name: "Addresses",
              href: "/market/marketplace/cart/checkout/addresses",
            },
          ]}
          forward={true}
        />

        {/* Page Title */}

        <div className="grid grid-cols-1 w-full md:max-w-5xl mx-auto ">
          <div className="my-6 text-2xl font-extrabold ">Addresses</div>
          {/* Left Section - Delivery & Form */}
          <div className="space-y-5">
            {/* Delivery Address Details */}

            <div className="bg-white rounded-2xl p-6 space-y-6 shadow-sm">
              <div
                className="flex justify-end items-center cursor-pointer  p-2 text-center font-bold text-dark-green mb-4"
                onClick={handleAddNewAddress}
              >
                <Plus size={20} />
                <p className="ml-2">Add New Address</p>
              </div>
              {addresses.length > 0 ? (
                addresses.map((address) => (
                  <button
                    key={address.id}
                    onClick={() => setPickedAddress(address)}
                    className={`
                              relative text-left p-4 w-full rounded-xl border-2 transition-all duration-300
                                ${
                                  pickedAddress?.id === address.id
                                    ? "border-primary bg-primary/5"
                                    : "border-gray-200 hover:border-primary/50"
                                }
                              `}
                  >
                    {address.isDefault && (
                      <span className="px-2 mb-10 text-xs bg-litegreen text-primary text-start rounded-full font-medium">
                        Default
                      </span>
                    )}
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        {/* radio button */}

                        <div
                          className={`
                            w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5
                            ${
                              address.id === pickedAddress?.id
                                ? "border-primary"
                                : "border-gray-300"
                            }
                       `}
                        >
                          {address.id === pickedAddress?.id && (
                            <div className="w-3 h-3 rounded-full bg-primary"></div>
                          )}
                        </div>

                        <div className="text-left">
                          <div className="space-y-2">
                            <h3 className="font-medium capitalize">
                              {address.recipientName}{" "}
                              {/* {address.isDefault && (
                              <span className="px-2 py-0.5 text-xs bg-litegreen text-primary rounded-full font-medium">
                                Default
                              </span>
                            )} */}
                            </h3>
                            <p className="text-sm capitalize font-medium text-gray-600">
                              {address.street}, {address.city}, {address.state},{" "}
                              {address.country}
                            </p>
                            <p className="text-sm text-gray-600">
                              {address.phoneNumber}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div
                        className="text-primary font-bold text-sm hover:text-primary/50"
                        onClick={() => handleEditAddress(address)}
                      >
                        <Pencil className="w-4 h-4" />
                      </div>
                    </div>
                    <div
                      className={`flex justify-between items-center py-3 pt-5 ${address.isDefault && "justify-end"}`}
                    >
                      {!address.isDefault && (
                        <div
                          className="text-primary text-xs font-bold hover:text-primary/50 "
                          onClick={() => handleSetDefaultAddress(address.id)}
                        >
                          SET AS DEFAULT
                        </div>
                      )}

                      <div
                        className="text-red-600 hover:text-red-700  text-right"
                        onClick={() => handleDeleteAddress(address.id)}
                      >
                        <Trash2Icon className="w-4 h-4" />
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <button
                  className="flex justify-center items-center cursor-pointer w-full py-2 text-center text-primary font-medium"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Plus size={20} />
                  <p className="ml-2">Add Address Details</p>
                </button>
              )}
            </div>

            {/* Submit Button */}
            <button
              disabled={!pickedAddress || addresses.length === 0}
              onClick={() => {
                setUserSelectedAddress(pickedAddress!);
                navigate("/market/marketplace/cart/checkout");
              }}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98]   disabled:bg-primary/50 disabled:cursor-not-allowed"
            >
              Select Address
            </button>
          </div>
          {/* Delivery Form */}
          <BackDrop
            isOpen={isModalOpen}
            handleClose={handleModalClose}
            title={editingAddress ? "Edit Address" : "Add New Address"}
          >
            <AddOrEditAddressForm
              setIsModalOpen={setIsModalOpen}
              setReload={setReload}
              item={editingAddress}
            />
          </BackDrop>
        </div>
      </div>
    </div>
  );
};

Addresses.getLayout = (page: React.ReactNode) => (
  <MarketPlaceLayout>{page}</MarketPlaceLayout>
);

export default Addresses;
