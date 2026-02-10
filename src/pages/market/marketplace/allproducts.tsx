import React, { useEffect, useState } from "react";
import MarketPlaceLayout from "@/layouts/MarketPlaceLayout";
import { ProductFilterLayout } from "@/components/common/MarketPlace/ProductFilterLayout";
import Button from "@/ui/Button";
import ProductService from "@/services/product.service";
import CategoryService from "@/services/category.service";
import { Product, SubCategory } from "@/types/prisma-schema-types";
import { useProductFilters } from "@/hooks/useProductFilter";

const AllProductsPage = () => {
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
    ProductService.getAllProducts(filters)
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
      title="All Products"
      routeName="all-products"
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
    >
      {/* CTA Banner */}
      <div className="my-10 w-full">
        <div className="w-full bg-primary rounded-lg py-5">
          <div className="w-11/12 mx-auto flex lg:items-center gap-10 flex-col lg:flex-row">
            <div className="w-full text-white lg:w-1/2 flex items-start flex-col gap-4">
              <div className="text-4xl font-bold max-w-md">
                Looking for a product that is not listed here?
              </div>
              <p className="font-medium satoshi">
                Request the product right away and we will help you source for
                it
              </p>
              <Button
                label="Request a Product"
                textClass="!bg-yellowish text-sm !text-dark-green font-semibold"
              />
            </div>
            <div className="w-full lg:w-1/2 lg:h-96 h-72 relative">
              <img
                src="/assets/images/marketplaces/vegetables.png"
                alt="veges image"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </ProductFilterLayout>
  );
};

AllProductsPage.getLayout = (page: React.ReactNode) => (
  <MarketPlaceLayout>{page}</MarketPlaceLayout>
);

export default AllProductsPage;
