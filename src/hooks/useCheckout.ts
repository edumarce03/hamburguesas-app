import { useState } from "react";
import type { CustomerInfo, PaymentMethod, Order } from "../types";
import { useCart } from "./useCart";

export function useCheckout() {
  const { cart, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const processOrder = async (
    customer: CustomerInfo,
    paymentMethod: PaymentMethod
  ): Promise<Order> => {
    setIsProcessing(true);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    const order: Order = {
      id: `ORD-${Date.now()}`,
      items: cart.items,
      customer,
      paymentMethod,
      total: cart.total,
      status: "confirmed",
      createdAt: new Date(),
      estimatedDelivery: new Date(Date.now() + 15 * 60 * 1000),
    };

    clearCart();
    setIsProcessing(false);

    return order;
  };

  return {
    processOrder,
    isProcessing,
  };
}
