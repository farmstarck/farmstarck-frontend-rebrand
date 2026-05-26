import { CategoryGroup } from "@/components/common/MarketPlace/CategoryFilter";

export enum SignUpType {
  email = "email",
  google = "google",
}

export enum PaymentMethod {
  paystack = "paystack",
  flutterwave = "flutterwave",
  smartcash = "smartcash",
  wallet = "wallet",
  whatsapp = "whatsapp",
}

export enum ShippingMethod {
  door_delivery = "door_delivery",
  store_pickup = "store_pickup",
}

export enum ProductStatus {
  pending = "pending",
  approved = "approved",
  rejected = "rejected",
}

export enum OrderStatus {
  pending = "pending",
  partially_shipped = "partially_shipped",
  shipped = "shipped",
  partially_delivered = "partially_delivered",
  cancelled = "cancelled",
  delivered = "delivered",
}

export enum OrderItemStatus {
  pending = "pending",
  ready_to_ship = "ready_to_ship",
  shipped = "shipped",
  cancelled = "cancelled",
  delivered = "delivered",
  out_of_stock = "out_of_stock",
}

export enum SellerOrderStatus {
  pending = "pending",
  partially_shipped = "partially_shipped",
  shipped = "shipped",
  partially_delivered = "partially_delivered",
  delivered = "delivered",
  cancelled = "cancelled",
}

export enum SellerProductStatus {
  low_stock = "low stock",
  in_stock = "in stock",
  out_of_stock = "out of stock",
}

export enum PayoutStatus {
  pending = "pending",
  processing = "processing",
  success = "success",
  failed = "failed",
}

export enum AutoPayoutSchedule {
  none = "none", // manual only
  immediate = "immediate", // 48hrs after eligible
  weekly = "weekly",
  monthly = "monthly",
}

export enum RefundStatus {
  pending = "pending",
  processing = "processing",
  success = "success",
  failed = "failed",
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
  refund = "refund",
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

export enum NotificationType {
  order = "order",
  payment = "payment",
  refund = "refund",
  service = "service",
  promotion = "promotion",
  system = "system",
}
export enum ActivityType {
  order_placed = "order_placed",
  order_cancelled = "order_cancelled",
  order_delivered = "order_delivered",
  payment_made = "payment_made",
  wallet_funded = "wallet_funded",
  wallet_debited = "wallet_debited",
  refund_requested = "refund_requested",
  refund_processed = "refund_processed",
  product_reviewed = "product_reviewed",
  address_added = "address_added",
  address_updated = "address_updated",
  profile_updated = "profile_updated",
  product_added = "product_added",
  product_updated = "product_updated",
  product_deleted = "product_deleted",
  payout_requested = "payout_requested",
  payout_processed = "payout_processed",
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
  description?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;

  wallet: Wallet;
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
  filters?: CategoryGroup[];
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
  isActive: boolean;

  sku: string;
  imageUrl: string;
  images: string[];
  location: string;
  locationLga?: string;

  rejectionReason?: string;
  rejectionScreenshots: string[];

  expiryDate?: string;
  specifications?: Record<string, unknown>;

  ratingSum: number;
  ratingCount: number;
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
  serviceCharge: number;
  paymentMethod?: PaymentMethod;
  shippingMethod: ShippingMethod;
  addressId?: string;
  trackingInfo?: Record<string, unknown>;

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
  sellerOrderId: string;
  productId?: string;
  productTitle: string;
  productImage?: string;
  productSku?: string;
  price: number;
  quantity: number;
  status: OrderItemStatus;

  shippedAt?: string;
  deliveredAt?: string;
  cancelledAt?: string;

  sellerOrder: SellerOrder;
  product?: Product;
  order: Order;
}

export interface SellerOrder {
  id: string;
  orderId: string;
  sellerId: string;
  subTotal: number;
  commission: number;
  sellerEarning: number;
  status: SellerOrderStatus;
  paidOut: boolean;
  paidOutAt?: string;

  eligibleForPayout: boolean;
  eligibleAt?: string;

  shippedAt?: string;
  deliveredAt?: string;
  cancelledAt?: string;
  createdAt: string;

  order: Order;
  seller: User;
  items: OrderItem[];
  payouts: Payout[];
}

export interface Payout {
  id: string;
  sellerOrderId: string;
  bankDetailId: string;
  amount: number;
  transferReference?: string;
  status: PayoutStatus;
  createdAt: string;
  paidAt?: string;
  sellerOrder: SellerOrder;
  bankAccount: BankDetail;
}

export interface Bank {
  id: string;
  name: string;
  code: string;
  createdAt: string;
  bankDetails: BankDetail[];
}

export interface BankDetail {
  id: string;
  userId: string;
  bankId: string;
  accountNumber: string;
  accountHolderName: string;
  paystackRecipientCode?: string;

  isDefault: boolean;
  createdAt: string;
  user: User;
  bank: Bank;
  payouts: Payout[];
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
