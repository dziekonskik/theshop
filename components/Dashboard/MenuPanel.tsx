import { signOut } from "next-auth/react";
import { Button } from "../ButtonsAndLinks/Button";

interface MenuPanelProps {
  children: React.ReactNode;
}

export const MenuPanel = ({ children }: MenuPanelProps) => {
  return (
    <section className="w-full max-w-md">
      <span className="mb-3 block">
        <Button
          bgColor="#F4F3FF"
          type="button"
          onClick={() => {
            signOut({
              redirect: true,
              callbackUrl: process.env.NEXT_PUBLIC_BASE_URL,
            });
          }}
        >
          Logout
        </Button>
      </span>
      {children}
    </section>
  );
};
