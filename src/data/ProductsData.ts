import { FilterGroup, productsProps } from "@/types/products";

export const AllProducts: productsProps[] = [
  {
    size: "Tuber",
    title: "Yam 1 Tuber",
    amount: 2500,
    // amountTo: 5000,
    location: "Lagos",
    id: 1,
    image: "/assets/images/marketplaces/smallYam.png",
    category: "Food",
    subCategory: "Tubers",
    type: "Fresh/Raw Food",
    quantityType: "Unit",
    weight: "1 - 3kg",
  },
  {
    size: "Bag",
    id: 2,
    title: "Bull Rice",
    quantity: "50kg",
    amount: 47000,
    // amountTo: 54000,
    location: "Lagos",
    image: "/assets/images/marketplaces/rice.png",
    category: "Food",
    subCategory: "Grains",
    type: "Processed Food",
    quantityType: "Bulk",
    weight: "More than 10kg",
  },
  {
    size: "Crate",
    title: "Farm Eggs",
    quantity: "30pcs",
    amount: 4700,
    id: 3,
    // amountTo: 5400,
    location: "Lagos",
    image: "/assets/images/marketplaces/eggs.png",
    category: "Food",
    subCategory: "Livestock",
    type: "Fresh/Raw Food",
    quantityType: "Bulk",
  },
  {
    size: "Each",
    title: "Layer Hen",
    id: 4,
    amount: 4700,
    // amountTo: 5400,
    location: "Lagos",
    image: "/assets/images/marketplaces/chicken.png",
    category: "Food",
    subCategory: "Livestock",
    type: "Fresh/Raw Food",
    quantityType: "Unit",
  },
  {
    size: "Carton",
    title: "Green Apple",
    id: 5,
    quantity: "1 carton",
    // amountFrom: 58500,
    amount: 64200,
    location: "Lagos",
    image: "/assets/images/marketplaces/apples.png",
    category: "Food",
    subCategory: "Fruits",
    type: "Fresh/Raw Food",
    quantityType: "Bulk",
    weight: "5 - 1kg",
  },
  {
    size: "Bag",
    title: "Soya Bean",
    quantity: "50kg",
    // amountFrom: 58500,
    id: 6,
    amount: 64200,
    location: "Lagos",
    image: "/assets/images/marketplaces/soya.png",
    category: "Animal Feed & Supplement",
    subCategory: "Meal Feeds",
    type: "Feeds",
    quantityType: "Bulk",
    brand: "Topfeeds",
    weight: "More than 10kg",
  },
  {
    size: "Kilogram",
    title: "Frozen Cow Meat",
    quantity: "10kg",
    amount: 5800,
    id: 7,
    // amountTo: 6400,
    location: "Lagos",
    image: "/assets/images/marketplaces/meat.png",
    category: "Food",
    subCategory: "Livestock",
    type: "Processed Food",
    quantityType: "Bulk",
    weight: "More than 10kg",
  },
  {
    size: "Each",
    title: "Cassava Fertilizer",
    amount: 20600,
    // amountTo: 25900,
    id: 8,
    location: "Lagos",
    image: "/assets/images/marketplaces/fertilizer.png",
    category: "Agro Chemicals",
    subCategory: "Fertilizers",
    quantityType: "Unit",
    brand: "Olam",
  },
  {
    size: "Kilogram",
    title: "Dried Ginger",
    quantity: "5kg",
    amount: 19390,
    id: 9,
    // amountTo: 21900,
    location: "Lagos",
    image: "/assets/images/marketplaces/ginger.png",
    category: "Food",
    subCategory: "Vegetables",
    type: "Fresh/Raw Food",
    quantityType: "Bulk",
    weight: "5 - 1kg",
  },
  {
    size: "Each",
    title: "Water Can dispenser",
    amount: 15090,
    id: 10,
    // amountTo: 21900,
    location: "Benue",
    image: "/assets/images/marketplaces/dispenser.png",
    category: "Farm Machine And Equipment",
    subCategory: "Others",
    condition: "Brand New",
    quantityType: "Unit",
    type: "Others",
  },
];

export const categoryGroups = [
  {
    groupName: "Food",
    items: [
      "Vegetables",
      "Grains",
      "Livestock",
      "Seed/Nut",
      "Tubers",
      "Fruits",
      "Raw Food",
      "Processed Food",
      "Others",
    ],
  },
  {
    groupName: "Animal Feed & Supplement",
    items: [
      "Roughages",
      "Concentrates",
      "Mixed Feeds",
      "Meal Feeds",
      "Additives",
      "Nutrient Feed Supplement",
      "Non-Nutrient Feed Supplement",
    ],
  },
  {
    groupName: "Agro Chemicals",
    items: [
      "Fertilizers",
      "Herbicides",
      "Fungicides",
      "Veterinary Chemicals",
      "Others",
    ],
  },
  {
    groupName: "Farm Machine & Equipment",
    items: [
      "Planting Equipment",
      "Harvesting Equipment",
      "Irrigation Equipment",
      "Cultivation Equipment",
      "Crop/Poultry Equipment",
      "Others",
    ],
  },
];

