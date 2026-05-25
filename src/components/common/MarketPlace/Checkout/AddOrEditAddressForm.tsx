// import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
// import { CustomDropDown } from "@/components/common/CustomDropDown";
// import { useStatesAndLgas } from "@/hooks/useStatesAndLgas";
// import Image from "next/image";
// import { ErrorMessage, SuccessMessage } from "@/utils/PageUtils";
// import AddressService from "@/services/address.service";
// import { renderAxiosOrAuthError } from "@/lib/axios-client";
// import { Address } from "@/types/prisma-schema-types";

// type AddOrEditAddressFormProps = {
//   setIsModalOpen: Dispatch<SetStateAction<boolean>>;
//   setReload: Dispatch<SetStateAction<number>>;
//   item?: Address | null;
// };

// const AddOrEditAddressForm: React.FC<AddOrEditAddressFormProps> = ({
//   setIsModalOpen,
//   setReload,
//   item,
// }) => {
//   const [isEdit, setIsEdit] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [isDisabled, setIsDisabled] = useState(true);
//   const [saveAddress, setSaveAddress] = useState(false);
//   // Form states
//   const [formData, setFormData] = useState({
//     recipientName: "",
//     street: "",
//     state: "",
//     city: "",
//     landmark: "",
//     phoneNumber: "",
//     email: "",
//   });
//   const { stateOptions, lgaOptions } = useStatesAndLgas({
//     selectedState: formData.state,
//   });

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
//   ) => {
//     const { name, value } = e.target;
//     if (name === "phoneNumber") {
//       const numericValue = value.replace(/\D/g, "");
//       setFormData({
//         ...formData,
//         [name]: numericValue,
//       });
//       return;
//     }
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleStateChange = (value: string) => {
//     setFormData({
//       ...formData,
//       state: value,
//       city: "",
//     });
//   };

//   const handleLGAChange = (value: string) => {
//     setFormData({
//       ...formData,
//       city: value,
//     });
//   };

//   const handleSubmitAddress = async () => {
//     if (!validateForm()) return;
//     try {
//       setLoading(true);
//       if (item) {
//         await AddressService.updateAddress(item.id, {
//           ...formData,
//           isDefault: saveAddress,
//         });
//         SuccessMessage("Address updated successfully");
//         setReload((prev) => prev + 1);
//       } else {
//         await AddressService.addAddress({
//           ...formData,
//           isDefault: saveAddress,
//         });
//         SuccessMessage("Address added successfully");
//         setReload((prev) => prev + 1);
//       }
//     } catch (error) {
//       console.error(error);
//       const msg = renderAxiosOrAuthError(error);
//       ErrorMessage(msg);
//     } finally {
//       setLoading(false);
//       setFormData({
//         recipientName: "",
//         street: "",
//         state: "",
//         city: "",
//         landmark: "",
//         phoneNumber: "",
//         email: "",
//       });
//     }
//     setIsModalOpen(false);
//   };

//   useEffect(() => {
//     if (
//       formData.recipientName &&
//       formData.street &&
//       formData.state &&
//       formData.city &&
//       formData.phoneNumber
//     ) {
//       setIsDisabled(false);
//     } else {
//       setIsDisabled(true);
//     }
//   }, [formData]);

//   useEffect(() => {
//     if (item) {
//       setFormData({
//         recipientName: item.recipientName,
//         street: item.street,
//         state: item.state,
//         city: item.city,
//         landmark: item.landmark ?? "",
//         phoneNumber: item.phoneNumber ?? "",
//         email: item.email ?? "",
//       });
//       setSaveAddress(item.isDefault);
//       setIsEdit(true);
//     }
//   }, [item]);

//   const validateForm = () => {
//     const { recipientName, street, state, city, phoneNumber } = formData;

//     if (!recipientName || !street || !state || !city || !phoneNumber) {
//       ErrorMessage("Please fill in all required fields");
//       return false;
//     }

//     // Recipient name validation
//     if (recipientName.trim().length < 3) {
//       ErrorMessage("Recipient name must be at least 3 characters");
//       return false;
//     }

//     if (recipientName.trim().length > 50) {
//       ErrorMessage("Recipient name is too long");
//       return false;
//     }

//     // Street validation
//     if (street.trim().length < 5) {
//       ErrorMessage("Street address must be at least 5 characters");
//       return false;
//     }

//     if (street.trim().length > 120) {
//       ErrorMessage("Street address is too long");
//       return false;
//     }

//     // Nigerian phone validation
//     const normalizedPhone = phoneNumber.replace(/\s+/g, "");

//     const nigeriaPhoneRegex = /^(?:\+234|234|0)(7|8|9)(0|1)\d{8}$/;

//     if (!nigeriaPhoneRegex.test(normalizedPhone)) {
//       ErrorMessage("Please enter a valid Nigerian phone number");
//       return false;
//     }

//     return true;
//   };

//   return (
//     <div className="bg-white rounded-2xl">
//       <div className="space-y-5">
//         {/* Recipient Name */}
//         <div>
//           <label className="block text-sm font-semibold  mb-2">
//             Recipient Name
//           </label>
//           <input
//             type="text"
//             name="recipientName"
//             value={formData.recipientName}
//             onChange={handleInputChange}
//             className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
//             placeholder="Enter recipient name"
//           />
//         </div>

//         {/* Street Address */}
//         <div>
//           <label className="block text-sm font-semibold  mb-2">
//             Street Address
//           </label>
//           <input
//             type="text"
//             name="street"
//             value={formData.street}
//             onChange={handleInputChange}
//             className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
//             placeholder="Enter street address"
//           />
//         </div>

//         {/* State and LGA */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="w-full">
//             <label className="block text-sm font-semibold  mb-2">State</label>
//             <div className="w-full">
//               <CustomDropDown
//                 searchable={true}
//                 width="full"
//                 value={formData.state}
//                 options={stateOptions}
//                 onChange={handleStateChange}
//                 placeholder="Select State"
//                 searchholder="search states"
//               />
//             </div>
//           </div>
//           <div className="w-full">
//             <label className="block text-sm font-semibold  mb-2">
//               Local Government Area
//             </label>
//             <div className="w-full">
//               <CustomDropDown
//                 searchable={true}
//                 width="full"
//                 value={formData.city}
//                 options={lgaOptions}
//                 onChange={handleLGAChange}
//                 placeholder="Select LGA"
//                 searchholder="search lgas"
//                 disabled={!formData.state}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Landmark and Phone */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-semibold  mb-2">
//               Landmark/Bustop{" "}
//               <span className="text-xs text-gray-300">(optional)</span>
//             </label>
//             <input
//               type="text"
//               name="landmark"
//               value={formData.landmark}
//               onChange={handleInputChange}
//               className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-gray-400"
//               placeholder="e.g Near Spar Mall (Port Street)"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-semibold  mb-2">
//               Phone Number
//             </label>
//             <div className="flex gap-1 px-2 border-gray-200  focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all rounded-lg border  items-center">
//               <div className="">
//                 <Image
//                   width={34}
//                   height={34}
//                   src={`/assets/images/flags/ng_flag.png`}
//                   alt={"nigerian flag"}
//                   className="rounded-full"
//                 />
//               </div>
//               <input
//                 type="tel"
//                 name="phoneNumber"
//                 value={formData.phoneNumber}
//                 onChange={handleInputChange}
//                 className="flex-1 px-4 py-3 outline-none focus:outline-0 focus:border-0 placeholder:text-gray-400"
//                 placeholder="e.g 234 or 08012345678"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Email */}
//         <div>
//           <label className="block text-sm font-semibold mb-2">
//             Email <span className="text-xs text-gray-400">(optional)</span>
//           </label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
//             placeholder="Enter email address"
//           />
//         </div>

//         {/* Save Address Checkbox */}
//         <label className="flex items-center gap-2 cursor-pointer">
//           <div className="relative">
//             <input
//               type="checkbox"
//               checked={saveAddress}
//               onChange={(e) => setSaveAddress(e.target.checked)}
//               className="sr-only peer"
//             />
//             <div className="w-4 h-4 border-2 border-gray-300 rounded peer-checked:bg-primary peer-checked:border-primary transition-all flex items-center justify-center">
//               {saveAddress && (
//                 <svg
//                   className="w-3 h-3 text-white"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={3}
//                     d="M5 13l4 4L19 7"
//                   />
//                 </svg>
//               )}
//             </div>
//           </div>
//           <span className="text-sm text-gray-700">
//             Save delivery address as default
//           </span>
//         </label>

//         {/* Submit */}
//         <button
//           onClick={handleSubmitAddress}
//           disabled={isDisabled}
//           className={`w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98] ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
//         >
//           {loading ? "Loading..." : isEdit ? "Update Address" : "Add Address"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddOrEditAddressForm;

import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CustomDropDown } from "@/components/common/CustomDropDown";
import { useStatesAndLgas } from "@/hooks/useStatesAndLgas";
import Image from "next/image";
import { ErrorMessage, SuccessMessage } from "@/utils/PageUtils";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import { Address } from "@/types/prisma-schema-types";
import { addressMutations, addressQueries } from "@/queries/address.queries";

