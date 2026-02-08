export enum SignUpType {
  email = "email",
  google = "google",
}

export enum PaymentMethod {
  paystack = "paystack",
  flutterwave = "flutterwave",
  wallet = "wallet",
  whatsapp = "whatsapp",
}

export enum ShippingMethod {
  door_delivery = "door_delivery",
  store_pickup = "store_pickup",
}

export enum ProductStatus {
  pending = "pending",
  active = "active",
  inactive = "inactive",
}

export enum OrderStatus {
  pending = "pending",
  ready_to_ship = "ready_to_ship",
  shipped = "shipped",
  cancelled = "cancelled",
  delivered = "delivered",
}

export enum VerificationStatus {
  pending = "pending",
  approved = "approved",
  rejected = "rejected",
  cancelled = "cancelled",
}

export enum Role {
  user = "user",
  merchant = "merchant",
  farmer = "farmer",
  business = "business",
  investor = "investor",
  admin = "admin",
  super_admin = "super_admin",
}

export enum ProductCondition {
  new = "new",
  fairly_used = "fairly_used",
  seller_refurbished = "seller_refurbished",
  manufacturer_refurbished = "manufacturer_refurbished",
  other = "other",
}

export enum ProductQuantityType {
  bulk = "bulk",
  unit = "unit",
}

export enum TransactionType {
  credit = "credit",
  debit = "debit",
}

export enum CountType {
  pieces = "pieces",
  dozen = "dozen",
  kilogram = "kilogram",
  carton = "carton",
  liter = "liter",
  crate = "crate",
  bag = "bag",
  basket = "basket",
  each = "each",
  pack = "pack",
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  phoneNumber?: string;
  image_url?: string;
  address?: string;
  isEmailVerified: boolean;
  role: Role;
  enable2FA: boolean;
  signUpType: SignUpType;
  createdAt: string;
  updateAt: string;

  wallet?: Wallet;
  merchantProfile?: Merchant;
  farmerProfile?: Farmer;
  businessProfile?: Business;
  investorProfile?: Investor;

  addresses?: Address[];
  reviews?: Review[];
  cart?: Cart;
  wishlist?: Wishlist;
  orders?: Order[];
}

export interface Address {
  id: string;
  userId: string;
  street: string;
  recipientName: string;
  landmark?: string;
  phoneNumber?: string;
  email?: string;
  city: string;
  state: string;
  country: string;
  isDefault: boolean;
  createdAt: string;

  user: User;
  orders?: Order[];
}

export interface Merchant {
  id: string;
  userId: string;
  shopName: string;
  businessCategory: string;
  businessEmail: string;
  phoneNumber: string;
  businessAddress: string;
  businessLogo?: string;
  verificationStatus: VerificationStatus;
  createdAt: string;

  products?: Product[];
}

export interface Farmer {
  id: string;
  userId: string;
  farmName: string;
  farmType: string;
  farmAddress: string;
  farmSize?: number;
  produceTypes?: string;
  proofOfOwnershipUrl?: string;
  farmPhotoUrl?: string;
  proofOfAddressUrl?: string;
  verificationStatus: VerificationStatus;
  createdAt: string;

  products?: Product[];
}

export interface Business {
  id: string;
  userId: string;
  businessName: string;
  businessType: string;
  rcNumber: string;
  contactPerson: string;
  officeEmail: string;
  officeAddress: string;
  phoneNumber: string;
  validIdUrl: string;
  proofOfAddressUrl: string;
  cacUrl: string;
  tinNumber?: string;
  businessLogo?: string;
  verificationStatus: VerificationStatus;
  createdAt: string;
}

export interface Investor {
  id: string;
  userId: string;
  country: string;
  investmentType: string;
  sourceOfFunds: string;
  validIdUrl: string;
  proofOfAddressUrl: string;
  verificationStatus: VerificationStatus;
  createdAt: string;
}

export interface Merchant {
  id: string;
  userId: string;
  shopName: string;
  businessCategory: string;
  businessEmail: string;
  phoneNumber: string;
  businessAddress: string;
  businessLogo?: string;
  verificationStatus: VerificationStatus;
  createdAt: string;

  products?: Product[];
}

export interface Farmer {
  id: string;
  userId: string;
  farmName: string;
  farmType: string;
  farmAddress: string;
  farmSize?: number;
  produceTypes?: string;
  proofOfOwnershipUrl?: string;
  farmPhotoUrl?: string;
  proofOfAddressUrl?: string;
  verificationStatus: VerificationStatus;
  createdAt: string;

  products?: Product[];
}

export interface Business {
  id: string;
  userId: string;
  businessName: string;
  businessType: string;
  rcNumber: string;
  contactPerson: string;
  officeEmail: string;
  officeAddress: string;
  phoneNumber: string;
  validIdUrl: string;
  proofOfAddressUrl: string;
  cacUrl: string;
  tinNumber?: string;
  businessLogo?: string;
  verificationStatus: VerificationStatus;
  createdAt: string;
}

export interface Investor {
  id: string;
  userId: string;
  country: string;
  investmentType: string;
  sourceOfFunds: string;
  validIdUrl: string;
  proofOfAddressUrl: string;
  verificationStatus: VerificationStatus;
  createdAt: string;
}

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  currency: string;
  createdAt: string;

  transactions?: WalletTransaction[];
}

export interface WalletTransaction {
  id: string;
  walletId: string;
  amount: number;
  type: TransactionType;
  reference?: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
  image_url: string;
  createdAt: string;
  updatedAt: string;

  subCategory?: SubCategory[];
  products?: Product[];
  filters?: any[];
}

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;

  products?: Product[];
  category: Category;
}

export interface Product {
  id: string;
  userId: string;

  name: string;
  description: string;
  pricePerUnit: number;
  discountPerUnit: number;
  stockQuantity: number;

  categoryId: string;
  subcategoryId: string;

  countType?: CountType;
  weightRange?: string;
  volumeRange?: string;
  brand?: string;

  quantityType: ProductQuantityType;
  condition: ProductCondition;
  status: ProductStatus;

  produceType?: string;
  quantityPerUnit?: number;

  sku: string;
  imageUrl: string;
  images: string[];
  location: string;

  expiryDate?: string;
  specifications?: Record<string, any>;

  ratingSum: number;
  popularity: number;
  viewCount: number;
  soldCount: number;

  category?: Category;
  subcategory?: SubCategory;

  seller: User;
  reviews: Review[];
}

export interface Order {
  id: string;
  orderId: number;
  buyerId: string;
  subTotal: number;
  totalAmount: number;
  status: OrderStatus;
  shippingFee: number;
  paymentMethod?: PaymentMethod;
  shippingMethod: ShippingMethod;
  addressId?: string;
  trackingInfo?: Record<string, any>;

  createdAt: string;
  updatedAt: string;
  pickedAt?: string;
  shippedAt?: string;
  deliveredAt?: string;
  cancelledAt?: string;

  items: OrderItem[];
  address?: Address;
  buyer: User;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  price: number;
  quantity: number;
  sellerId?: string;
  createdAt: string;
  product: Product;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment?: string;
  userId: string;
  productId: string;
  date: string;
}

export interface Cart {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;

  cartItem?: CartItem[];
}

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;

  product: Product;
}

export interface Wishlist {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;

  wishlistItem?: WishlistItem[];
}

export interface WishlistItem {
  id: string;
  wishlistId: string;
  productId: string;

  product: Product;
}
