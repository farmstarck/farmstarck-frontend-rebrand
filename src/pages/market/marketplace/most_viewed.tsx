import React, { useEffect, useState } from "react";
import MarketPlaceLayout from "@/layouts/MarketPlaceLayout";
import { ProductFilterLayout } from "@/components/common/MarketPlace/ProductFilterLayout";
import { AllProducts } from "@/data/ProductsData";
import { useProductFilters } from "@/hooks/useProductFilter";
import { Product, SubCategory } from "@/types/prisma-schema-types";
import ProductService from "@/services/product.service";
import CategoryService from "@/services/category.service";

const MostViewedProductsPage = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [locations, setLocations] = useState<string[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[] | null>(
    null,
  );

  const { filters, actions } = useProductFilters();

  // Fetch products
  useEffect(() => {
    ProductService.getMostViewedProducts(filters)
      .then((res) => setProducts(res.data.data))
      .catch(console.error);
  }, [filters]);

  // Fetch subcategories
  useEffect(() => {
    CategoryService.getAllSubCategories()
      .then((res) => setSubCategories(res.data.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!products) return;
    const unique = [
      ...new Set(products.map((p) => p.location).filter(Boolean)),
    ];
    setLocations(unique);
  }, [products]);

  const hasActiveFilters =
    filters.locations.length > 0 ||
    filters.attributes.length > 0 ||
    !!filters.priceRange;

  const totalActiveFilters =
    filters.locations.length +
    filters.attributes.length +
    (filters.priceRange ? 1 : 0);
  return (
    <ProductFilterLayout
      title="Most Viewed Products"
      routeName="most-viewed"
      products={products ?? []}
      subCategories={subCategories ?? []}
      locations={locations}
      filters={filters}
      actions={actions}
      hasActiveFilters={hasActiveFilters}
      totalActiveFilters={totalActiveFilters}
      showPagination={true}
    >
      {/* Optional: Add custom content for this page */}
      <div className="my-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-600">
          💡 Trending items based on customer interest
        </p>
      </div>
    </ProductFilterLayout>
  );
};

MostViewedProductsPage.getLayout = (page: React.ReactNode) => (
  <MarketPlaceLayout>{page}</MarketPlaceLayout>
);

export default MostViewedProductsPage;
