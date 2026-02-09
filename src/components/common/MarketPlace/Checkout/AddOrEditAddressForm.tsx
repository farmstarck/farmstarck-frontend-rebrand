import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  allStates,
  fetchLGAs,
  nigerianStatesWithLGAs,
  type lgaTypes,
} from "@/data/states";
import { CustomDropDown } from "@/components/common/CustomDropDown";
import { isObject } from "framer-motion";
import Image from "next/image";
import { ErrorMessage, SuccessMessage } from "@/utils/PageUtils";
import AddressService from "@/services/address.service";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import { Address } from "@/types/prisma-schema-types";

type AddOrEditAddressFormProps = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setReload: Dispatch<SetStateAction<string>>;
  item?: Address | null;
};

const AddOrEditAddressForm: React.FC<AddOrEditAddressFormProps> = ({
  setIsModalOpen,
  setReload,
  item,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [saveAddress, setSaveAddress] = useState(false);
  const [lgaOptions, setLgaOptions] = useState<
    Array<{ value: string; label: string }>
  >([]);

  const statesArr = allStates.map((state) => ({
    label: state,
    value: state,
  }));
  // Form states
  const [formData, setFormData] = useState({
    recipientName: "",
    street: "",
    state: "",
    city: "",
    landmark: "",
    phoneNumber: "",
    email: "",
  });

  // Update LGA options when state changes
  useEffect(() => {
    if (formData.state) {
      const state = nigerianStatesWithLGAs.find(
        (state) => state.state === formData.state,
      );

      // Check if state is an object before mapping the lgas
      if (isObject(state)) {
        const lgaDropdownOptions = state.lgas.map((lga) => ({
          label: lga,
          value: lga,
        }));
        setLgaOptions(lgaDropdownOptions);
      } else {
        setLgaOptions([]);
      }
    }
  }, [formData.state]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    if (name === "phoneNumber") {
      const numericValue = value.replace(/\D/g, "");
      setFormData({
        ...formData,
        [name]: numericValue,
      });
      return;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleStateChange = (value: string) => {
    setFormData({
      ...formData,
      state: value,
    });
  };

  const handleLGAChange = (value: string) => {
    setFormData({
      ...formData,
      city: value,
    });
  };

  const handleSubmitAddress = async () => {
    if (
      !formData.recipientName ||
      !formData.street ||
      !formData.state ||
      !formData.city ||
      !formData.phoneNumber
    ) {
      ErrorMessage("Please fill in all required fields");
      return;
    }
    try {
      setLoading(true);
      if (item) {
        await AddressService.updateAddress(formData);
        SuccessMessage("Address updated successfully");
        setReload(Date.now().toString());
      } else {
        await AddressService.addAddress(formData);
        SuccessMessage("Address added successfully");
        setReload(Date.now().toString());
      }
    } catch (error) {
      console.error(error);
      const msg = renderAxiosOrAuthError(error);
      ErrorMessage(msg);
    } finally {
      setLoading(false);
      setFormData({
        recipientName: "",
        street: "",
        state: "",
        city: "",
        landmark: "",
        phoneNumber: "",
        email: "",
      });
    }
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (
      formData.recipientName &&
      formData.street &&
      formData.state &&
      formData.city &&
      formData.phoneNumber
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [formData]);

  useEffect(() => {
    if (item) {
      setFormData({
        recipientName: item.recipientName,
        street: item.street,
        state: item.state,
        city: item.city,
        landmark: item.landmark ?? "",
        phoneNumber: item.phoneNumber ?? "",
        email: item.email ?? "",
      });
      setIsEdit(true);
    }
  }, [item]);

  return (
    <div className="bg-white rounded-2xl">
      <div className="space-y-5">
        {/* Recipient Name */}
        <div>
          <label className="block text-sm font-semibold  mb-2">
            Recipient Name
          </label>
          <input
            type="text"
            name="recipientName"
            value={formData.recipientName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            placeholder="Enter recipient name"
          />
        </div>

        {/* Street Address */}
        <div>
          <label className="block text-sm font-semibold  mb-2">
            Street Address
          </label>
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            placeholder="Enter street address"
          />
        </div>

        {/* State and LGA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="w-full">
            <label className="block text-sm font-semibold  mb-2">State</label>
            <div className="w-full">
              <CustomDropDown
                searchable={true}
                width="full"
                value={formData.state}
                options={statesArr}
                onChange={handleStateChange}
                placeholder="Select State"
                searchholder="search states"
              />
            </div>
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold  mb-2">
              Local Government Area
            </label>
            <div className="w-full">
              <CustomDropDown
                searchable={true}
                width="full"
                value={formData.city}
                options={lgaOptions}
                onChange={handleLGAChange}
                placeholder="Select LGA"
                searchholder="search lgas"
                disabled={!formData.state}
              />
            </div>
          </div>
        </div>

        {/* Landmark and Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold  mb-2">
              Landmark/Bustop{" "}
              <span className="text-xs text-gray-400">(optional)</span>
            </label>
            <input
              type="text"
              name="landmark"
              value={formData.landmark}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              placeholder="Near Spar Mall (Port Street)"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold  mb-2">
              Phone Number
            </label>
            <div className="flex gap-1 px-2 border-gray-200  focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all rounded-lg border  items-center">
              <div className="">
                <Image
                  width={34}
                  height={34}
                  src={`/assets/images/flags/ng_flag.png`}
                  alt={"nigerian flag"}
                  className="rounded-full"
                />
              </div>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="flex-1 px-4 py-3 outline-none focus:outline-0 focus:border-0"
                placeholder="080 123 456 789"
              />
            </div>
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Email <span className="text-xs text-gray-400">(optional)</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            placeholder="Enter email address"
          />
        </div>

        {/* Save Address Checkbox */}
        <label className="flex items-center gap-2 cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              checked={saveAddress}
              onChange={(e) => setSaveAddress(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-4 h-4 border-2 border-gray-300 rounded peer-checked:bg-primary peer-checked:border-primary transition-all flex items-center justify-center">
              {saveAddress && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
          </div>
          <span className="text-sm text-gray-700">
            Save delivery address as default
          </span>
        </label>

        {/* Submit */}
        <button
          onClick={handleSubmitAddress}
          disabled={isDisabled}
          className={`w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98] ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loading ? "Loading..." : isEdit ? "Update Address" : "Add Address"}
        </button>
      </div>
    </div>
  );
};

export default AddOrEditAddressForm;
