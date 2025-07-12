import { cn } from "@/lib/utils";
import { ButtonProps } from "@/types";
import React, { useState } from "react";

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  isLoading = false,
  ripple = true,
  glow = true,
  className,
  children,
  onClick,
  disabled,
  ...props
}) => {
  const [ripples, setRipples] = useState<
    Array<{ x: number; y: number; id: number }>
  >([]);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const rippleCounter = React.useRef(0);

  const baseClasses =
    "relative overflow-hidden font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  const variants = {
    primary:
      "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl focus:ring-purple-500",
    secondary:
      "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl focus:ring-blue-500",
    outline:
      "border-2 border-purple-500 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300 focus:ring-purple-500",
    ghost:
      "text-gray-300 hover:text-white hover:bg-white/10 focus:ring-gray-500",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-2xl",
  };

  const glowEffects = {
    primary: glow ? "hover:shadow-purple-500/25 hover:shadow-2xl" : "",
    secondary: glow ? "hover:shadow-blue-500/25 hover:shadow-2xl" : "",
    outline: glow ? "hover:shadow-purple-500/25 hover:shadow-lg" : "",
    ghost: "",
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (ripple && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newRipple = { x, y, id: rippleCounter.current++ };
      setRipples((prev) => [...prev, newRipple]);

      setTimeout(() => {
        setRipples((prev) =>
          prev.filter((ripple) => ripple.id !== newRipple.id)
        );
      }, 600);
    }

    if (onClick && !disabled && !isLoading) {
      onClick(e);
    }
  };

  return (
    <button
      ref={buttonRef}
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        glowEffects[variant],
        "group",
        className
      )}
      onClick={handleClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute animate-ping "
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
        >
          <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-20"></span>
        </span>
      ))}

      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>

      <span className="relative z-10 flex items-center justify-center gap-2">
        {isLoading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </span>

      {glow && (
        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
      )}
    </button>
  );
};

export default Button;