// Food Category Filters
export const foodFilters: FilterGroup[] = [
  {
    groupName: "Type",
    items: ["Show All", "Fresh/Raw Food", "Processed Food"],
  },
  {
    groupName: "Quantity",
    items: ["Show All", "Bulk", "Unit"],
  },
  {
    groupName: "Count",
    items: [
      "Show All",
      "Pieces",
      "Dozen",
      "Kilogram",
      "Carton",
      "Bag",
      "Crate",
      "Each",
      "Basket",
    ],
  },
  {
    groupName: "Weight",
    items: [
      "Show All",
      "100 - 1000g",
      "1 - 3kg",
      "3 - 5kg",
      "5 - 1kg",
      "More than 10kg",
    ],
  },
  {
    groupName: "Volume",
    items: ["Show All", "5 - 10ltr", "10 - 50ltr", "More than 50ltr"],
  },
  {
    groupName: "Discount",
    items: ["Show All", "With Discount", "Without Discount"],
  },
];

// Animal Feed & Supplement Filters
export const animalFeedFilters: FilterGroup[] = [
  {
    groupName: "Type",
    items: ["Show All", "Feeds", "Supplements"],
  },
  {
    groupName: "Quantity",
    items: ["Show All", "Bulk", "Unit"],
  },
  {
    groupName: "Brand",
    items: ["Show All", "Topfeeds", "Vital", "Happy Feed", "Olam", "Others"],
  },
  {
    groupName: "Weight",
    items: [
      "Show All",
      "100 - 1000g",
      "1 - 3kg",
      "3 - 5kg",
      "5 - 1kg",
      "More than 10kg",
    ],
  },
  {
    groupName: "Discount",
    items: ["Show All", "With Discount", "Without Discount"],
  },
];

// Agro Chemicals Filters
export const agroChemicalsFilters: FilterGroup[] = [
  {
    groupName: "Brand",
    items: ["Show All", "Olam", "Mamizo", "VRM", "Sygent", "Others"],
  },
  {
    groupName: "Quantity",
    items: ["Show All", "Bulk", "Unit"],
  },
  {
    groupName: "Discount",
    items: ["Show All", "With Discount", "Without Discount"],
  },
];

// Farm Machinery & Equipment Filters
export const farmMachineryFilters: FilterGroup[] = [
  {
    groupName: "Condition",
    items: [
      "Show All",
      "Brand New",
      "Fairly Used",
      "Seller Refurbished",
      "Manufacturer Refurbished",
    ],
  },
  {
    groupName: "Quantity",
    items: ["Show All", "Bulk", "Unit"],
  },
  {
    groupName: "Type",
    items: [
      "Show All",
      "Milling Machines",
      "Ammonia Sprayers",
      "Cages",
      "Fish Ponds",
      "Cassava Processing Machines",
      "Chicken Processing Equipment",
      "Feeders",
      "Fillers",
      "Fogging Machines",
      "Incubators",
      "Irrigation Hoses",
      "Irrigation Sprinklers",
      "Others",
    ],
  },
  {
    groupName: "Brand",
    items: ["Show All", "With Discount", "Without Discount"],
  },
];




// export const mockProduct = [
//   {
//     id: 1,
//     size: '20',
//     title: "Mango",
//     amount: 2000,
//     quantity: "two",
//     location: "Lagos",
//     image: "/assets/images/marketplaces/dispenser.png",
//     category: "farm_machinery",
//     subCategory: "tracktor",
//     type: "boss",
//     quantityType: "many",
//     brand: "nike",
//     weight: "20kg",
//     volume: "10l",
//     discount: "none",
//     condition: "good"
//   }
// ]

const productImgPath="/assets/images/marketplaces"

