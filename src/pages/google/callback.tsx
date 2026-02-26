import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/store/slices/auth.slice";
import ApiLoader from "@/components/common/ui/ApiLoader";

export default function GoogleCallback() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  useEffect(() => {
    const { token, redirect } = router.query;

    if (!router.isReady) return;
    if (!token) return;

    const processAuth = async () => {
      localStorage.setItem("accessToken", token as string);
      localStorage.setItem("auth:lastMethod", "google");

      await login();

      const redirectTo =
        localStorage.getItem("redirectAfterAuth") ||
        redirect ||
        "/market/marketplace";

      router.replace(redirectTo as string);
    };

    processAuth();
  }, [router.isReady, router.query]);

  return <ApiLoader loading={true} />;
}
