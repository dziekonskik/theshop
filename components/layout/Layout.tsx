import { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Main } from "./Main";

interface Props {
  children: ReactNode;
}
export const Layout = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
};
