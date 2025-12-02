import React from 'react';
import MarketPlaceLayout from '@/layouts/MarketPlaceLayout';
import { ProductFilterLayout } from '@/components/common/MarketPlace/ProductFilterLayout';
import { AllProducts, categoryGroups } from '@/data/ProductsData';

const MostViewedProductsPage = () => {
    return (
        <ProductFilterLayout
            title="Most Viewed Products"
            routes={[
                { name: "Most Viewed", href: "/marketplace/most-viewed" }
            ]}
            products={AllProducts}
            categoryGroups={categoryGroups}
            productUrl='/market/marketplace/product'
            showPagination={false} // Optional: hide pagination for this page
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