import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Cart } from "../Cart/Cart";

interface NavItem {
  url: string;
  text: string;
}

export const Header = () => {
  const [navItems, _] = useState<NavItem[]>([
    { url: "/", text: "Home" },
    { url: "/products", text: "Products" },
  ]);

  const { pathname } = useRouter();

  return (
    <header className="bg-slate-300 h-24 mb-7">
      <DesktopHeader navItems={navItems} pathname={pathname} />
    </header>
  );
};

interface DesktopHeaderProps {
  navItems: NavItem[];
  pathname: string;
}

const DesktopHeader = ({ navItems, pathname }: DesktopHeaderProps) => {
  const [, keyword] = pathname.split("/");
  return (
    <div className="container hidden md:flex items-center h-full justify-between mx-auto">
      <nav className="h-full">
        <ul className="flex items-center h-full">
          {navItems.map(({ url, text }, i) => (
            <li
              className={`p-4 ${
                url === `/${keyword}`
                  ? "bg-indigo-600 text-white"
                  : "text-slate-900"
              } ${i > 0 ? "ml-10" : ""}`}
              key={text}
            >
              <Link href={url}>
                <a className="p-4">{text}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <Cart />
    </div>
  );
};
