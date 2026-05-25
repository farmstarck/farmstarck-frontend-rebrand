"use client";
import Image from "next/image";
import {
  Headphones,
  Smartphone,
  ShieldCheck,
  BadgeCheck,
  Truck,
  BadgeDollarSign,
} from "lucide-react";
import Button from "@/ui/Button";
import { useRouter } from "next/router";
import { Product } from "@/types/prisma-schema-types";
import { ProductFilter } from "@/hooks/useProductFilter";
import ProductCard from "./ProductCard";
import { useQueries } from "@tanstack/react-query";
import { productQueries } from "@/queries/product.queries";

const FEATURES = [
  {
    title: "Great Value",
    icon: BadgeDollarSign,
    desc: "Competitive prices on over 3 thousands of items.",
  },
  {
    title: "Nationwide Shipping",
    icon: Truck,
    desc: "We ship to over 10 states and regions in Nigeria",
  },
  {
    title: "Secure Payment",
    icon: ShieldCheck,
    desc: "Pay with the most popular and secure payment methods.",
  },
  {
    title: "Buyer Protection Policy",
    icon: BadgeCheck,
    desc: "Protection policy covers all your purchase journey.",
  },
  {
    title: "Help Center",
    icon: Headphones,
    desc: "24/7 assistance for a smooth shopping experience.",
  },
  {
    title: "Shop Better",
    icon: Smartphone,
    desc: "Our Mobile App is coming soon for the best experience.",
  },
];

const SMALL_FILTER = { size: 10 } as ProductFilter;
const BEST_SELLING_FILTER = { size: 5 } as ProductFilter;

type ProductSectionProps = {
  title: string;
  route: string;
  products: Product[];
};

const ProductSection = ({ title, route, products }: ProductSectionProps) => {
  const router = useRouter();
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <button
          onClick={() => router.push(route)}
          className="text-[#00C700] font-medium hover:underline text-sm"
        >
          View All
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

const OtherProducts = () => {
  const [allProducts, mostViewed, bestSelling] = useQueries({
    queries: [
      {
        ...productQueries.allProducts(SMALL_FILTER),
        select: (res: unknown) =>
          (res as { data: { data: Product[] } }).data.data,
      },
      {
        ...productQueries.mostViewed(SMALL_FILTER),
        select: (res: unknown) =>
          (res as { data: { data: Product[] } }).data.data,
      },
      {
        ...productQueries.bestSelling(BEST_SELLING_FILTER),
        select: (res: unknown) =>
          (res as { data: { data: Product[] } }).data.data,
      },
    ],
  });

  return (
    <div className="w-full py-8">
      <div className="w-11/12 lg:max-w-6xl mx-auto flex items-start flex-col gap-10">
        <ProductSection
          title="All Products"
          route="marketplace/allproducts"
          products={allProducts.data ?? []}
        />

        <ProductSection
          title="Most Viewed Products"
          route="marketplace/most_viewed"
          products={mostViewed.data ?? []}
        />

        {/* WhatsApp CTA Banner */}
        <div className="w-full mt-10 bg-primary p-4 rounded-lg flex items-start lg:items-center gap-5 flex-col lg:flex-row">
          <div className="w-full h-72 lg:h-96 lg:w-1/2 relative">
            <img
              src="/assets/images/marketplaces/foodVeges.png"
              alt="food image"
              className="object-contain"
            />
          </div>
          <div className="w-full lg:w-1/2 max-w-md flex items-start flex-col gap-5">
            <h2 className="leading-normal font-bold text-white text-2xl">
              Buy and Pay directly from whatsapp, and get your produce delivered
              at your doorstep
            </h2>
            <Button
              label="Order Now"
              textClass="!bg-yellowish text-sm text-dark-green"
            />
          </div>
        </div>

        <ProductSection
          title="Best Selling Products"
          route="marketplace/best_selling"
          products={bestSelling.data ?? []}
        />
      </div>

      {/* Request Product CTA */}
      <div className="w-full bg-white p-5 lg:p-10 my-10 lg:py-20">
        <div className="w-full mx-auto flex lg:items-center gap-10 flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 flex items-start flex-col gap-4">
            <div className="text-4xl font-bold max-w-md">
              Looking for a product that is not listed here?
            </div>
            <p className="font-medium satoshi">
              Request the product right away and we will help you source for it
            </p>
            <Button label="Request a Product" />
          </div>
          <div className="w-full lg:w-1/2 lg:h-96 h-72 relative">
            <Image
              src="/assets/images/marketplaces/vegetables.png"
              alt="veges image"
              fill
            />
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {FEATURES.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="flex items-center flex-col gap-3 p-4 rounded-lg"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center flex-col">
                <h3 className="font-extrabold text-lg">{feature.title}</h3>
                <p className="font-normal text-sm max-w-2/3 text-center">
                  {feature.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OtherProducts;
