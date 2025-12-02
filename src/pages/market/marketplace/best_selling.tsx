import React from 'react';
import MarketPlaceLayout from '@/layouts/MarketPlaceLayout';
import { ProductFilterLayout } from '@/components/common/MarketPlace/ProductFilterLayout';
import { AllProducts, categoryGroups } from '@/data/ProductsData';

const BestSellingProductsPage = () => {
    return (
        <ProductFilterLayout
            title="Best Selling Products"
            routes={[
                { name: "Best Selling", href: "/marketplace/best-selling" }
            ]}
            products={AllProducts}
            categoryGroups={categoryGroups}
            productUrl='/market/marketplace/product'
        />
    );
};

BestSellingProductsPage.getLayout = (page: React.ReactNode) => (
    <MarketPlaceLayout>{page}</MarketPlaceLayout>
);

export default BestSellingProductsPage;

