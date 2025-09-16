import type { PaymentMethod } from "../types";

export const paymentMethods: PaymentMethod[] = [
  {
    id: "card",
    type: "card",
    name: "Tarjeta de Crédito/Débito",
    icon: "💳",
  },
  {
    id: "cash",
    type: "cash",
    name: "Efectivo",
    icon: "💵",
  },
];
