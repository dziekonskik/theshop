import Image from "next/image";
import { useCartState } from "../components/Cart/CartContext";

const CartContent = () => {
  const { items, removeItemsFromCart } = useCartState();
  return (
    <div className="col-span-2">
      <div className="h-full overflow-y-auto">
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
                    <p className="">$ {cartItem.price}</p>
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

const CartSummary = () => (
  <div>
    <p>Total</p>
    <h4>
      <span>$</span>
    </h4>
  </div>
);

const CartPage = () => {
  const { items } = useCartState();
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-3 gap-8">
        <CartContent />
        <CartSummary />
      </div>
    </div>
  );
};

export default CartPage;
