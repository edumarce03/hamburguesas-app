import Container from "../ui/Container";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 items-center mx-2">
          <div className="text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Nuestra Historia de Sabor
            </h2>
            <p className="text-sm md:text-base text-stone-950 mb-6 leading-relaxed">
              Desde 2020, en BurgerHub nos dedicamos a perfeccionar el arte de
              la hamburguesa. Usamos solo ingredientes frescos y de la más alta
              calidad para crear sabores que te harán volver por más.
            </p>
            <p className="text-sm md:text-base text-stone-950 leading-relaxed">
              Nuestra pasión es tu satisfacción. Cada hamburguesa es una obra
              maestra, preparada con amor y dedicación.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="flex items-center space-x-2 px-3 py-2 border border-green-600 rounded-full bg-green-50">
                <div className="size-2 bg-green-500 rounded-full"></div>
                <span className="text-xs font-medium text-green-700">
                  100% Natural
                </span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-2 border border-red-600 rounded-full bg-red-50">
                <div className="size-2 bg-red-500 rounded-full"></div>
                <span className="text-xs font-medium text-red-700">
                  Ingredientes Frescos
                </span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-2 border border-yellow-600 rounded-full bg-yellow-50">
                <div className="size-2 bg-yellow-500 rounded-full"></div>
                <span className="text-xs font-medium text-yellow-700">
                  Hecho a Mano
                </span>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80"
              alt="Deliciosa hamburguesa"
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              ¿Listo para Probar la Diferencia?
            </h3>
            <p className="text-red-100 mb-6 max-w-2xl mx-auto">
              Únete a miles de clientes satisfechos y descubre por qué somos la
              hamburguesa favorita de la ciudad.
            </p>
            <button
              onClick={() =>
                document
                  .getElementById("menu")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors duration-200"
            >
              Ver Nuestro Menú
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
