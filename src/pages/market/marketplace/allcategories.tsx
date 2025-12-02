import { CategoryFilter } from '@/components/common/MarketPlace/CategoryFilter';
import Navigation from '@/components/common/MarketPlace/Navigation';
import { PriceRangeFilter } from '@/components/common/MarketPlace/PriceRangeFilter';
import { ProductsGrid } from '@/components/common/MarketPlace/ProductGrid';
import { ProductsTopBar } from '@/components/common/MarketPlace/ProductsTopBar';
import { NavigationButtons } from '@/components/common/Navigation/NavigationButton';
import { AllProducts, categoryGroups } from '@/data/ProductsData';
import MarketPlaceLayout from '@/layouts/MarketPlaceLayout'
import Button from '@/ui/Button';
import Image from 'next/image';
import React, { useMemo, useState } from 'react'

const Allcategories = () => {
 const [sort, setSort] = useState("bulk");
    const [selectedCats, setSelectedCats] = useState<string[]>([]);
    const [filtered, setFiltered] = useState(AllProducts);

    const applyPriceFilter = (min: number, max: number) => {
        setFiltered(
            AllProducts.filter((p) => p.amount >= min && p.amount <= max)
        );
    };

    // ✅ Helper function to check if a selection is a main category or subcategory
    const getSelectedCategoriesAndSubcategories = () => {
        const mainCategories: string[] = [];
        const subCategories: string[] = [];

        selectedCats.forEach((selected) => {
            const isMainCategory = categoryGroups.some(group => group.groupName === selected);

            if (isMainCategory) {
                mainCategories.push(selected);
            } else {
                subCategories.push(selected);
            }
        });

        return { mainCategories, subCategories };
    };

    const finalList = useMemo(() => {
        let out = [...filtered];

        if (selectedCats.length) {
            const { mainCategories, subCategories } = getSelectedCategoriesAndSubcategories();

            out = out.filter((product) => {
                // ✅ Check if product's main category is selected
                const mainCategoryMatch = mainCategories.includes(product.category || "");

                // ✅ Check if product's subcategory is selected
                const subCategoryMatch = subCategories.includes(product.subCategory || "");

                // ✅ Show product if EITHER main category OR subcategory matches
                return mainCategoryMatch || subCategoryMatch;
            });
        }

        if (sort === "price_low") out.sort((a, b) => a.amount- b.amount);
        if (sort === "price_high") out.sort((a, b) => b.amount - a.amount);

        return out;
    }, [filtered, selectedCats, sort]);

    return (
        <div className='w-full py-5'>
            <div className="w-11/12 lg:max-w-7xl mx-auto ">
                <div className="">
                    <Navigation
                        routes={[
                            { name: "All Categories", href: "/marketplace" }
                        ]}
                    />
                </div>
                <div className="my-6 text-2xl font-extrabold">All Categories</div>
                <ProductsTopBar total={finalList.length} sort={sort} setSort={setSort} />
                <div className=" grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Left Filters */}
                    <div className="col-span-1 space-y-4">
                        <PriceRangeFilter products={AllProducts} onFilter={applyPriceFilter} />
                        <CategoryFilter
                            categoryGroups={categoryGroups}
                            selected={selectedCats}
                            setSelected={setSelectedCats}
                        />
                    </div>

                    {/* Main Area */}
                    <div className="col-span-3">
                        <div className="mt-4">
                            <ProductsGrid url='/market/marketplace/product' products={finalList} />
                        </div>
                    </div>
                </div>

                {/* //Pagination */}
                <div className="my-5 w-full flex items-center justify-between">
                 <NavigationButtons />
                </div>


                <div className="my-10 w-full">
                    <div className="w-full bg-primary rounded-lg py-5 ">
                        <div className="w-11/12 mx-auto flex lg:items-center gap-10 flex-col lg:flex-row">
                            <div className="w-full text-white lg:w-1/2 flex items-start flex-col gap-4">
                                <div className="text-4xl font-bold max-w-md">Looking for a product that is not listed here?</div>
                                <p className='font-medium satoshi'>Request the product right away and we will help you source for it</p>
                                <Button label='Request a Product' textClass='!bg-yellowish text-sm !text-dark-green font-semibold' />
                            </div>
                            <div className="w-full lg:w-1/2 lg:h-96 h-72 relative">
                                <Image src='/assets/images/marketplaces/vegetables.png' alt='veges image' fill />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Allcategories.getLayout = (page: React.ReactNode) => (
    <MarketPlaceLayout>{page}</MarketPlaceLayout>
)

export default Allcategories