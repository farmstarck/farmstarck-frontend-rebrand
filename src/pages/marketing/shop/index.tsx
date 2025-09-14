import ShopPage from "./Shop";
import CategoryPage from "./Category";
import CategoryDisplayPage from "./CategoryDisplay";
import ViewProductPage from "./ViewProduct";
import CartPage from "./Cart";
import WishlistPage from "./Wishlist";
import CheckoutPage from "./Checkout";
import AllProductDisplayPage from "./AllProductDisplay";

export type ProductProps = {
  id: string;
  name: string;
  description: string;
  category: string;
  pricePerUnit: number;
  discountPerUnit: number;
  type: string;
  unit: string;
  rating: number;
  sku: string;
  stockQuantity: number;
  isAvailable: boolean;
  imageUrl: string;
  reviews: ReviewProps[];
  images: string[];
};

type ReviewProps = {
  rating: GLfloat;
  comment: string;
  author: string;
  date: string;
};
export {
  ShopPage,
  CategoryPage,
  CategoryDisplayPage,
  ViewProductPage,
  CartPage,
  WishlistPage,
  CheckoutPage,
  AllProductDisplayPage,
};
