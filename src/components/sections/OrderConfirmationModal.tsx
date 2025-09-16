import type { Order } from "../../types";
import Button from "../ui/Button";
import Card from "../ui/Card";

interface OrderConfirmationModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderConfirmationModal({
  order,
  isOpen,
  onClose,
}: OrderConfirmationModalProps) {
  if (!isOpen || !order) return null;

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "confirmed":
        return { icon: "✅", text: "Confirmado", color: "text-green-600" };
      case "preparing":
        return { icon: "👨‍🍳", text: "En preparación", color: "text-orange-600" };
      case "ready":
        return { icon: "🍔", text: "Listo", color: "text-blue-600" };
      case "delivered":
        return { icon: "🚚", text: "Entregado", color: "text-green-600" };
      default:
        return { icon: "⏳", text: "Pendiente", color: "text-yellow-600" };
    }
  };

  const statusInfo = getStatusInfo(order.status);

  return (
    <>
      <div className="fixed inset-0 bg-stone-950/90 z-50" />

      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="bg-green-600 text-white p-8 text-center">
              <div className="text-4xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold mb-2">¡Pedido Confirmado!</h2>
              <p className="text-green-100 text-sm">
                Gracias por tu compra. Hemos recibido tu pedido correctamente.
              </p>
            </div>

            <div className="p-6 overflow-y-auto max-h-96">
              <Card className="p-6 mb-6 bg-stone-50">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-stone-800 mb-2">
                      Número de Pedido
                    </h3>
                    <p className="text-sm font-mono text-red-600">{order.id}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-800 mb-2">
                      Estado
                    </h3>
                    <div
                      className={`flex items-center space-x-2 ${statusInfo.color}`}
                    >
                      <span className="text-sm">{statusInfo.icon}</span>
                      <span className="font-medium text-sm">
                        {statusInfo.text}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-800 mb-2">
                      Tiempo Estimado
                    </h3>
                    <p className="text-stone-600 text-sm">
                      {formatTime(order.estimatedDelivery)} (
                      {formatDate(order.estimatedDelivery)})
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-800 mb-2">
                      Total Pagado
                    </h3>
                    <p className="text-xl font-bold text-red-600">
                      S/. {order.total.toFixed(2)}
                    </p>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card className="p-4">
                  <h3 className="font-semibold text-stone-800 mb-3">
                    Información del Cliente
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Nombre:</span>{" "}
                      {order.customer.name}
                    </p>
                    <p>
                      <span className="font-medium">Email:</span>{" "}
                      {order.customer.email}
                    </p>
                    <p>
                      <span className="font-medium">Teléfono:</span>{" "}
                      {order.customer.phone}
                    </p>
                  </div>
                </Card>

                <Card className="p-4">
                  <h3 className="font-semibold text-stone-800 mb-3 flex items-center">
                    <span className="mr-2">📍</span>
                    Dirección de Entrega
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p>{order.customer.address.street}</p>
                    <p>
                      {order.customer.address.city},{" "}
                      {order.customer.address.zipCode}
                    </p>
                    {order.customer.address.notes && (
                      <p className="text-stone-600 italic">
                        Nota: {order.customer.address.notes}
                      </p>
                    )}
                  </div>
                </Card>
              </div>

              <Card className="p-4 mb-6">
                <h3 className="font-semibold text-stone-800 mb-3">
                  Método de Pago
                </h3>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{order.paymentMethod.icon}</span>
                  <div>
                    <p className="font-medium">{order.paymentMethod.name}</p>
                    <p className="text-sm text-stone-600">
                      {order.paymentMethod.type === "cash"
                        ? "Pago contra entrega"
                        : "Pago procesado exitosamente"}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold text-stone-800 mb-4">
                  Resumen del Pedido
                </h3>
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border-b border-stone-200 pb-3 last:border-b-0 last:pb-0"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{item.product.name}</p>
                        <div className="flex items-center space-x-2 text-sm text-stone-600">
                          <span>Cantidad: {item.quantity}</span>
                          {item.customizations && (
                            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">
                              Personalizada
                            </span>
                          )}
                        </div>
                        {item.customizations?.observations && (
                          <p className="text-xs text-stone-500 mt-1">
                            Nota: {item.customizations.observations}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h3 className="font-semibold text-amber-700 mb-2">
                  Próximos Pasos
                </h3>
                <div className="text-sm text-amber-700 space-y-1">
                  <p>• Recibirás una confirmación por email</p>
                  <p>• Te notificaremos cuando tu pedido esté listo</p>
                  <p>• Tiempo estimado de entrega: 15-20 minutos</p>
                  <p>• Cualquier duda, contáctanos al: +1 (555) 123-4567</p>
                </div>
              </div>
            </div>

            <div className="border-t border-stone-200 p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <Button variant="outline" className="flex-1" onClick={onClose}>
                  Cerrar
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => window.location.reload()}
                >
                  Hacer Otro Pedido
                </Button>
              </div>

              <div className="text-center mt-4">
                <p className="text-sm text-stone-600">
                  Guarda tu número de pedido:{" "}
                  <span className="font-mono font-semibold">{order.id}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
