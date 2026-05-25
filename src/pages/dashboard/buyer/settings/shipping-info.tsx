import { useEffect, useState } from "react";
import { ChevronLeft, Pencil, Plus, Trash2Icon } from "lucide-react";
import { BackDrop } from "@/components/common/BackDrop";
import AddOrEditAddressForm from "@/components/common/MarketPlace/Checkout/AddOrEditAddressForm";
import { Address } from "@/types/prisma-schema-types";
import { ErrorMessage, SuccessMessage } from "@/utils/PageUtils";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import { useCheckoutStore } from "@/store/slices/checkout.slice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addressMutations, addressQueries } from "@/queries/address.queries";
import { useRouter } from "next/router";

const ShippingInfo = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setUserSelectedAddress, selectedAddress } = useCheckoutStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [pickedAddress, setPickedAddress] = useState<Address | null>(null);

  // ── Queries ──────────────────────────────────────────────────────
  const { data: addresses = [] } = useQuery({
    ...addressQueries.allUserAddresses(),
    select: (res) => res.data,
  });

  useEffect(() => {
    if (addresses.length < 1) return;
    const defaultAddress = addresses.find((a: Address) => a.isDefault);
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

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingAddress(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="p-2 flex items-center gap-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft size={20} />
          <h1 className="text-xl lg:text-2xl font-bold text-gray-800">
            Address Settings
          </h1>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8">
        {/* Add New Button */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500 capitalize">
            {addresses.length} address{addresses.length !== 1 ? "es" : ""} saved
          </p>
          <button
            onClick={() => {
              setEditingAddress(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <Plus size={16} />
            Add New Address
          </button>
        </div>

        {/* Address List */}
        {addresses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <Plus size={24} className="text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm capitalize">
              No addresses saved yet
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Add Your First Address
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((address: Address) => (
              <div
                key={address.id}
                onClick={() => setPickedAddress(address)}
                className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  pickedAddress?.id === address.id
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-primary/40 hover:bg-gray-50"
                }`}
              >
                {/* Default badge */}
                {address.isDefault && (
                  <span className="absolute top-3 right-10 text-xs bg-litegreen text-primary font-semibold px-2 py-0.5 rounded-full">
                    Default
                  </span>
                )}

                {/* Edit button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingAddress(address);
                    setIsModalOpen(true);
                  }}
                  className="absolute top-3 right-3 p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5 text-primary" />
                </button>

                {/* Radio + Content */}
                <div className="flex items-start gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      address.id === pickedAddress?.id
                        ? "border-primary"
                        : "border-gray-300"
                    }`}
                  >
                    {address.id === pickedAddress?.id && (
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 space-y-1 pr-6">
                    <p className="font-semibold text-gray-900 capitalize text-sm">
                      {address.recipientName}
                    </p>
                    <p className="text-sm text-gray-500 capitalize leading-relaxed">
                      {address.street}, {address.city}, {address.state},{" "}
                      {address.country}
                    </p>
                    <p className="text-sm text-gray-500">
                      {address.phoneNumber}
                    </p>
                  </div>
                </div>

                {/* Footer actions */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                  {!address.isDefault ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDefaultAddress(address.id);
                      }}
                      className="text-xs font-bold text-primary hover:text-primary/70 transition-colors"
                    >
                      Set as Default
                    </button>
                  ) : (
                    <span />
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteAddress(address.id);
                    }}
                    className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2Icon className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
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
  );
};

export default ShippingInfo;
