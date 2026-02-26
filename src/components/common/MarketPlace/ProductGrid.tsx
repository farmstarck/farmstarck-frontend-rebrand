import React from "react";
import Image from "next/image";
import { Product } from "@/types/prisma-schema-types";

import ProductCard from "./ProductCard";

export interface ProductsGridProps {
  products: Product[];
  url?: string;
}

export const ProductsGrid: React.FC<ProductsGridProps> = ({ products }) => {
  // Empty state
  if (products.length === 0) {
    return (
      <div className="flex satoshi flex-col items-center justify-center py-16 px-4">
        <div className="w-52 h-52 mb-6 relative">
          <Image
            fill
            src={"/assets/images/marketplaces/notfound.png"}
            alt="not found img"
          />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          No Products Found
        </h3>
        <p className="text-gray-500 text-center max-w-md">
          We could not find any products matching your filters. Try adjusting
          your search criteria or browse all products.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
