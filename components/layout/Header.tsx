import { useState } from "react";
import { DesktopHeader, MobileHeader } from "./HeaderComponents";

export interface NavItem {
  url: string;
  text: string;
}

export const Header = () => {
  const [navItems, _] = useState<NavItem[]>([
    { url: "/", text: "Home" },
    { url: "/products", text: "Products" },
  ]);

  return (
    <header className="h-16 lg:h-32 bg-bermuda" id="header">
      <DesktopHeader navItems={navItems} />
      <MobileHeader navItems={navItems} />
    </header>
  );
};
