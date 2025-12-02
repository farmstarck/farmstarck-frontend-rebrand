import React from 'react';
import MarketPlaceLayout from '@/layouts/MarketPlaceLayout';
import { ProductFilterLayout } from '@/components/common/MarketPlace/ProductFilterLayout';
import { AllProducts, categoryGroups } from '@/data/ProductsData';
import Button from '@/ui/Button';
import Image from 'next/image';

const AllProductsPage = () => {
    return (
        <ProductFilterLayout
            title="All Products"
            routes={[{ name: "All Products", href: "/marketplace" }]}
            products={AllProducts}
            categoryGroups={categoryGroups}
            productUrl='/market/marketplace/product'
        >
            {/* CTA Banner */}
            <div className="my-10 w-full">
                <div className="w-full bg-primary rounded-lg py-5">
                    <div className="w-11/12 mx-auto flex lg:items-center gap-10 flex-col lg:flex-row">
                        <div className="w-full text-white lg:w-1/2 flex items-start flex-col gap-4">
                            <div className="text-4xl font-bold max-w-md">
                                Looking for a product that is not listed here?
                            </div>
                            <p className='font-medium satoshi'>
                                Request the product right away and we will help you source for it
                            </p>
                            <Button 
                                label='Request a Product' 
                                textClass='!bg-yellowish text-sm !text-dark-green font-semibold' 
                            />
                        </div>
                        <div className="w-full lg:w-1/2 lg:h-96 h-72 relative">
                            <Image 
                                src='/assets/images/marketplaces/vegetables.png' 
                                alt='veges image' 
                                fill 
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