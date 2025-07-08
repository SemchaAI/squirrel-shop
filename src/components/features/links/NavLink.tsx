"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const NavLink = ({ href, children, className }: IProps) => {
  const path = usePathname();

  return (
    <Link
      href={href}
      className={`${path === href ? "text-primary" : "text-text-primary"} ${className}`}
    >
      {children}
    </Link>
  );
};
