import { useState, useEffect } from "react";
import { NewsletterForm } from "../components/Forms/NewsletterForm";
import { BigLink } from "../components/ButtonsAndLinks/BigLink";
import useMediaQuery from "../util/useMediaquery";

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  const matches = useMediaQuery("(max-width: 640px)");

  useEffect(() => {
    if (matches) setIsMobile(true);
  }, [matches]);

  return (
    <section className="px-4 flex flex-col flex-1">
      <NewsletterForm className="max-w-md mt-10" />
      <article className="w-full mt-16 md:mt-20 flex-1">
        <div className="font-comfortaa flex flex-col text-midnight">
          <h1 className="mb-5 text-3xl lg:text-4xl capitalize">The shop</h1>
          <h2 className="text-lg mb-4">
            A place where you can buy fictional products for fictional money,
            enjoy!
          </h2>
          <BigLink fullWidth={isMobile} href="/products" bgColor="#6C63FF">
            Shop now
          </BigLink>
        </div>
      </article>
    </section>
  );
};

export default Home;
