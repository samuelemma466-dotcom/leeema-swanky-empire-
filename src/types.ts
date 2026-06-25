export interface Product {
  id: string;
  name: string;
  category: string;
  price: number; // in NGN
  description: string;
  image: string;
  features: string[];
  optionsLabel?: string;
  options?: string[];
  inStock: boolean;
  isThrift?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOption?: string;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
  deliveryType: 'standard' | 'express' | 'nationwide';
  notes?: string;
}
