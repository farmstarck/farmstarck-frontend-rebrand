import api from "@/lib/axios-client";

interface AddressProps {
  street: string;
  landmark?: string;
  phoneNumber: string;
  recipientName: string;
  email?: string;
  city: string;
  state: string;
  isDefault?: boolean;
}

const Services = {
  addAddress: async (data: AddressProps) => {
    const response = await api.post("/api/address", data);
    return response.data;
  },

  getUserAddresses: async () => {
    const response = await api.get("/api/address");
    return response.data;
  },

  getDefaultAddress: async () => {
    const response = await api.get("/api/address/default");
    return response.data;
  },

  getAddressById: async (id: string) => {
    const response = await api.get(`/api/address/${id}`);
    return response.data;
  },

  updateAddress: async (id: string, data: AddressProps) => {
    const response = await api.put(`/api/address/${id}`, data);
    return response.data;
  },

  deleteAddress: async (id: string) => {
    const response = await api.delete(`/api/address/${id}`);
    return response.data;
  },

  setDefaultAddress: async (id: string) => {
    const response = await api.put(`/api/address/set-default/${id}`);
    return response.data;
  },
};

export default Services;
