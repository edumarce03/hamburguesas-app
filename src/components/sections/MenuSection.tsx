import { useState } from "react";
import type { ProductCategory } from "../../types";

import Container from "../ui/Container";
import ProductCard from "./ProductCard";
import CategoryFilter from "./CategoryFilter";
import { categories, sampleProducts } from "../../data/product";

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">(
    "all"
  );

  const filteredProducts =
    activeCategory === "all"
      ? sampleProducts
      : sampleProducts.filter((product) => product.category === activeCategory);

  return (
    <section id="menu" className="py-16 bg-white">
      <Container>
        <div className="text-center mb-12 mx-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-4">
            Nuestro Delicioso Menú
          </h2>
          <p className="text-sm md:text-base text-stone-950 max-w-2xl mx-auto">
            Descubre nuestra variedad de hamburguesas artesanales, combos
            especiales y bebidas refrescantes
          </p>
        </div>

        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <div className="text-center mb-8">
          <p className="text-stone-600">
            Mostrando{" "}
            <span className="font-semibold text-red-600">
              {filteredProducts.length}
            </span>{" "}
            productos
            {activeCategory !== "all" && (
              <span>
                {" "}
                en{" "}
                <span className="font-semibold">
                  {categories.find((c) => c.key === activeCategory)?.label}
                </span>
              </span>
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-stone-800 mb-2">
              No encontramos productos
            </h3>
            <p className="text-stone-600">Intenta seleccionar otra categoría</p>
          </div>
        )}
      </Container>
    </section>
  );
}
