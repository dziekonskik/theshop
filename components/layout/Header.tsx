import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export const Header = () => {
  const [navItems, _] = useState([
    { url: "/", text: "Home" },
    { url: "/products", text: "Products" },
  ]);

  const { pathname } = useRouter();
  const [, keyword] = pathname.split("/");

  return (
    <header className="bg-slate-300 h-24 mb-7">
      <nav className="container mx-auto h-full">
        <ul className="flex items-center h-full">
          {navItems.map(({ url, text }, i) => (
            <li
              className={`p-4 ${
                url === `/${keyword}`
                  ? "bg-indigo-600 text-white"
                  : "bg-grey-50 text-indigo-600"
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
    </header>
  );
};
