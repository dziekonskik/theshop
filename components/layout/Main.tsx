import { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}

export const Main = ({ children }: MainProps) => {
  return <main className="lg:container mx-auto w-full py-5 ">{children}</main>;
};
