import "@/styles/globals.css";
import type { AppProps } from "next/app";
import MainLayout from "@/layouts/MainLayout";
import React, { useEffect, useState } from "react";
import BaseLoader from "@/Loaders/BaseLoader";
import { useRouter } from "next/router";

type NextPageWithLayout = AppProps["Component"] & {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
};

export default function App({ Component, pageProps }: AppProps) {
  const PageComponent = Component as NextPageWithLayout;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) => {
      // Only show loader if navigating to a different page
      if (url !== router.asPath) {
        setLoading(true);
      }
    };

    const handleComplete = () => {
      // Add a delay before hiding the loader for smoother transition
      setTimeout(() => {
        setLoading(false);
      }, 1000); // 1 second delay, adjust as needed (1000-2000ms)
    };

    const handleError = () => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
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

  // If the page defines its own layout, use it. Otherwise, wrap in MainLayout.
  const getLayout =
    PageComponent.getLayout ||
    ((page: React.ReactNode) => <MainLayout>{page}</MainLayout>);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <BaseLoader />
        </div>
      )}
      {getLayout(<PageComponent {...pageProps} />)}
    </>
  );
}