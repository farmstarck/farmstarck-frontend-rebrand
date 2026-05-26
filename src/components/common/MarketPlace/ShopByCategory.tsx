import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Category } from "@/types/prisma-schema-types";
import { useQuery } from "@tanstack/react-query";
import { categoryQueries } from "@/queries/category.queries";
import CategoryCardSkeleton from "@/components/common/Skeletons/CategoryCardSkeleton";

const ShopByCategory = () => {
  const { data: categories = [], isLoading } = useQuery({
    ...categoryQueries.allCategories(),
    select: (res) => res.data.data as Category[],
  });

  return (
    <div className="mt-6 w-11/12 lg:max-w-6xl mx-auto">
      <div className="mb-4">
        <div className="text-start font-bold text-2xl">Shop by Category</div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <CategoryCardSkeleton key={i} />
            ))
          : categories.map((item) => (
              <Link
                key={item.id}
                href={`/market/marketplace/${item.slug}`}
                className="flex items-center bg-gray-50 gap-3 p-4 rounded-lg border-2 transition-all hover:shadow-md border-gray-200 hover:border-[#00C700]"
              >
                <div className="w-10 h-10 relative">
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xs md:text-sm capitalize text-start font-medium">
                  {item.name}
                </span>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default ShopByCategory;
