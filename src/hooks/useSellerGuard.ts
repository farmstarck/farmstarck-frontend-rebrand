import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/store/slices/auth.slice";
import { Role } from "@/types/prisma-schema-types";

const SELLER_ROLES: string[] = [
  Role.merchant,
  Role.farmer,
  Role.business,
  Role.admin,
  Role.super_admin,
];

const SELLER_ONLY_PATHS = [
  "/dashboard/manage-products",
  "/dashboard/manage-orders",
  "/dashboard/payouts",
];

export function useSellerGuard(): void {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) return;
    const isSellerOnlyPage = SELLER_ONLY_PATHS.some((path) =>
      router.pathname.startsWith(path),
    );
    if (isSellerOnlyPage && !SELLER_ROLES.includes(user.role)) {
      router.replace("/dashboard");
    }
  }, [router, user]);
}
