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
      <main className="lg:container mx-auto flex flex-1 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
};
