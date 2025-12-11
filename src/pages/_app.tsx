import "@/styles/globals.css";
import type { AppProps } from "next/app";
import MainLayout from "@/layouts/MainLayout";
import React, { useEffect, useState } from "react";
import BaseLoader from "@/Loaders/BaseLoader";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import BuyerDashboardLayout from "@/layouts/BuyerDashboardLayout";

type NextPageWithLayout = AppProps["Component"] & {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
};

export default function App({ Component, pageProps }: AppProps) {
  const PageComponent = Component as NextPageWithLayout;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) => {
      if (url !== router.asPath) setLoading(true);
    };

    const handleComplete = () => {
      setTimeout(() => setLoading(false), 1000);
    };

    const handleError = () => {
      setTimeout(() => setLoading(false), 1000);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleError);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleError);
    };
  }, [router]);

  // Routes without any layout
  const noLayoutRoutes = [
    "/signin",
    "/onboarding/signup",
    "/onboarding/verify-email",
    "/password/forgot-password",
    "/password/reset-password",
  ];

  // Check if current route is a buyer route
  const isBuyerRoute = router.pathname.startsWith("/auth/buyer");
  const isNoLayout = noLayoutRoutes.includes(router.pathname);

  // Get the appropriate layout
  const getLayout = () => {
    // If page has custom layout, use it
    if (PageComponent.getLayout) {
      return PageComponent.getLayout(<PageComponent {...pageProps} />);
    }

    // If it's a no-layout route, render without layout
    if (isNoLayout) {
      return <PageComponent {...pageProps} />;
    }

    // If it's a buyer route, use BuyerDashboardLayout
    if (isBuyerRoute) {
      return (
        // <div className="">
          <BuyerDashboardLayout>
            <PageComponent {...pageProps} />
          </BuyerDashboardLayout>
        // </div>
      );
    }

    // Default to MainLayout for all other routes
    return (
      <MainLayout>
        <PageComponent {...pageProps} />
      </MainLayout>
    );
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <BaseLoader />
        </div>
      )}

      {/* Pages with appropriate layouts */}
      {getLayout()}

      {/* Global Toast container */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
            borderRadius: "8px",
          },
          success: {
            style: {
              background: "#16a34a",
            },
          },
          error: {
            style: {
              background: "#dc2626",
            },
          },
        }}
      />
    </>
  );
}