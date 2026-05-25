// hooks/useUserRole.ts
import { useQuery } from "@tanstack/react-query";
import { userQueries } from "@/queries/user.queries";

const SELLER_ROLES = ["merchant", "farmer", "business", "admin", "super_admin"];

export const useUserRole = () => {
  const { data: profile, isLoading } = useQuery(userQueries.profile());

  const role = profile?.role ?? "";
  const isSeller = SELLER_ROLES.includes(role);
  const isBuyer = role === "user";
  const isFarmer = role === "farmer";
  const isMerchant = role === "merchant";
  const isBusiness = role === "business";
  const isAdmin = role === "admin" || role === "super_admin";

  return {
    role,
    isSeller,
    isBuyer,
    isFarmer,
    isMerchant,
    isBusiness,
    isAdmin,
    isLoading,
    profile,
  };
};
