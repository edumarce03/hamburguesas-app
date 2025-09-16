import { useState } from "react";
import type { Product } from "../../types";
import { useCart } from "../../hooks/useCart";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Toast from "../ui/Toast";
import CustomizationModal from "./CustomizationModal";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isCustomizationOpen, setIsCustomizationOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleQuickAdd = () => {
    addToCart(product);
    setShowToast(true);
  };

  const handleCustomize = () => {
    setIsCustomizationOpen(true);
  };

  const categoryIcons = {
    combos: "📦",
    recomendadas: "⭐",
    res: "🥩",
    pollo: "🐔",
    cerdo: "🐷",
    bebidas: "🥤",
  };

  return (
    <>
      <Card hover className="overflow-hidden group">
        <div className="h-48 bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-orange-50 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
          <span className="text-6xl relative z-10 group-hover:scale-110 transition-transform duration-300">
            {categoryIcons[product.category]}
          </span>

          {product.customizable && (
            <div className="absolute top-3 left-3">
              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                Personalizable
              </span>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="mb-3">
            <h3 className="text-xl font-bold text-stone-800 mb-2 line-clamp-1">
              {product.name}
            </h3>
            <p className="text-stone-600 text-sm line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {product.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="bg-stone-100 text-stone-600 px-2 py-1 rounded text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
              {product.tags.length > 3 && (
                <span className="text-stone-400 text-xs">
                  +{product.tags.length - 3} más
                </span>
              )}
            </div>
          )}

          <div className="mb-4">
            <span className="text-2xl font-bold text-red-600">
              S/. {product.price.toFixed(2)}
            </span>
            <span className="text-stone-500 text-sm ml-2">desde</span>
          </div>

          <div className="space-y-2">
            {product.customizable ? (
              <>
                <Button
                  onClick={handleCustomize}
                  className="w-full font-semibold"
                  size="sm"
                >
                  Personalizar
                </Button>

                <Button
                  onClick={handleQuickAdd}
                  variant="outline"
                  className="w-full font-semibold"
                  size="sm"
                >
                  Agregar Rápido
                </Button>
              </>
            ) : (
              <Button
                onClick={handleQuickAdd}
                className="w-full font-semibold"
                size="sm"
              >
                Agregar al Carrito
              </Button>
            )}
          </div>
        </div>
      </Card>

      {product.customizable && (
        <CustomizationModal
          product={product}
          isOpen={isCustomizationOpen}
          onClose={() => setIsCustomizationOpen(false)}
        />
      )}

      {showToast && (
        <Toast
          message={`${product.name} agregado al carrito`}
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
}
