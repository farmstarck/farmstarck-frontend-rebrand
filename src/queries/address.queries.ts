import Services from "@/services/address.service";
import { AddAddressProps } from "@/types";

export const addressQueries = {
  all: ["address"] as const,

  allUserAddresses: () => ({
    queryKey: [...addressQueries.all, "list"],
    queryFn: Services.getUserAddresses,
  }),

  defaultAddress: () => ({
    queryKey: [...addressQueries.all, "default"],
    queryFn: Services.getDefaultAddress,
  }),

  addressById: (id: string) => ({
    queryKey: [...addressQueries.all, id],
    queryFn: () => Services.getAddressById(id),
  }),
};

export const addressMutations = {
  addAddress: () => ({
    mutationFn: (data: AddAddressProps) => Services.addAddress(data),
  }),

  updateAddress: () => ({
    mutationFn: ({ id, data }: { id: string; data: AddAddressProps }) =>
      Services.updateAddress(id, data),
  }),

  deleteAddress: () => ({
    mutationFn: (id: string) => Services.deleteAddress(id),
  }),

  setDefaultAddress: () => ({
    mutationFn: (id: string) => Services.setDefaultAddress(id),
  }),
};
