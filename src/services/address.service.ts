import api from "@/lib/axios-client";
import { AddAddressProps } from "@/types";

const Services = {
  addAddress: async (data: AddAddressProps) => {
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

  updateAddress: async (id: string, data: AddAddressProps) => {
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
