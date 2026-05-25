// ================= TYPES =================
export interface productsProps {
  id: number;
  size: string;
  title: string;
  amount: number;
  quantity?: string;
  location: string;
  image: string;
  category?: string;
  subCategory?: string;
  type?: string;
  quantityType?: string;
  brand?: string;
  weight?: string;
  volume?: string;
  discount?: string;
  condition?: string;
}

export interface FilterGroup {
  groupName: string;
  items: string[];
}

// types/products.ts
export type OrderStatus =
  | "delivered"
  | "shipped"
  | "pending"
  | "partially_shipped"
  | "partially_delivered"
  | "cancelled";

export interface OrderItem {
  productId: number;
  title: string;
  quantity: number;
  price: number;
  image: string;
  size: string;
  sku: string;
  available: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  totalAmount: number;
  itemsTotal: number;
  deliveryFee: number;
  serviceCharge: number;
  paymentMethod: string;
  status: OrderStatus;
  date: string;
  location: string;
}

// ============ MERCHANT ORDER TYPES ============

export type MerchantOrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface MerchantOrderItem {
  productId: string;
  productName: string;
  sku: string;
  imageUrl: string;
  quantity: number;
  pricePerUnit: number;
  totalPrice: number;
  countType: string | null;
  itemStatus: MerchantOrderStatus;
}

export interface MerchantOrder {
  id: string;
  orderNumber: string;
  buyerName: string;
  buyerPhone: string;
  buyerEmail: string;
  items: MerchantOrderItem[];
  totalAmount: number;
  itemsTotal: number;
  deliveryFee: number;
  serviceCharge: number;
  paymentMethod: string;
  status: MerchantOrderStatus;
  date: string;
  location: string;
  deliveryAddress: string;
  notes?: string;
}
