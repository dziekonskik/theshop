import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { UserAvatar } from "./UserAvatar";
import { Button } from "../ButtonsAndLinks/Button";

export const MenuPanel = () => {
  const router = useRouter();
  return (
    <section className="flex-1 max-w-md w-full flex flex-col">
      <span className="mb-3">
        <Button
          bgColor="#F4F3FF"
          type="button"
          onClick={() => {
            signOut();
            router.push("/");
          }}
        >
          Logout
        </Button>
      </span>
      <UserAvatar />
    </section>
  );
};
