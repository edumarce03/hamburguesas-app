import { useState } from "react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { useCart } from "../../hooks/useCart";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart, toggleCart } = useCart();

  const navigation = [
    { name: "Inicio", href: "#hero_banner" },
    { name: "Menú", href: "#menu" },
    { name: "Sobre Nosotros", href: "#about" },
    { name: "Contacto", href: "#contact" },
  ];

  const totalItems = cart.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <Container>
        <div className="flex items-center justify-between h-16">
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => handleNavClick("#home")}
          >
            <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
              Burger App
            </h1>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="text-stone-700 hover:text-red-600 transition-colors duration-200 font-medium"
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="tertiary"
              size="sm"
              className="relative"
              onClick={toggleCart}
            >
              🛒
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-stone-700 hover:text-red-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-stone-200 py-4">
            <div className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="text-stone-700 hover:text-red-600 transition-colors duration-200 font-medium px-2 py-1 text-left"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
}
