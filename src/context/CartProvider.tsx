import { useReducer } from "react";
import type { ReactNode } from "react";
import type { Cart, CartItem, Product, ProductCustomization } from "../types";
import type { CartAction } from "./cartTypes";
import { CartContext } from "./createCartContext";

interface CartState extends Cart {
  isCartOpen: boolean;
}

const initialState: CartState = {
  items: [],
  total: 0,
  isCartOpen: false,
};

const calculateItemPrice = (
  product: Product,
  customizations?: ProductCustomization
): number => {
  let price = product.price;

  if (customizations) {
    if (customizations.breadType) {
      price += customizations.breadType.price;
    }

    if (customizations.friesType) {
      price += customizations.friesType.price;
    }

    if (customizations.sauces) {
      price += customizations.sauces.reduce(
        (sum, sauce) => sum + sauce.price,
        0
      );
    }

    if (customizations.extraIngredients) {
      price += customizations.extraIngredients.reduce(
        (sum, ingredient) => sum + ingredient.price,
        0
      );
    }
  }

  return price;
};

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    const itemPrice = calculateItemPrice(item.product, item.customizations);
    return total + itemPrice * item.quantity;
  }, 0);
};

const generateItemId = (
  product: Product,
  customizations?: ProductCustomization
): string => {
  if (!customizations) return product.id;
  return `${product.id}-${JSON.stringify(customizations)}`;
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { product, customizations } = action.payload;
      const itemId = generateItemId(product, customizations);

      const existingItemIndex = state.items.findIndex(
        (item) => generateItemId(item.product, item.customizations) === itemId
      );

      let newItems: CartItem[];

      if (existingItemIndex >= 0) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.items, { product, quantity: 1, customizations }];
      }

      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
      };
    }

    case "REMOVE_FROM_CART": {
      const newItems = state.items.filter(
        (_, index) => index !== parseInt(action.payload)
      );
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
      };
    }

    case "UPDATE_QUANTITY": {
      const { productId, quantity } = action.payload;
      const itemIndex = parseInt(productId);

      if (quantity <= 0) {
        const newItems = state.items.filter((_, index) => index !== itemIndex);
        return {
          ...state,
          items: newItems,
          total: calculateTotal(newItems),
        };
      }

      const newItems = state.items.map((item, index) =>
        index === itemIndex ? { ...item, quantity } : item
      );

      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
      };
    }

    case "CLEAR_CART":
      return {
        ...state,
        items: [],
        total: 0,
      };

    case "TOGGLE_CART":
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };

    default:
      return state;
  }
}

export default function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (
    product: Product,
    customizations?: ProductCustomization
  ) => {
    dispatch({ type: "ADD_TO_CART", payload: { product, customizations } });
  };

  const removeFromCart = (itemIndex: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: itemIndex });
  };

  const updateQuantity = (itemIndex: string, quantity: number) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { productId: itemIndex, quantity },
    });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const toggleCart = () => {
    dispatch({ type: "TOGGLE_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        cart: { items: state.items, total: state.total },
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen: state.isCartOpen,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
