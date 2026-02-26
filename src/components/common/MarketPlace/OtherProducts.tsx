"use client";
import { useEffect, useState } from "react";
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
import ProductService from "@/services/product.service";
import { ProductFilter } from "@/hooks/useProductFilter";
import ProductCard from "./ProductCard";

const Features = [
  {
    title: "Great Value",
    icon: BadgeDollarSign,
    desc: "Competitive prices on over 3 thousands of items.",
  },
  {
    title: "Nationwide Shipping",
    desc: "We ship to over 10 states and regions in Nigeria",
    icon: Truck,
  },
  {
    title: "Secure Payment",
    desc: "Pay with the most popular and secure payment methods.",
    icon: ShieldCheck,
  },
  {
    title: "Buyer Protection Policy",
    desc: "Protection policy covers all your purchase journey.",
    icon: BadgeCheck,
  },
  {
    title: "Help Center",
    desc: "24/7 assistance for a smooth shopping experience.",
    icon: Headphones,
  },
  {
    title: "Shop Better",
    desc: "Our Mobile App is coming soon for the best experience.",
    icon: Smartphone,
  },
];

const OtherProducts = () => {
  const router = useRouter();
  const switchPage = (route: string) => {
    router.push(route);
  };
  const [products, setProducts] = useState<Product[] | null>(null);
  const [mostViewedProducts, setMostViewedProducts] = useState<
    Product[] | null
  >(null);
  const [bestSellingProducts, setBestSellingProducts] = useState<
    Product[] | null
  >(null);

  // Fetch products
  useEffect(() => {
    ProductService.getAllProducts({ size: 10 } as ProductFilter)
      .then((res) => setProducts(res.data.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    ProductService.getMostViewedProducts({ size: 10 } as ProductFilter)
      .then((res) => setMostViewedProducts(res.data.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    ProductService.getBestSellingProducts({ size: 5 } as ProductFilter)
      .then((res) => setBestSellingProducts(res.data.data))
      .catch(console.error);
  }, []);

  return (
    <div className="w-full py-8">
      <div className="w-11/12 lg:max-w-6xl mx-auto flex items-start flex-col gap-10">
        {/* All Products Section */}
        <div className=" w-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">All Products</h2>
            <button
              onClick={() => switchPage("marketplace/allproducts")}
              className="text-[#00C700] font-medium hover:underline text-sm"
            >
              View All
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Most Viewed Products Section */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Most Viewed Products
            </h2>
            <button
              onClick={() => switchPage("marketplace/most_viewed")}
              className="text-[#00C700] font-medium hover:underline text-sm"
            >
              View All
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {mostViewedProducts?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div className="w-full mt-10 bg-primary p-4  rounded-lg flex items-start lg:items-center gap-5 flex-col lg:flex-row">
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
              at your doorstep{" "}
            </h2>
            <Button
              label="Order Now"
              textClass="!bg-yellowish text-sm text-dark-green"
            />
          </div>
        </div>
        {/* Best selling Products Section */}
        <div className="w-full ">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Best Selling Products
            </h2>
            <button
              onClick={() => switchPage("marketplace/best_selling")}
              className="text-[#00C700] font-medium hover:underline text-sm"
            >
              View All
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {bestSellingProducts?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      <div className="w-full bg-white p-5 lg:p-10 my-10 lg:py-20 ">
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

      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {Features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="flex items-center flex-col gap-3 p-4 rounded-lg  "
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
