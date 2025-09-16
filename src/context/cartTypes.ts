import type { Cart, Product, ProductCustomization } from "../types";

export interface CartContextType {
  cart: Cart;
  addToCart: (product: Product, customizations?: ProductCustomization) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  toggleCart: () => void;
}

export type CartAction =
  | {
      type: "ADD_TO_CART";
      payload: { product: Product; customizations?: ProductCustomization };
    }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | {
      type: "UPDATE_QUANTITY";
      payload: { productId: string; quantity: number };
    }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" };
