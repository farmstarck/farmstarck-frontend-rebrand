import Navigation from "@/components/common/MarketPlace/Navigation";
import MarketPlaceLayout from "@/layouts/MarketPlaceLayout";
import React, { useEffect, useState } from "react";
import { useNavigate } from "@/hooks/useNavigate";
import { Pencil, Plus, Trash2Icon } from "lucide-react";
import { BackDrop } from "@/components/common/BackDrop";
import AddOrEditAddressForm from "@/components/common/MarketPlace/Checkout/AddOrEditAddressForm";
import { Address } from "@/types/prisma-schema-types";
import { ErrorMessage, SuccessMessage } from "@/utils/PageUtils";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import { useCheckoutStore } from "@/store/slices/checkout.slice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addressMutations, addressQueries } from "@/queries/address.queries";

const Addresses = () => {
  const { navigate } = useNavigate();
  const queryClient = useQueryClient();
  const { setUserSelectedAddress, selectedAddress } = useCheckoutStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [pickedAddress, setPickedAddress] = useState<Address | null>(null);

  // ── Fetch addresses ──────────────────────────────────────────────
  const { data: addresses = [] } = useQuery({
    ...addressQueries.allUserAddresses(),
    select: (res) => res.data,
  });

  // Set default picked address whenever the list changes
  useEffect(() => {
    if (addresses.length < 1) return;
    const defaultAddress = addresses.find(
      (address: Address) => address.isDefault,
    );
    if (defaultAddress) setPickedAddress(defaultAddress);
  }, [addresses]);

  useEffect(() => {
    if (!pickedAddress) return;
    setUserSelectedAddress(pickedAddress);
  }, [pickedAddress]);

  // ── Mutations ────────────────────────────────────────────────────
  const invalidateAddresses = () =>
    queryClient.invalidateQueries({
      queryKey: addressQueries.allUserAddresses().queryKey,
    });

  const { mutate: deleteAddress } = useMutation({
    ...addressMutations.deleteAddress(),
    onSuccess: (_, addressId) => {
      SuccessMessage("Address deleted successfully");
      if (selectedAddress?.id === addressId) setUserSelectedAddress(null);
      invalidateAddresses();
    },
    onError: (error) => ErrorMessage(renderAxiosOrAuthError(error)),
  });

  const { mutate: setDefaultAddress } = useMutation({
    ...addressMutations.setDefaultAddress(),
    onSuccess: () => {
      SuccessMessage("Address set as default successfully");
      invalidateAddresses();
    },
    onError: (error) => ErrorMessage(renderAxiosOrAuthError(error)),
  });

  // ── Modal handlers ───────────────────────────────────────────────
  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingAddress(null);
  };

  const handleAddNewAddress = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setIsModalOpen(true);
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

        <div className="grid grid-cols-1 w-full md:max-w-5xl mx-auto">
          <div className="my-6 text-2xl font-extrabold">Addresses</div>
          <div className="space-y-5">
            <div className="bg-white rounded-2xl p-6 space-y-6 shadow-sm">
              <div
                className="flex justify-end items-center cursor-pointer p-2 text-center font-bold text-dark-green mb-4"
                onClick={handleAddNewAddress}
              >
                <Plus size={20} />
                <p className="ml-2">Add New Address</p>
              </div>

              {addresses.length > 0 ? (
                addresses.map((address: Address) => (
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
                        <div
                          className={`
                            w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5
                            ${address.id === pickedAddress?.id ? "border-primary" : "border-gray-300"}
                          `}
                        >
                          {address.id === pickedAddress?.id && (
                            <div className="w-3 h-3 rounded-full bg-primary" />
                          )}
                        </div>
                        <div className="text-left">
                          <div className="space-y-2">
                            <h3 className="font-medium capitalize">
                              {address.recipientName}
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
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditAddress(address);
                        }}
                      >
                        <Pencil className="w-4 h-4" />
                      </div>
                    </div>

                    <div
                      className={`flex justify-between items-center py-3 pt-5 ${address.isDefault && "justify-end"}`}
                    >
                      {!address.isDefault && (
                        <div
                          className="text-primary text-xs font-bold hover:text-primary/50"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDefaultAddress(address.id);
                          }}
                        >
                          SET AS DEFAULT
                        </div>
                      )}
                      <div
                        className="text-red-600 hover:text-red-700 text-right"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteAddress(address.id);
                        }}
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

            <button
              disabled={!pickedAddress || addresses.length === 0}
              onClick={() => {
                setUserSelectedAddress(pickedAddress!);
                navigate("/market/marketplace/cart/checkout");
              }}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98] disabled:bg-primary/50 disabled:cursor-not-allowed"
            >
              Select Address
            </button>
          </div>

          <BackDrop
            isOpen={isModalOpen}
            handleClose={handleModalClose}
            title={editingAddress ? "Edit Address" : "Add New Address"}
          >
            <AddOrEditAddressForm
              setIsModalOpen={setIsModalOpen}
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
