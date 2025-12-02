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
