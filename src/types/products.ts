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
  | "cancelled"

export interface OrderItem {
  productId: number
  title: string
  quantity: number
  price: number
  image: string
  size: string
  sku: string
  available: boolean  
}

export interface Order {
  id: string
  orderNumber: string
  items: OrderItem[]
  totalAmount: number
  itemsTotal: number       
  deliveryFee: number      
  serviceCharge: number    
  paymentMethod: string    
  status: OrderStatus
  date: string
  location: string
}