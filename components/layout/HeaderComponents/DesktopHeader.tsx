import { Cart } from "../../Cart/Cart";
import { NavLink } from "../../ButtonsAndLinks/NavLink";
import type { NavItem } from "../Header";

interface DesktopHeaderProps {
  navItems: NavItem[];
}

export const DesktopHeader = ({ navItems }: DesktopHeaderProps) => {
  return (
    <section className="hidden md:flex h-full container mx-auto items-center justify-between px-4">
      <nav className="h-full">
        <ul className="flex items-center h-full">
          {navItems.map(({ url, text }, index) => (
            <li
              className={`text-midnight ${index > 0 ? "ml-20" : ""}`}
              key={text}
            >
              <NavLink href={url}>{text}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <Cart />
    </section>
  );
};
