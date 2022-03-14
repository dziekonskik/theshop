import { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}

export const Main = ({ children }: MainProps) => {
  return (
    <main className="relative flex-grow h-screen mx-auto grid gap-6">
      {children}
    </main>
  );
};
