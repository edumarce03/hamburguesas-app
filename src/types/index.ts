export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;

  category: ProductCategory;
  tags: string[];
  customizable?: boolean;
}

export type ProductCategory =
  | "combos"
  | "recomendadas"
  | "res"
  | "pollo"
  | "cerdo"
  | "bebidas";

export interface CartItem {
  product: Product;
  quantity: number;
  customizations?: ProductCustomization;
}

export interface ProductCustomization {
  breadType?: BreadType;
  includeSalad?: boolean;
  friesType?: FriesType;
  sauces?: SauceType[];
  observations?: string;
  extraIngredients?: ExtraIngredient[];
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface BreadType {
  id: string;
  name: string;
  price: number;
}

export interface FriesType {
  id: string;
  name: string;
  price: number;
}

export interface SauceType {
  id: string;
  name: string;
  price: number;
}

export interface ExtraIngredient {
  id: string;
  name: string;
  price: number;
  category: "cheese" | "meat" | "vegetable" | "sauce";
}

export interface CustomizationOptions {
  breads: BreadType[];
  fries: FriesType[];
  sauces: SauceType[];
  extraIngredients: ExtraIngredient[];
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    zipCode: string;
    notes?: string;
  };
}

export interface PaymentMethod {
  id: string;
  type: "card" | "cash" | "digital";
  name: string;
  icon: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  customer: CustomerInfo;
  paymentMethod: PaymentMethod;
  total: number;
  status: OrderStatus;
  createdAt: Date;
  estimatedDelivery: Date;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "delivered"
  | "cancelled";
