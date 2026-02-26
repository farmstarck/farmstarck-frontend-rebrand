import React, { useEffect, useState } from "react";
import MarketPlaceLayout from "@/layouts/MarketPlaceLayout";
import { ProductFilterLayout } from "@/components/common/MarketPlace/ProductFilterLayout";
import ProductService from "@/services/product.service";
import CategoryService from "@/services/category.service";
import { useProductFilters } from "@/hooks/useProductFilter";
import { Product, SubCategory } from "@/types/prisma-schema-types";

const BestSellingProductsPage = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [locations, setLocations] = useState<string[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[] | null>(
    null,
  );
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const { filters, actions } = useProductFilters();

  // Fetch products
  useEffect(() => {
    ProductService.getBestSellingProducts(filters)
      .then((res) => {
        setProducts(res.data.data);
        setTotalPages(res.data.pagination.totalPages);
        setCurrentPage(res.data.pagination.currentPage);
      })
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
      title="Best Selling Products"
      routeName="best-selling"
      products={products ?? []}
      subCategories={subCategories ?? []}
      locations={locations}
      filters={filters}
      actions={actions}
      hasActiveFilters={hasActiveFilters}
      totalActiveFilters={totalActiveFilters}
      totalPages={totalPages}
      currentPage={currentPage}
      showPagination={true}
    />
  );
};

BestSellingProductsPage.getLayout = (page: React.ReactNode) => (
  <MarketPlaceLayout>{page}</MarketPlaceLayout>
);

export default BestSellingProductsPage;
