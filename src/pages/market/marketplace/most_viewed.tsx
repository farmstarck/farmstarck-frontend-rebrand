import React from "react";
import MarketPlaceLayout from "@/layouts/MarketPlaceLayout";
import { ProductFilterLayout } from "@/components/common/MarketPlace/ProductFilterLayout";
import { useProductPage } from "@/hooks/useProductPage";
import { productQueries } from "@/queries/product.queries";

const MostViewedProductsPage = () => {
  const pageProps = useProductPage(productQueries.mostViewed);
  return (
    <ProductFilterLayout
      title="Most Viewed Products"
      routeName="most-viewed"
      showPagination
      {...pageProps}
    >
      <div className="my-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-600">
          Trending items based on customer interest
        </p>
      </div>
    </ProductFilterLayout>
  );
};

MostViewedProductsPage.getLayout = (page: React.ReactNode) => (
  <MarketPlaceLayout>{page}</MarketPlaceLayout>
);

export default MostViewedProductsPage;
