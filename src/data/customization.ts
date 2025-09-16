import type { CustomizationOptions } from "../types";

export const customizationOptions: CustomizationOptions = {
  breads: [
    { id: "regular", name: "Pan Regular", price: 0 },
    { id: "sesame", name: "Pan con Ajonjolí", price: 0.5 },
    { id: "whole-wheat", name: "Pan Integral", price: 1.0 },
  ],

  fries: [
    { id: "none", name: "Sin Papas", price: 0 },
    { id: "regular", name: "Papas Regulares", price: 1.5 },
    { id: "curly", name: "Papas Rizadas", price: 2.0 },
  ],

  sauces: [
    { id: "ketchup", name: "Ketchup", price: 0.2 },
    { id: "mayo", name: "Mayonesa", price: 0.2 },
    { id: "mustard", name: "Mostaza", price: 0.3 },
    { id: "bbq", name: "Salsa BBQ", price: 0.5 },
  ],

  extraIngredients: [
    { id: "cheddar", name: "Queso Cheddar", price: 1.5, category: "cheese" },
    { id: "swiss", name: "Queso Suizo", price: 1.5, category: "cheese" },

    { id: "bacon", name: "Bacon", price: 2.0, category: "meat" },
    { id: "chicken", name: "Pollo Adicional", price: 2.0, category: "meat" },

    { id: "avocado", name: "Aguacate", price: 1.5, category: "vegetable" },
    { id: "pickles", name: "Pepinillos", price: 0.5, category: "vegetable" },
  ],
};
