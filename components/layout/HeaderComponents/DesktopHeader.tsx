import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { Cart } from "../../Cart/Cart";
import { NavLink } from "../../ButtonsAndLinks/NavLink";
import { UserIcon, UserLoggedInIcon } from "../../Svg/Feather";
import type { NavItem } from "../Header";

interface DesktopHeaderProps {
  navItems: NavItem[];
}

export const DesktopHeader = ({ navItems }: DesktopHeaderProps) => {
  const session = useSession();
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
      <div className="flex items-center">
        {session.status === "authenticated" ? (
          <Link href="/auth/dashboard">
            <a>
              <UserLoggedInIcon
                className="h-6 w-6 mr-5 text-midnight"
                strokeWidth={2}
              />
            </a>
          </Link>
        ) : (
          <button onClick={() => signIn()}>
            <UserIcon className="h-6 w-6 mr-5 text-midnight" strokeWidth={2} />
          </button>
        )}
        <Cart strokeWidth={2} />
      </div>
    </section>
  );
};
