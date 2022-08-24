import Image from "next/image";
import accessDeniedGraphic from "../../public/assets/shapes/access_denied.svg";
import { BigLink } from "../ButtonsAndLinks/BigLink";
import useMediaQuery from "../../util/useMediaquery";

export const AccessDenied = () => {
  return (
    <section className="font-comfortaa text-midnight flex flex-col items-center justify-center flex-1 h-full">
      <h1 className="capitalize text-2xl my-6 lg:mt-0">Access denied</h1>
      <h3 className="text-xl text-center">Login to enter user area</h3>
      <div>
        <Image
          src={accessDeniedGraphic}
          alt="access denied graphic"
          height={300}
          width={200}
        />
      </div>
      <div className="md:flex items-center relative my-6 text-center">
        <div>
          <BigLink href="/auth/signup" bgColor="#6C63FF">
            Register
          </BigLink>
        </div>
        <div className="my-14 md:my-7 md:mx-10 ">
          <BigLink href="/auth/login" bgColor="#6C63FF">
            Log in
          </BigLink>
        </div>
        <div>
          <BigLink href="/products" bgColor="#F4E13E">
            Go shopping
          </BigLink>
        </div>
      </div>
    </section>
  );
};
