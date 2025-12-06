import React, { useEffect, useState } from 'react'
import Image from 'next/image';

type ImageCategory = 'food' | 'agro' | 'animals' | 'farm' | 'all'

type ImageItem = {
  img: string;
  title: string;
  name: string;
  slug: string;
}

interface CategoriesImageFiltersProps {
  name: ImageCategory;
  onCategorySelect?: (slug: string, name?: string, index?: number) => void;
  selectedCategory?: { slug: string; index?: number };
}

const CategoriesImageFilters: React.FC<CategoriesImageFiltersProps> = ({
  name,
  onCategorySelect,
  selectedCategory,
}) => {
  const foodImages: ImageItem[] = [
    { img: '/assets/images/marketplaces/categories/foods/fruits.png', title: 'fruits', name: "Fruits", slug: "fruits" },
    { img: '/assets/images/marketplaces/categories/foods/grains.png', title: 'grains', name: "Grains", slug: "grains" },
    { img: '/assets/images/marketplaces/categories/foods/livestock.png', title: 'livestock', name: "Livestock", slug: "livestock" },
    { img: '/assets/images/marketplaces/categories/foods/nuts.png', title: 'seed/nuts', name: "Seed/Nuts", slug: "seed-nuts" },
    { img: '/assets/images/marketplaces/categories/foods/tubers.png', title: 'tubers', name: "Tubers", slug: "tubers" },
    { img: '/assets/images/marketplaces/categories/foods/veges.png', title: 'veges', name: "Vegetables", slug: "vegetables" }
  ]

  const agroImages: ImageItem[] = [
    { img: '/assets/images/marketplaces/categories/agro/fertilizer.png', title: 'fertilizers', name: "Fertilizers", slug: "fertilizers" },
    { img: '/assets/images/marketplaces/categories/agro/Herbicide.png', title: 'herbicides', name: "Herbicides", slug: "herbicides" },
    { img: '/assets/images/marketplaces/categories/agro/spray.png', title: 'solvent', name: "Solvents", slug: "solvents" },
    { img: '/assets/images/marketplaces/categories/agro/fungicides.png', title: 'fungicides', name: "Fungicides", slug: "fungicides" },
    { img: '/assets/images/marketplaces/categories/agro/vets.png', title: 'vets', name: "Veterinary Chemicals", slug: "veterinary-chemicals" }
  ]

  const animalFeedImages: ImageItem[] = [
    { img: '/assets/images/marketplaces/categories/animals/roughages.png', title: 'roughages', name: "Roughages", slug: "roughages" },
    { img: '/assets/images/marketplaces/categories/animals/mixed.png', title: 'mixed feeds', name: "Mixed Feeds", slug: "mixed-feeds" },
    { img: '/assets/images/marketplaces/categories/animals/nutrient.png', title: 'nutrients', name: "Nutrient Feed Supplements", slug: "nutrient-supplements" },
    { img: '/assets/images/marketplaces/categories/animals/concentrates.png', title: 'concentrates', name: "Concentrates", slug: "concentrates" },
    { img: '/assets/images/marketplaces/categories/animals/blended.png', title: 'blended feeds', name: "Blended Feeds", slug: "blended-feeds" },
    { img: '/assets/images/marketplaces/categories/animals/non-nutrient.png', title: 'non-nutrients', name: "Non-Nutrient Feed Supplements", slug: "non-nutrient-supplements" }
  ]

  const farmMachineImages: ImageItem[] = [
    { img: '/assets/images/marketplaces/categories/machinery/eq1.png', title: 'soil', name: "Soil Cultivation Equipment", slug: "cultivation-equipment" },
    { img: '/assets/images/marketplaces/categories/machinery/eq2.png', title: 'irrigation', name: "Irrigation Equipment", slug: "irrigation-equipment" },
    { img: '/assets/images/marketplaces/categories/machinery/eq3.png', title: 'protection', name: "Farm Protection Equipment", slug: "protection-equipment" },
    { img: '/assets/images/marketplaces/categories/machinery/eq4.png', title: 'planting', name: "Planting Machinery", slug: "planting-machinery" },
    { img: '/assets/images/marketplaces/categories/machinery/eq4.png', title: 'seeding', name: "Seeding Machinery", slug: "seeding-machinery" }
  ]

  const [selectedCategoryState, setSelectedCategoryState] = useState<ImageItem[]>([])

  useEffect(() => {
    switch (name) {
      case 'food':
        setSelectedCategoryState(foodImages);
        break;
      case 'agro':
        setSelectedCategoryState(agroImages);
        break;
      case 'animals':
        setSelectedCategoryState(animalFeedImages);
        break;
      case 'farm':
        setSelectedCategoryState(farmMachineImages);
        break;
      case 'all':
        setSelectedCategoryState([
          ...foodImages,
          ...agroImages,
          ...animalFeedImages,
          ...farmMachineImages
        ]);
        break;
      default:
        setSelectedCategoryState(foodImages);
    }
  }, [name])

  useEffect(() => {
    // Automatically trigger "View All" on initial render if no category is selected
    if (!selectedCategory?.slug && onCategorySelect) {
      onCategorySelect('all', 'All', -1);
    }
  }, []); // Run only once on mount

  const handleCategoryClick = (item: ImageItem, index: number) => {
    if (onCategorySelect) {
      onCategorySelect(item.slug, item.name, index);
    }
  };

  const handleViewAllClick = () => {
    if (onCategorySelect) {
      onCategorySelect('all', 'All', -1);
    }
  };

  const isSelected = (slug: string, index: number) => {
    if (selectedCategory) {
      return selectedCategory.slug === slug || selectedCategory.index === index;
    }
    return false;
  };

  // Check if "View All" should be selected
  const isViewAllSelected = () => {
    if (!selectedCategory?.slug) return true; // Default to "View All" if nothing is selected
    return selectedCategory.slug === 'all';
  };

  return (
    <div className="w-full mb-6">
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {/* View All Button - Selected by default */}
        <button
          onClick={handleViewAllClick}
          className={`
            flex-shrink-0 px-6 py-3 rounded-xl font-semibold text-sm
            transition-all duration-300 whitespace-nowrap border-2
            ${isViewAllSelected()
              ? 'bg-primary text-white shadow-md border-primary'
              : 'bg-white text-dark-green border-gray-200 hover:border-primary hover:shadow-sm'
            }
          `}
        >
          View All
        </button>

        {/* Category Image Buttons */}
        {selectedCategoryState.map((item, index) => (
          <button
            key={`${item.slug}-${index}`}
            onClick={() => handleCategoryClick(item, index)}
            className={`
              flex-shrink-0 flex flex-col items-center gap-2 p-3 rounded-xl
              transition-all duration-300 min-w-[200px] border-2
              ${isSelected(item.slug, index)
                ? 'bg-primary/10 border-primary'
                : 'bg-white border-gray-200 hover:border-primary/50'
              }
            `}
          >
            <div className="w-12 h-12 relative">
              <Image
                src={item.img}
                alt={item.name}
                fill
                className="object-contain"
                sizes="48px"
              />
            </div>
            <span className={`
              text-xs font-medium text-center
              ${isSelected(item.slug, index) ? 'text-primary' : 'text-gray-700'}
            `}>
              {item.name}
            </span>
          </button>
        ))}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

export default CategoriesImageFilters