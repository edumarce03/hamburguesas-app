import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CartSidebar from "../sections/CartSidebar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      <main>{children}</main>
      <Footer />
      <CartSidebar />
    </div>
  );
}
