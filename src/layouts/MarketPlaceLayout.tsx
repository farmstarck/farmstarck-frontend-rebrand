"use client";
import CookieBanner, {
  useCookieConsent,
} from "@/components/common/CookieBanner";
import MarketHeader from "@/components/common/MarketPlace/MarketHeader";
import MarketPlaceFooter from "@/components/common/MarketPlace/MarketPlaceFooter";
import React, { useEffect } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const MarketPlaceLayout = ({ children }: { children: React.ReactNode }) => {
  const { consent } = useCookieConsent();

  useEffect(() => {
    if (!GA_ID || !consent?.analytics) return;

    // Don't add the script twice
    if (document.getElementById("ga-script")) return;

    const script = document.createElement("script");
    script.id = "ga-script";
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize gtag
    (window as unknown as Record<string, unknown>).dataLayer =
      (window as unknown as Record<string, unknown[]>).dataLayer || [];
    function gtag(...args: unknown[]) {
      ((window as unknown as Record<string, unknown[]>).dataLayer as unknown[]).push(args);
    }
    gtag("js", new Date());
    gtag("config", GA_ID);
  }, [consent?.analytics]);
  return (
    <div className="min-h-screen flex flex-col">
      <MarketHeader />
      {/* <MarketSearch /> */}
      <main className="flex-1 mt-24 pt-10  w-full bg-lite">{children}</main>
      <CookieBanner />
      <MarketPlaceFooter />
    </div>
  );
};

export default MarketPlaceLayout;
