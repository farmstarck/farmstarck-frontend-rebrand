"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CategoryService from "@/services/category.service";
import { Category } from "@/types/prisma-schema-types";

const ShopByCategory = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Categories");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (!categories) return;

    CategoryService.getAllCategories()
      .then((res) => setCategories(res.data.data))
      .catch(console.error);
  }, []);

  return (
    <div className="mt-6 w-11/12 lg:max-w-6xl mx-auto">
      <div className="mb-4">
        <div className="text-start font-bold text-2xl">Shop by Category</div>
      </div>

      <div className="w-full">
        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Category Items */}
          {categories.map((item, i) => (
            <Link
              key={i}
              href={`/market/marketplace/${item.slug}`}
              onClick={() => {
                setSelectedCategory(item.name);
              }}
              className={`flex  items-center  bg-gray-50 gap-3 p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                selectedCategory === item.name
                  ? "border-[#00C700] bg-lite"
                  : "border-gray-200 hover:border-[#00C700]"
              }`}
            >
              <div className="w-10 h-10  relative">
                <Image
                  src={item.image_url}
                  alt={item.name}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xs md:text-sm capitalize  text-start font-medium">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopByCategory;
