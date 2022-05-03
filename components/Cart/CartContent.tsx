import Image from "next/image";
import { useCartState } from "./CartContext";

export const CartContent = () => {
  const { items } = useCartState();

  return (
    <div className="col-span-2">
      <div className="h-full max-h-[500px] overflow-y-auto">
        <div className="flex flex-col">
          <h2>Summary</h2>
          <ul>
            {items.map((cartItem) => {
              return (
                <li className="flex items-center h-32 w-full" key={cartItem.id}>
                  <div className="h-full w-32">
                    <Image
                      src={cartItem.thumbnailUrl}
                      alt={cartItem.thumbnailAlt}
                      layout="responsive"
                      width={5}
                      height={5}
                    />
                  </div>
                  <div className="ml-8 flex items-center">
                    <h3>{cartItem.title}</h3>
                    <p className="">
                      $ {cartItem.price} x {cartItem.count}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
