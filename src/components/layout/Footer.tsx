import Container from "../ui/Container";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    support: [
      { name: "Centro de Ayuda", href: "#help" },
      { name: "Términos de Servicio", href: "#terms" },
      { name: "Política de Privacidad", href: "#privacy" },
    ],
  };

  return (
    <footer className="bg-stone-50 text-stone-800">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <h3 className="text-2xl font-bold text-stone-950 mb-4">
                BurgerApp
              </h3>
              <p className="text-stone-800 mb-4">
                Las mejores hamburguesas artesanales de la ciudad. Ingredientes
                frescos, sabor auténtico.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-stone-950 mb-4">Soporte</h4>
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="hover:text-yellow-400 transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-stone-950 mb-4">Contacto</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span>📍</span>
                  <span className="text-sm">Trujillo, Perú</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>📞</span>
                  <span className="text-sm">921 957 787</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>✉️</span>
                  <span className="text-sm">hola@burgerapp.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>🕒</span>
                  <span className="text-sm">Lun-Dom: 11:00 AM - 11:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-stone-950 text-sm text-center">
              © {currentYear} BurgerApp. Todos los derechos reservados - Eduardo
              Rodríguez.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
