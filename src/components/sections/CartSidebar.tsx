import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import type { ProductCustomization, Order } from "../../types";
import Button from "../ui/Button";
import CheckoutModal from "./CheckoutModal";
import OrderConfirmationModal from "./OrderConfirmationModal";

const calculateItemPrice = (
  basePrice: number,
  customizations?: ProductCustomization
): number => {
  let price = basePrice;

  if (customizations) {
    if (customizations.breadType) price += customizations.breadType.price;
    if (customizations.friesType) price += customizations.friesType.price;
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

function CustomizationSummary({
  customizations,
}: {
  customizations: ProductCustomization;
}) {
  const items = [];

  if (customizations.breadType && customizations.breadType.price > 0) {
    items.push(`Pan: ${customizations.breadType.name}`);
  }

  if (customizations.friesType && customizations.friesType.id !== "regular") {
    items.push(`Papas: ${customizations.friesType.name}`);
  }

  if (customizations.sauces && customizations.sauces.length > 1) {
    items.push(
      `Salsas: ${customizations.sauces.map((s) => s.name).join(", ")}`
    );
  }

  if (
    customizations.extraIngredients &&
    customizations.extraIngredients.length > 0
  ) {
    items.push(
      `Extras: ${customizations.extraIngredients.map((e) => e.name).join(", ")}`
    );
  }

  if (!customizations.includeSalad) {
    items.push("Sin ensalada");
  }

  if (customizations.observations) {
    items.push(`Nota: ${customizations.observations}`);
  }

  if (items.length === 0) return null;

  return (
    <div className="text-xs text-stone-500 mt-1 space-y-1">
      {items.map((item, index) => (
        <div key={index}>• {item}</div>
      ))}
    </div>
  );
}

export default function CartSidebar() {
  const {
    cart,
    isCartOpen,
    toggleCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderConfirmationOpen, setIsOrderConfirmationOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const handleProceedToCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = (order: Order) => {
    setCompletedOrder(order);
    setIsCheckoutOpen(false);
    setIsOrderConfirmationOpen(true);
    toggleCart();
  };

  const handleCloseOrderConfirmation = () => {
    setIsOrderConfirmationOpen(false);
    setCompletedOrder(null);
  };

  if (!isCartOpen) return null;

  return (
    <>
      <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-stone-100 z-50 shadow-2xl shadow-stone-900 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-stone-200">
            <h2 className="text-xl font-semibold text-stone-800">Tu Pedido</h2>
            <button
              onClick={toggleCart}
              className="p-2 text-stone-500 hover:text-stone-700 focus:outline-none"
              aria-label="Cerrar carrito"
            >
              <svg
                className="h-6 w-6"
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

          <div className="flex-1 overflow-y-auto p-4">
            {cart.items.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🛒</div>
                <p className="text-stone-500 mb-4">Tu carrito está vacío</p>
                <Button onClick={toggleCart} variant="outline">
                  Explorar Menú
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.items.map((item, index) => {
                  const itemPrice = calculateItemPrice(
                    item.product.price,
                    item.customizations
                  );
                  const hasCustomizations =
                    item.customizations &&
                    ((item.customizations.breadType?.price ?? 0) ||
                      item.customizations.friesType?.id !== "regular" ||
                      (item.customizations.sauces?.length ?? 0) > 1 ||
                      (item.customizations.extraIngredients?.length ?? 0) > 0 ||
                      !item.customizations.includeSalad ||
                      item.customizations.observations);

                  return (
                    <div key={index} className="bg-stone-50 p-4 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div className="w-16 h-16 bg-stone-200 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                          🍔
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-stone-800 truncate">
                            {item.product.name}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-red-600 font-semibold">
                              S/. {itemPrice.toFixed(2)}
                            </span>
                            {hasCustomizations && (
                              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">
                                Personalizada
                              </span>
                            )}
                          </div>

                          {item.customizations && (
                            <CustomizationSummary
                              customizations={item.customizations}
                            />
                          )}
                        </div>

                        <button
                          onClick={() => removeFromCart(index.toString())}
                          className="text-red-500 hover:text-red-700 p-1 flex-shrink-0"
                          aria-label="Eliminar producto"
                        >
                          🗑️
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() =>
                              updateQuantity(
                                index.toString(),
                                item.quantity - 1
                              )
                            }
                            className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center hover:bg-stone-300 transition-colors"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                index.toString(),
                                item.quantity + 1
                              )
                            }
                            className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center hover:bg-stone-300 transition-colors"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-stone-800 font-semibold">
                          S/. {(itemPrice * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {cart.items.length > 0 && (
            <div className="border-t border-stone-200 p-4 space-y-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total:</span>
                <span className="text-red-600">
                  S/. {cart.total.toFixed(2)}
                </span>
              </div>

              <div className="space-y-2">
                <Button
                  className="w-full"
                  size="md"
                  onClick={handleProceedToCheckout}
                >
                  Proceder al Pago 💳
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={clearCart}
                >
                  Vaciar Carrito
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderComplete={handleOrderComplete}
      />

      <OrderConfirmationModal
        order={completedOrder}
        isOpen={isOrderConfirmationOpen}
        onClose={handleCloseOrderConfirmation}
      />
    </>
  );
}
