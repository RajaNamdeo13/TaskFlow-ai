import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

export function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
  const base = variant === "primary" ? "btn-primary" : "btn-secondary";
  return (
    <button className={`${base} ${className}`} {...props}>
      {children}
    </button>
  );
}
