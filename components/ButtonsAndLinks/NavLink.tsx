import { useState } from "react";
import NextLink, { LinkProps } from "next/link";

interface NavLinkProps extends LinkProps {
  children: React.ReactNode;
}

export const NavLink = ({ children, href }: NavLinkProps) => {
  const [hovered, setHovered] = useState(false);
  return (
    <NextLink href={href}>
      <a
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="font-comfortaa uppercase font-bold text-xl relative block"
      >
        {children}
        <span
          className={`absolute uppercase top-0 left-0 text-purple transition-all duration-700 ${
            hovered ? "clip-path-revealed" : "clip-path-hidden"
          }`}
        >
          {children}
        </span>
      </a>
    </NextLink>
  );
};
