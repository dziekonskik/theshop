import { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

interface Props {
  children: ReactNode;
}
export const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col justify-between w-full min-h-screen">
      <Header />
      <main className="lg:container lg:mx-auto flex flex-1">{children}</main>
      <Footer />
    </div>
  );
};
