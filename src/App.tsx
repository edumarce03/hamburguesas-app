// src/App.tsx
import Layout from "./components/layout/Layout";
import Container from "./components/ui/Container";
import Button from "./components/ui/Button";
import HeroBanner from "./components/sections/HeroBanner";
import MenuSection from "./components/sections/MenuSection";
import AboutSection from "./components/sections/AboutSection";

function App() {
  return (
    <Layout>
      <HeroBanner />
      <MenuSection />
      <AboutSection />
      <section id="contact" className="py-16 bg-black">
        <Container>
          <div className="text-center text-white mx-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Tienes alguna pregunta?
            </h2>
            <p className="text-sm md:text-base mb-8 text-stone-100">
              Estamos aquí para ayudarte. Contáctanos y resolveremos todas tus
              dudas
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button variant="secondary" size="md">
                WhatsApp: 921 957 787
              </Button>
              <Button
                variant="outline"
                size="md"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                Email: hola@burgerapp.com
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
}

export default App;