type FormValues = {
  recipientName: string;
  street: string;
  state: string;
  city: string;
  landmark: string;
  phoneNumber: string;
  email: string;
  isDefault: boolean;
};

type AddOrEditAddressFormProps = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  item?: Address | null;
};

const AddOrEditAddressForm: React.FC<AddOrEditAddressFormProps> = ({
  setIsModalOpen,
  item,
}) => {
  const queryClient = useQueryClient();
  const isEdit = !!item;

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      recipientName: item?.recipientName ?? "",
      street: item?.street ?? "",
      state: item?.state ?? "",
      city: item?.city ?? "",
      landmark: item?.landmark ?? "",
      phoneNumber: item?.phoneNumber ?? "",
      email: item?.email ?? "",
      isDefault: item?.isDefault ?? false,
    },
  });

  const selectedState = watch("state");

  const { stateOptions, lgaOptions } = useStatesAndLgas({
    selectedState,
  });

  // Reset city when state changes
  useEffect(() => {
    setValue("city", "");
  }, [selectedState, setValue]);

  const onSuccess = (message: string) => {
    SuccessMessage(message);
    queryClient.invalidateQueries({
      queryKey: addressQueries.allUserAddresses().queryKey,
    });
    queryClient.invalidateQueries({
      queryKey: addressQueries.defaultAddress().queryKey,
    });
    reset();
    setIsModalOpen(false);
  };

  const onError = (error: unknown) => {
    const msg = renderAxiosOrAuthError(error);
    ErrorMessage(msg);
  };

  const { mutate: addAddress, isPending: isAdding } = useMutation({
    ...addressMutations.addAddress(),
    onSuccess: () => onSuccess("Address added successfully"),
    onError,
  });

  const { mutate: updateAddress, isPending: isUpdating } = useMutation({
    ...addressMutations.updateAddress(),
    onSuccess: () => onSuccess("Address updated successfully"),
    onError,
  });

  const isLoading = isAdding || isUpdating;

  const onSubmit = (data: FormValues) => {
    const { isDefault, ...rest } = data;
    const payload = { ...rest, isDefault };

    if (isEdit && item) {
      updateAddress({ id: item.id, data: payload });
    } else {
      addAddress(payload);
    }
  };

  return (
    <div className="bg-white rounded-2xl">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-5">
          {/* Recipient Name */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Recipient Name
            </label>
            <input
              type="text"
              {...register("recipientName", {
                required: "Recipient name is required",
                minLength: {
                  value: 3,
                  message: "Must be at least 3 characters",
                },
                maxLength: { value: 50, message: "Recipient name is too long" },
              })}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              placeholder="Enter recipient name"
            />
            {errors.recipientName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.recipientName.message}
              </p>
            )}
          </div>

          {/* Street Address */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Street Address
            </label>
            <input
              type="text"
              {...register("street", {
                required: "Street address is required",
                minLength: {
                  value: 5,
                  message: "Must be at least 5 characters",
                },
                maxLength: {
                  value: 120,
                  message: "Street address is too long",
                },
              })}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              placeholder="Enter street address"
            />
            {errors.street && (
              <p className="text-red-500 text-xs mt-1">
                {errors.street.message}
              </p>
            )}
          </div>

          {/* State and LGA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full">
              <label className="block text-sm font-semibold mb-2">State</label>
              <Controller
                name="state"
                control={control}
                rules={{ required: "State is required" }}
                render={({ field }) => (
                  <CustomDropDown
                    searchable={true}
                    width="full"
                    value={field.value}
                    options={stateOptions}
                    onChange={field.onChange}
                    placeholder="Select State"
                    searchholder="search states"
                  />
                )}
              />
              {errors.state && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.state.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <label className="block text-sm font-semibold mb-2">
                Local Government Area
              </label>
              <Controller
                name="city"
                control={control}
                rules={{ required: "LGA is required" }}
                render={({ field }) => (
                  <CustomDropDown
                    searchable={true}
                    width="full"
                    value={field.value}
                    options={lgaOptions}
                    onChange={field.onChange}
                    placeholder="Select LGA"
                    searchholder="search lgas"
                    disabled={!selectedState}
                  />
                )}
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>
          </div>

          {/* Landmark and Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Landmark/Bustop{" "}
                <span className="text-xs text-gray-300">(optional)</span>
              </label>
              <input
                type="text"
                {...register("landmark")}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-gray-400"
                placeholder="e.g Near Spar Mall (Port Street)"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Phone Number
              </label>
              <div className="flex gap-1 px-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all rounded-lg border items-center">
                <div>
                  <Image
                    width={34}
                    height={34}
                    src="/assets/images/flags/ng_flag.png"
                    alt="nigerian flag"
                    className="rounded-full"
                  />
                </div>
                <input
                  type="tel"
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                    validate: (value) => {
                      const normalized = value.replace(/\s+/g, "");
                      const nigeriaPhoneRegex =
                        /^(?:\+234|234|0)(7|8|9)(0|1)\d{8}$/;
                      return (
                        nigeriaPhoneRegex.test(normalized) ||
                        "Please enter a valid Nigerian phone number"
                      );
                    },
                    onChange: (e) => {
                      e.target.value = e.target.value.replace(/\D/g, "");
                    },
                  })}
                  className="flex-1 px-4 py-3 outline-none focus:outline-0 focus:border-0 placeholder:text-gray-400"
                  placeholder="e.g 234 or 08012345678"
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Email <span className="text-xs text-gray-400">(optional)</span>
            </label>
            <input
              type="email"
              {...register("email", {
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              placeholder="Enter email address"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Save Address Checkbox */}
          <Controller
            name="isDefault"
            control={control}
            render={({ field }) => (
              <label className="flex items-center gap-2 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="sr-only peer"
                  />
                  <div className="w-4 h-4 border-2 border-gray-300 rounded peer-checked:bg-primary peer-checked:border-primary transition-all flex items-center justify-center">
                    {field.value && (
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
            )}
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={!isValid || isLoading}
            className={`w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98] ${
              !isValid || isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading
              ? "Loading..."
              : isEdit
                ? "Update Address"
                : "Add Address"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOrEditAddressForm;
