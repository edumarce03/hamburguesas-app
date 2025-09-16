import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({
  children,
  className = "",
  hover = false,
}: CardProps) {
  const baseClasses = "bg-white rounded-xl shadow-sm border border-stone-200";
  const hoverClasses = hover
    ? "hover:shadow-md hover:scale-[1.02] transition-all duration-200"
    : "";

  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
}
