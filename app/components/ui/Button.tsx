import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  children: ReactNode;
};

export default function Button({
  variant = "primary",
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = ["btn", `btn-${variant}`, className].filter(Boolean).join(" ");

  return (
    <button className={classes} type="button" {...rest}>
      {children}
    </button>
  );
}
