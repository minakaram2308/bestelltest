export interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  exact?: boolean;
  className?: string;
  activeClasses?: string;
  onClick?: () => void;
}
