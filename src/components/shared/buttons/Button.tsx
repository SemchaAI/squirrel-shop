import { forwardRef } from "react";
import { Loader2 } from "lucide-react";
import clsx from "clsx";

import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "ghost" | "text" | "destructive";
type Size = "sm" | "md" | "lg" | "none";
type Rounded = "none" | "md" | "full";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  rounded?: Rounded;
  loading?: boolean;
}

const base =
  "inline-flex cursor-pointer items-center justify-center border  font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-primary border-primary text-on-primary hover:bg-primary-hover",
  // secondary:
  //   "bg-high-contrast border-high-contrast  text-app hover:bg-on-primary",
  ghost:
    "bg-transparent border-primary text-primary hover:bg-primary hover:text-on-primary",
  text: "bg-transparent border-transparent text-primary hover:underline",
  destructive: "bg-error border-error text-white hover:bg-error-hover",
};

const sizes: Record<Size, string> = {
  none: "text-sm",
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const round: Record<Rounded, string> = {
  full: "rounded-full",
  md: "rounded-md",
  none: "rounded-none",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      loading,
      rounded = "md",
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={clsx(
          base,
          variants[variant],
          sizes[size],
          round[rounded],
          className,
        )}
        disabled={disabled || loading}
        type="button"
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
