"use client";
import { usePathname } from "next/navigation";
import { Link } from "../..";
import { NavLinkProps } from "./NavLink.types";
import { cx, css } from "styled-system/css";

export const NavLink = ({
  href,
  exact = false,
  children,
  className,
  activeClasses,
  onClick,
  ...props
}: NavLinkProps) => {
  const pathname = usePathname();

  const isActive = exact ? pathname === href : pathname.startsWith(href);

  const linkClasses = cx(className, isActive && activeClasses);

  return (
    <Link
      href={href}
      className={linkClasses}
      {...props}
      onClick={onClick && onClick}
    >
      {children}
    </Link>
  );
};

export default NavLink;
