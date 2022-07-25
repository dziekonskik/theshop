import { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Main } from "./Main";

interface Props {
  children: ReactNode;
}
export const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col justify-between w-full min-h-screen">
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
};
