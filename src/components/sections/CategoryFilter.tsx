import type { ProductCategory } from "../../types";
import Button from "../ui/Button";

interface CategoryFilterProps {
  categories: { key: ProductCategory | "all"; label: string }[];
  activeCategory: ProductCategory | "all";
  onCategoryChange: (category: ProductCategory | "all") => void;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-stone-800 mb-4 text-center">
        Filtrar por Categoría
      </h3>

      <div className="hidden md:flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <Button
            key={category.key}
            variant={activeCategory === category.key ? "quaternary" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category.key)}
            className="flex items-center gap-2"
          >
            <span>{category.label}</span>
          </Button>
        ))}
      </div>

      <div className="md:hidden">
        <div className="flex gap-3 overflow-x-auto pb-2 px-4 mx-2 ">
          {categories.map((category) => (
            <Button
              key={category.key}
              variant={
                activeCategory === category.key ? "quaternary" : "outline"
              }
              size="sm"
              onClick={() => onCategoryChange(category.key)}
              className="my-2 flex items-center gap-2 whitespace-nowrap flex-shrink-0"
            >
              <span>{category.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
