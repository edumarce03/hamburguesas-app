import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import type {
  BreadType,
  ExtraIngredient,
  FriesType,
  Product,
  ProductCustomization,
  SauceType,
} from "../../types";
import { customizationOptions } from "../../data/customization";
import Button from "../ui/Button";

interface CustomizationModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function CustomizationModal({
  product,
  isOpen,
  onClose,
}: CustomizationModalProps) {
  const { addToCart } = useCart();
  const [step, setStep] = useState(1);
  const [customizations, setCustomizations] = useState<ProductCustomization>({
    breadType: customizationOptions.breads[0],
    includeSalad: true,
    friesType: customizationOptions.fries[1],
    sauces: [customizationOptions.sauces[0]],
    extraIngredients: [],
    observations: "",
  });

  if (!isOpen) return null;

  const totalSteps = 5;

  const calculateTotalPrice = (): number => {
    let total = product.price;

    if (customizations.breadType) total += customizations.breadType.price;
    if (customizations.friesType) total += customizations.friesType.price;
    if (customizations.sauces) {
      total += customizations.sauces.reduce(
        (sum, sauce) => sum + sauce.price,
        0
      );
    }
    if (customizations.extraIngredients) {
      total += customizations.extraIngredients.reduce(
        (sum, ingredient) => sum + ingredient.price,
        0
      );
    }

    return total;
  };

  const handleBreadSelect = (bread: BreadType) => {
    setCustomizations((prev) => ({ ...prev, breadType: bread }));
  };

  const handleFriesSelect = (fries: FriesType) => {
    setCustomizations((prev) => ({ ...prev, friesType: fries }));
  };

  const handleSauceToggle = (sauce: SauceType) => {
    setCustomizations((prev) => {
      const currentSauces = prev.sauces || [];
      const isSelected = currentSauces.some((s) => s.id === sauce.id);

      if (isSelected) {
        return {
          ...prev,
          sauces: currentSauces.filter((s) => s.id !== sauce.id),
        };
      } else {
        return {
          ...prev,
          sauces: [...currentSauces, sauce],
        };
      }
    });
  };

  const handleExtraIngredientToggle = (ingredient: ExtraIngredient) => {
    setCustomizations((prev) => {
      const currentExtras = prev.extraIngredients || [];
      const isSelected = currentExtras.some((e) => e.id === ingredient.id);

      if (isSelected) {
        return {
          ...prev,
          extraIngredients: currentExtras.filter((e) => e.id !== ingredient.id),
        };
      } else {
        return {
          ...prev,
          extraIngredients: [...currentExtras, ingredient],
        };
      }
    });
  };

  const handleAddToCart = () => {
    addToCart(product, customizations);
    onClose();
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h3 className="text-xl text-start md:text-2xl font-bold mb-3">
              Elige tu Pan
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {customizationOptions.breads.map((bread) => (
                <button
                  key={bread.id}
                  onClick={() => handleBreadSelect(bread)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    customizations.breadType?.id === bread.id
                      ? "border-red-500 bg-red-50"
                      : "border-stone-200 hover:border-red-200"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium text-sm">{bread.name}</span>
                      {bread.price > 0 && (
                        <span className="text-red-600 ml-2 text-xs">
                          +S/. {bread.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <span className="text-xl">🍞</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-6 text-start">
              ¿Incluir Ensalada?
            </h3>
            <div className="text-center space-y-6">
              <div className="space-y-4">
                <button
                  onClick={() =>
                    setCustomizations((prev) => ({
                      ...prev,
                      includeSalad: true,
                    }))
                  }
                  className={`w-full p-4 rounded-lg border-2 transition-all ${
                    customizations.includeSalad
                      ? "border-green-500 bg-green-50"
                      : "border-stone-200 hover:border-green-200"
                  }`}
                >
                  <span className="font-medium text-sm">
                    Sí, incluir ensalada fresca
                  </span>
                  <div className="text-xs md:text-sm text-stone-600 mt-1">
                    Lechuga, tomate, cebolla (Sin costo adicional)
                  </div>
                </button>

                <button
                  onClick={() =>
                    setCustomizations((prev) => ({
                      ...prev,
                      includeSalad: false,
                    }))
                  }
                  className={`w-full p-4 rounded-lg border-2 transition-all ${
                    !customizations.includeSalad
                      ? "border-red-500 bg-red-50"
                      : "border-stone-200 hover:border-red-200"
                  }`}
                >
                  <span className="font-medium text-sm">No, gracias</span>
                </button>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-6 text-start">
              Elige tu Acompañamiento
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {customizationOptions.fries.map((fries) => (
                <button
                  key={fries.id}
                  onClick={() => handleFriesSelect(fries)}
                  className={`p-4 rounded-lg border-2 transition-all text-left  ${
                    customizations.friesType?.id === fries.id
                      ? "border-yellow-500 bg-yellow-50"
                      : "border-stone-200 hover:border-yellow-200"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium text-sm">{fries.name}</span>
                      {fries.price > 0 && (
                        <span className="text-yellow-600 ml-2 text-xs">
                          +S/. {fries.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <span className="text-xl">
                      {fries.id === "none"
                        ? "🚫"
                        : fries.id === "onion-rings"
                        ? "🧅"
                        : "🍟"}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-6 text-center">
              Selecciona tus Salsas
            </h3>
            <p className="text-center text-sm text-stone-600 mb-6">
              Puedes elegir múltiples salsas
            </p>
            <div className="grid grid-cols-2 gap-4">
              {customizationOptions.sauces.map((sauce) => {
                const isSelected =
                  customizations.sauces?.some((s) => s.id === sauce.id) ||
                  false;
                return (
                  <button
                    key={sauce.id}
                    onClick={() => handleSauceToggle(sauce)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      isSelected
                        ? "border-orange-500 bg-orange-50"
                        : "border-stone-200 hover:border-orange-200"
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-xl mb-2">🥫</div>
                      <div className="font-medium text-sm">{sauce.name}</div>
                      {sauce.price > 0 && (
                        <div className="text-orange-600 text-xs">
                          +S/. {sauce.price.toFixed(2)}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 5:
        return (
          <div>
            <div className="mb-8">
              <h4 className="text-xl font-bold mb-4">Ingredientes Extra</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {customizationOptions.extraIngredients.map((ingredient) => {
                  const isSelected =
                    customizations.extraIngredients?.some(
                      (e) => e.id === ingredient.id
                    ) || false;
                  const categoryIcons = {
                    cheese: "🧀",
                    meat: "🥩",
                    vegetable: "🥬",
                    sauce: "🥫",
                  };

                  return (
                    <button
                      key={ingredient.id}
                      onClick={() => handleExtraIngredientToggle(ingredient)}
                      className={`p-3 rounded-lg border-2 transition-all text-left ${
                        isSelected
                          ? "border-green-500 bg-green-50"
                          : "border-stone-200 hover:border-green-200"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-medium text-sm">
                            {ingredient.name}
                          </span>
                          <span className="text-green-600 ml-2 text-xs">
                            +S/. {ingredient.price.toFixed(2)}
                          </span>
                        </div>
                        <span className="text-xl">
                          {categoryIcons[ingredient.category]}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-4">
                Observaciones Especiales
              </h4>
              <textarea
                value={customizations.observations || ""}
                onChange={(e) =>
                  setCustomizations((prev) => ({
                    ...prev,
                    observations: e.target.value,
                  }))
                }
                placeholder="¿Alguna instrucción especial? Ej: Sin cebolla, extra salsa, etc."
                className="text-sm placeholder:text-sm w-full p-4 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                rows={4}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-stone-950/90 z-50" onClick={onClose} />

      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">
                  Personaliza tu {product.name}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-red-700 rounded-full transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm">
                  Paso {step} de {totalSteps}
                </span>
                <div className="flex-1 bg-red-700 rounded-full h-2">
                  <div
                    className="bg-white h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(step / totalSteps) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-96">
              {renderStepContent()}
            </div>

            <div className="border-t border-stone-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-base md:text-lg font-semibold">
                  Total:{" "}
                  <span className="text-red-600">
                    S/. {calculateTotalPrice().toFixed(2)}
                  </span>
                </div>
                <div className="text-xs md:text-sm text-stone-600">
                  Precio base: S/. {product.price.toFixed(2)}
                </div>
              </div>

              <div className="flex space-x-4">
                {step > 1 && (
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    className="flex-1 text-sm"
                  >
                    Anterior
                  </Button>
                )}

                {step < totalSteps ? (
                  <Button onClick={nextStep} className="flex-1 text-sm">
                    Siguiente
                  </Button>
                ) : (
                  <Button onClick={handleAddToCart} className="flex-1 text-sm">
                    Agregar al Carrito - S/. {calculateTotalPrice().toFixed(2)}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
