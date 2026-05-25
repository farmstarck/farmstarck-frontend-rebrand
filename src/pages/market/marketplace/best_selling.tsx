import React from "react";
import MarketPlaceLayout from "@/layouts/MarketPlaceLayout";
import { ProductFilterLayout } from "@/components/common/MarketPlace/ProductFilterLayout";
import { useProductPage } from "@/hooks/useProductPage";
import { productQueries } from "@/queries/product.queries";

const BestSellingProductsPage = () => {
  const pageProps = useProductPage(productQueries.bestSelling);

  return (
    <ProductFilterLayout
      title="Best Selling Products"
      routeName="best-selling"
      showPagination
      {...pageProps}
    />
  );
};

BestSellingProductsPage.getLayout = (page: React.ReactNode) => (
  <MarketPlaceLayout>{page}</MarketPlaceLayout>
);

export default BestSellingProductsPage;
