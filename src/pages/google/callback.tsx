import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/store/slices/auth.slice";
import ApiLoader from "@/components/common/ui/ApiLoader";

export default function GoogleCallback() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  useEffect(() => {
    const { token, redirect } = router.query;

    const handleRedirect = async () => {
      if (!token) return;

      localStorage.setItem("accessToken", token as string);
      localStorage.setItem("auth:lastMethod", "google");

      await login();
    };
    const redirectTo = localStorage.getItem("redirectAfterAuth") || redirect;

    handleRedirect();

    // hydrate user

    router.replace((redirectTo as string) || "/market/marketplace");
  }, [router.query]);

  return <ApiLoader loading={true} />;
}
