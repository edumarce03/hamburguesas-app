import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "tertiary" | "quaternary";
  size?: "sm" | "md" | "lg";
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses =
    "font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    secondary:
      "bg-yellow-400 text-stone-800 hover:bg-yellow-500 focus:ring-yellow-400",
    outline:
      "border-2 border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500",
    tertiary:
      "bg-stone-100 text-stone-800 hover:bg-stone-200 focus:ring-stone-400",
    quaternary:
      "bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600 focus:ring-red-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
