import React from 'react';
import MarketPlaceLayout from '@/layouts/MarketPlaceLayout';
import { ProductFilterLayout } from '@/components/common/MarketPlace/ProductFilterLayout';
import { AllProducts} from '@/data/ProductsData';

const BestSellingProductsPage = () => {
    return (
        <ProductFilterLayout
            title="Best Selling Products"
            routes={[
                { name: "Best Selling", href: "/marketplace/best-selling" }
            ]}
            products={AllProducts}
            productUrl='/market/marketplace/product'
            categoryType='all'
        />
    );
};

BestSellingProductsPage.getLayout = (page: React.ReactNode) => (
    <MarketPlaceLayout>{page}</MarketPlaceLayout>
);

export default BestSellingProductsPage;

