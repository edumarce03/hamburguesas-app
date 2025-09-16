import { useState } from "react";
import type { CustomerInfo, PaymentMethod, Order } from "../../types";
import { paymentMethods } from "../../data/paymentMethods";
import { useCheckout } from "../../hooks/useCheckout";
import { useCart } from "../../hooks/useCart";
import Button from "../ui/Button";
import Card from "../ui/Card";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderComplete: (order: Order) => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  onOrderComplete,
}: CheckoutModalProps) {
  const { cart } = useCart();
  const { processOrder, isProcessing } = useCheckout();
  const [step, setStep] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(
    paymentMethods[0]
  );
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      zipCode: "",
      notes: "",
    },
  });

  if (!isOpen) return null;

  const totalSteps = 3;

  const handleCustomerInfoChange = (field: string, value: string) => {
    if (field.startsWith("address.")) {
      const addressField = field.split(".")[1];
      setCustomerInfo((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setCustomerInfo((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const isStepValid = (stepNumber: number): boolean => {
    switch (stepNumber) {
      case 1:
        return !!(
          customerInfo.name &&
          customerInfo.email &&
          customerInfo.phone
        );
      case 2:
        return !!(
          customerInfo.address.street &&
          customerInfo.address.city &&
          customerInfo.address.zipCode
        );
      case 3:
        return !!selectedPayment;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (step < totalSteps && isStepValid(step)) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    if (!isStepValid(1) || !isStepValid(2) || !isStepValid(3)) {
      return;
    }

    try {
      const order = await processOrder(customerInfo, selectedPayment);
      onOrderComplete(order);
      onClose();

      setStep(1);
      setCustomerInfo({
        name: "",
        email: "",
        phone: "",
        address: { street: "", city: "", zipCode: "", notes: "" },
      });
    } catch (error) {
      console.error("Error processing order:", error);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-stone-800 mb-2">
                Información Personal
              </h3>
              <p className="text-stone-600 text-sm md:text-base">
                Ingresa tus datos para continuar
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  value={customerInfo.name}
                  onChange={(e) =>
                    handleCustomerInfoChange("name", e.target.value)
                  }
                  className="w-full p-3 text-xs placeholder:text-xs md:text-sm md:placeholder:text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Juan Pérez"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) =>
                    handleCustomerInfoChange("email", e.target.value)
                  }
                  className="w-full p-3 border text-xs placeholder:text-xs md:text-sm md:placeholder:text-sm border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="juan@ejemplo.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) =>
                    handleCustomerInfoChange("phone", e.target.value)
                  }
                  className="w-full text-xs placeholder:text-xs md:text-sm md:placeholder:text-sm p-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="921 957 787"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-stone-800 mb-2">
                Dirección de Entrega
              </h3>
              <p className="text-stone-600 text-sm md:text-base">
                ¿A dónde llevamos tu pedido?
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Dirección *
                </label>
                <input
                  type="text"
                  value={customerInfo.address.street}
                  onChange={(e) =>
                    handleCustomerInfoChange("address.street", e.target.value)
                  }
                  className="w-full p-3 text-xs placeholder:text-xs md:text-sm md:placeholder:text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Av. Principal 123"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Ciudad *
                  </label>
                  <input
                    type="text"
                    value={customerInfo.address.city}
                    onChange={(e) =>
                      handleCustomerInfoChange("address.city", e.target.value)
                    }
                    className="text-xs placeholder:text-xs md:text-sm md:placeholder:text-sm w-full p-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Trujillo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Código Postal *
                  </label>
                  <input
                    type="text"
                    value={customerInfo.address.zipCode}
                    onChange={(e) =>
                      handleCustomerInfoChange(
                        "address.zipCode",
                        e.target.value
                      )
                    }
                    className="text-xs placeholder:text-xs md:text-sm md:placeholder:text-sm w-full p-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="13001"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Instrucciones de Entrega (Opcional)
                </label>
                <textarea
                  value={customerInfo.address.notes}
                  onChange={(e) =>
                    handleCustomerInfoChange("address.notes", e.target.value)
                  }
                  rows={3}
                  className="text-xs placeholder:text-xs md:text-sm md:placeholder:text-sm w-full p-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  placeholder="Ej: Casa azul, portón negro, timbre 2"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-stone-800 mb-2">
                Método de Pago
              </h3>
              <p className="text-stone-600">Selecciona cómo quieres pagar</p>
            </div>

            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedPayment(method)}
                  className={`w-full p-4 border-2 rounded-lg transition-all text-left ${
                    selectedPayment.id === method.id
                      ? "border-red-500 bg-red-50"
                      : "border-stone-200 hover:border-red-200"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{method.icon}</span>
                    <div>
                      <div className="font-medium text-stone-800">
                        {method.name}
                      </div>
                      <div className="text-sm text-stone-500">
                        {method.type === "card" &&
                          "Visa, Mastercard, American Express"}
                        {method.type === "cash" && "Pago contra entrega"}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {selectedPayment.type === "card" && (
              <Card className="p-4 bg-stone-50">
                <h4 className="font-semibold mb-3">Datos de la Tarjeta</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full p-2 border border-stone-300 rounded text-sm"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="MM/AA"
                      className="p-2 border border-stone-300 rounded text-sm"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="p-2 border border-stone-300 rounded text-sm"
                    />
                  </div>
                </div>
                <p className="text-xs text-stone-500 mt-2">
                  🔒 Esta es una simulación. No se procesará ningún pago real.
                </p>
              </Card>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-stone-950/90 z-50" />

      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Finalizar Pedido</h2>
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

            <div className="p-6 overflow-y-auto max-h-[400px]">
              {renderStepContent()}
            </div>

            <div className="border-t border-stone-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-base md:text-lg font-semibold">
                  Total a pagar:{" "}
                  <span className="text-red-600">
                    S/ . {cart.total.toFixed(2)}
                  </span>
                </div>
                <div className="text-xs md:text-sm text-stone-600">
                  {cart.items.length} producto{cart.items.length > 1 ? "s" : ""}
                </div>
              </div>

              <div className="flex space-x-4">
                {step > 1 && (
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    className="flex-1 text-sm"
                  >
                    Anterior
                  </Button>
                )}

                {step < totalSteps ? (
                  <Button
                    onClick={handleNext}
                    className="flex-1 text-sm"
                    disabled={!isStepValid(step)}
                  >
                    Siguiente
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="flex-1 text-sm"
                    disabled={
                      !isStepValid(1) ||
                      !isStepValid(2) ||
                      !isStepValid(3) ||
                      isProcessing
                    }
                  >
                    {isProcessing ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                        <span>Procesando...</span>
                      </div>
                    ) : (
                      "Confirmar "
                    )}
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
