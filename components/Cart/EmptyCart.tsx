import Image from "next/image";
import emptyCartHorizontalImg from "../../public/assets/shapes/empty-cart-couple.svg";
import emptyCartVerticalImg from "../../public/assets/shapes/girl-wants-gift.svg";

export const EmptyCart = () => {
  return (
    <div className="flex-1 flex flex-col h-full">
      <section className="mt-10 flex place-content-center">
        <h1 className="text-center font-comfortaa md:text-5xl lg:text-6xl xl:text-7xl hidden md:block flex-1">
          Just allow yourself.
        </h1>
        <h1 className="text-center font-comfortaa text-4xl md:hidden mb-5">
          Go for it!
        </h1>
      </section>
      <section className="flex-1 flex justify-center items-end">
        <div className="relative hidden md:flex">
          <Image
            src={emptyCartHorizontalImg}
            alt="graphic of a couple staring on a wrapped gift"
          />
        </div>
        <div className="relative md:hidden flex items-end justify-center align-self-end">
          <Image
            src={emptyCartVerticalImg}
            alt="graphic of a couple staring on a wrapped gift"
            height="500"
            className="bottom-0 object-cover"
          />
        </div>
      </section>
    </div>
  );
};
