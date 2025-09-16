import { useEffect, useState } from "react";
import Container from "../ui/Container";
import Button from "../ui/Button";

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  background: string;
  textColor: string;
}

const banners: Banner[] = [
  {
    id: "1",
    title: "¡Nueva Burger Suprema!",
    subtitle: "Doble carne, doble sabor",
    description:
      "Prueba nuestra nueva hamburguesa con doble carne de res, bacon crujiente y nuestra salsa especial BBQ.",
    cta: "Pruébala Ahora",
    background: "bg-gradient-to-r from-red-600 to-red-700",
    textColor: "text-white",
  },
  {
    id: "2",
    title: "Combos Familiares",
    subtitle: "Perfectos para compartir",
    description:
      "¡Ahorra hasta 30% con nuestros combos familiares! Incluye 4 hamburguesas, papas y bebidas.",
    cta: "Ver Combos",
    background: "bg-gradient-to-r from-orange-500 to-red-500",
    textColor: "text-white",
  },
  {
    id: "3",
    title: "Entrega en 15 Minutos",
    subtitle: "Rápido y caliente",
    description:
      "Garantizamos que tu pedido estará listo en máximo 15 minutos. Frescura y rapidez garantizada.",
    cta: "Hacer Pedido",
    background: "bg-gradient-to-r from-yellow-600 to-orange-700",
    textColor: "text-white",
  },
];

export default function HeroBanner() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentBanner(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleMenuClick = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden" id="hero_banner">
      <div className="relative h-[450px] md:h-[500px]">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              index === currentBanner
                ? "opacity-100 transform translate-x-0"
                : "opacity-0 transform translate-x-full"
            } ${banner.background}`}
          >
            <Container className="h-full flex items-center">
              <div className="max-w-2xl mx-12">
                <h2
                  className={`text-xs md:text-base font-medium mb-2 ${banner.textColor} opacity-90`}
                >
                  {banner.subtitle}
                </h2>
                <h1
                  className={`text-3xl md:text-6xl font-bold mb-4 ${banner.textColor}`}
                >
                  {banner.title}
                </h1>
                <p
                  className={`text-sm md:text-xl mb-8 ${banner.textColor} opacity-90`}
                >
                  {banner.description}
                </p>

                <div className="flex flex-col md:flex-row gap-4">
                  <Button
                    size="md"
                    variant="secondary"
                    onClick={handleMenuClick}
                  >
                    {banner.cta}
                  </Button>
                  <Button
                    size="md"
                    variant="outline"
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                  >
                    Ver Menú Completo
                  </Button>
                </div>
              </div>
            </Container>
          </div>
        ))}

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 md:p-4 transition-all duration-200 group"
          aria-label="Banner anterior"
        >
          <svg
            className="size-4 md:size-5 text-white group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 md:p-4 transition-all duration-200 group"
          aria-label="Siguiente banner"
        >
          <svg
            className="size-4 md:size-5 text-white group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <div className="flex space-x-3">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentBanner
                    ? "bg-white scale-110"
                    : "bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Ir a banner ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div
            className="h-full bg-white transition-all duration-300 ease-linear"
            style={{
              width: isAutoPlaying ? "100%" : "0%",
              animation: isAutoPlaying ? "progress 5s linear infinite" : "none",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}