export const MerchantProducts:merchantProductProps[] = [
  {
    id: "prod_1",
    name: "Fresh Tomatoes Basket",
    description: "Farm-fresh tomatoes harvested daily.",
    pricePerUnit: 5000,
    discountPerUnit: 500,
    stockQuantity: 120,
    categoryId: "cat_agric",
    subcategoryId: "sub_fruits",
    countType: "basket",
    weightRange: "5-7kg",
    volumeRange: null,
    brand: null,
    quantityType: "bulk",
    condition: "new",
    status: "active",
    produceType: "Fresh",
    quantityPerUnit: 50,
    sku: "TOM-BSK-001",
    imageUrl: `${productImgPath}/chicken.png`,
    images: [`${productImgPath}/eggs.png`, `${productImgPath}/food.png`],
    location: "Lagos",
    expiryDate: new Date("2026-04-10"),
    specifications: null,
    ratingSum: 45,
    popularity: 80,
    soldCount: 150,
    viewCount: 500,
    isActive: true,
    deletedAt: null,
    createdAt: new Date(),
    userId: "user_1",
  },
  {
    id: "prod_2",
    name: "Organic Fertilizer",
    description: "Eco-friendly fertilizer for improved crop yield.",
    pricePerUnit: 12000,
    discountPerUnit: 1000,
    stockQuantity: 60,
    categoryId: "cat_agric",
    subcategoryId: "sub_chemicals",
    countType: "bag",
    weightRange: "25kg",
    volumeRange: null,
    brand: "AgroPlus",
    quantityType: "unit",
    condition: "new",
    status: "active",
    produceType: null,
    quantityPerUnit: 1,
    sku: "FERT-ORG-002",
   imageUrl: `${productImgPath}/meat.png`,
    images: [`${productImgPath}/soya.png`, `${productImgPath}/rice.png`],
    location: "Abuja",
    expiryDate: new Date("2027-01-01"),
    specifications: { composition: "NPK 20-10-10" },
    ratingSum: 30,
    popularity: 50,
    soldCount: 70,
    viewCount: 200,
    isActive: true,
    deletedAt: null,
    createdAt: new Date(),
    userId: "user_2",
  },
  {
    id: "prod_3",
    name: "Irrigation Water Pump",
    description: "High-performance water pump for irrigation systems.",
    pricePerUnit: 85000,
    discountPerUnit: 5000,
    stockQuantity: 15,
    categoryId: "cat_equipment",
    subcategoryId: "sub_machinery",
    countType: null,
    weightRange: null,
    volumeRange: null,
    brand: "PumpMaster",
    quantityType: "unit",
    condition: "new",
    status: "active",
    produceType: null,
    quantityPerUnit: 1,
    sku: "PUMP-IRR-003",
    imageUrl: `${productImgPath}/categories/foods/fruits.png`,
    images: [`${productImgPath}/categories/foods/grains.png`, `${productImgPath}/categories/foods/livestock.png`],
    location: "Kano",
    expiryDate: null,
    specifications: { horsepower: "5HP", material: "Steel" },
    ratingSum: 20,
    popularity: 40,
    soldCount: 25,
    viewCount: 120,
    isActive: true,
    deletedAt: null,
    createdAt: new Date(),
    userId: "user_3",
  },
  {
    id: "prod_4",
    name: "Processed Palm Oil",
    description: "High-quality processed palm oil for cooking.",
    pricePerUnit: 8000,
    discountPerUnit: 800,
    stockQuantity: 200,
    categoryId: "cat_agric",
    subcategoryId: "sub_processed",
    countType: "keg",
    weightRange: null,
    volumeRange: "10L",
    brand: null,
    quantityType: "bulk",
    condition: "new",
    status: "active",
    produceType: "Processed",
    quantityPerUnit: 1,
    sku: "PALM-OIL-004",
    imageUrl: `${productImgPath}/ginger.png`,
    images: [`${productImgPath}/feeds.png`, `${productImgPath}/meat.png`],
    location: "Port Harcourt",
    expiryDate: new Date("2026-12-31"),
    specifications: null,
    ratingSum: 60,
    popularity: 90,
    soldCount: 220,
    viewCount: 600,
    isActive: true,
    deletedAt: null,
    createdAt: new Date(),
    userId: "user_4",
  },
  {
    id: "prod_5",
    name: "Maize Grain Sack",
    description: "Dry maize grains suitable for feed and consumption.",
    pricePerUnit: 15000,
    discountPerUnit: 1500,
    stockQuantity: 90,
    categoryId: "cat_agric",
    subcategoryId: "sub_grains",
    countType: "sack",
    weightRange: "50kg",
    volumeRange: null,
    brand: null,
    quantityType: "bulk",
    condition: "new",
    status: "active",
    produceType: "Fresh",
    quantityPerUnit: 1,
    sku: "MAIZE-SCK-005",
   imageUrl: `${productImgPath}/apples.png`,
    images: [`${productImgPath}/dispenser.png`, `${productImgPath}/ginger.png`],
    location: "Kaduna",
    expiryDate: new Date("2026-09-01"),
    specifications: null,
    ratingSum: 25,
    popularity: 55,
    soldCount: 110,
    viewCount: 300,
    isActive: true,
    deletedAt: null,
    createdAt: new Date(),
    userId: "user_5",
  },
];



export interface merchantProductProps {
  id: string;
  name: string;
  description: string;
  pricePerUnit: number;
  discountPerUnit: number;
  stockQuantity: number;
  categoryId: string;
  subcategoryId: string;
  countType: string | null;
  weightRange: string | null;
  volumeRange: string | null;
  brand: string | null;
  quantityType: string;
  condition: string;
  status: string;
  produceType: string | null;
  quantityPerUnit: number;
  sku: string;
  imageUrl: string;
  images: string[];
  location: string;
  expiryDate: Date | null;
  specifications: Record<string, string> | null;
  ratingSum: number;
  popularity: number;
  soldCount: number;
  viewCount: number;
  isActive: boolean;
  deletedAt: Date | null;
  createdAt: Date;
  userId: string;
}


 