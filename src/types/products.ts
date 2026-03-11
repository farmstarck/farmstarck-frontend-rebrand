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



export interface OrderItem {
    productId: number;
    title: string;
    quantity: number;
    price: number;
    image: string;
    size: string;
}

export interface Order {
    id: string;
    orderNumber: string;
    items: OrderItem[];
    totalAmount: number;
    status: 'delivered' | 'ready to ship' | 'pending' | 'shipped' | 'cancelled';
    date: string;
    location: string;
}