import type { Product } from "../types";

export const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Combo Clásico",
    description: "Hamburguesa clásica + papas grandes + bebida ",
    price: 15,
    category: "combos",
    tags: ["combo", "ahorro", "completo"],
    customizable: false,
  },
  {
    id: "2",
    name: "Combo Familiar",
    description: "4 hamburguesas + 2 papas grandes + 4 bebidas",
    price: 35,
    category: "combos",
    tags: ["combo", "familiar", "ahorro"],
    customizable: false,
  },

  {
    id: "3",
    name: "Burger Suprema",
    description:
      "Doble carne, queso cheddar, bacon, lechuga, tomate y salsa BBQ",
    price: 16.99,
    category: "recomendadas",
    tags: ["premium", "doble", "bacon"],
    customizable: true,
  },
  {
    id: "4",
    name: "Deluxe Royal",
    description:
      "Carne premium, queso suizo, champiñones, cebolla caramelizada",
    price: 19.99,
    category: "recomendadas",
    tags: ["premium", "gourmet", "champiñones"],
    customizable: true,
  },

  {
    id: "5",
    name: "Clásica de Res",
    description: "Carne de res, huevo frito y nuestra salsa especial",
    price: 12.99,
    category: "res",
    tags: ["clásica", "popular"],
    customizable: true,
  },
  {
    id: "6",
    name: "Cheese Burger",
    description: "Carne de res, doble queso cheddar, pepinillos",
    price: 14.99,
    category: "res",
    tags: ["queso", "doble"],
    customizable: true,
  },

  {
    id: "7",
    name: "Pollo Crispy",
    description: "Pechuga de pollo empanizada, lechuga, tomate y mayo",
    price: 11.99,
    category: "pollo",
    tags: ["crujiente", "empanizado"],
    customizable: true,
  },
  {
    id: "8",
    name: "Pollo BBQ",
    description: "Pollo a la parrilla, salsa BBQ, cebolla morada, lechuga",
    price: 13.99,
    category: "pollo",
    tags: ["parrilla", "bbq"],
    customizable: true,
  },

  {
    id: "9",
    name: "Pulled Pork",
    description: "Cerdo desmechado, salsa BBQ, coleslaw, pan brioche",
    price: 15.99,
    category: "cerdo",
    tags: ["desmechado", "bbq", "brioche"],
    customizable: true,
  },
  {
    id: "10",
    name: "Bacon Lover",
    description: "Hamburguesa de cerdo, bacon, queso, salsa especial",
    price: 17.99,
    category: "cerdo",
    tags: ["bacon", "extra", "premium"],
    customizable: true,
  },

  {
    id: "11",
    name: "Coca Cola",
    description: "Bebida refrescante 500ml",
    price: 4,
    category: "bebidas",
    tags: ["refrescante", "clásica"],
    customizable: false,
  },
  {
    id: "12",
    name: "Inka Cola",
    description: "Bebida refrescante de 500ml",
    price: 4,
    category: "bebidas",
    tags: ["natural", "vitaminas"],
    customizable: false,
  },
  {
    id: "13",
    name: "Chicha Morada",
    description: "Chicha morada de maíz",
    price: 5,
    category: "bebidas",
    tags: ["cremosa", "postre", "chocolate"],
    customizable: false,
  },
];

export const categories = [
  { key: "all" as const, label: "Todos" },
  { key: "combos" as const, label: "Combos" },
  { key: "recomendadas" as const, label: "Recomendadas" },
  { key: "res" as const, label: "De Res" },
  { key: "pollo" as const, label: "De Pollo" },
  { key: "cerdo" as const, label: "De Cerdo" },
  { key: "bebidas" as const, label: "Bebidas" },
];
