import { CartContentListItem } from "./CartContentListItem";
import { useCartState } from "./CartContext";

export const CartContent = () => {
  const { cartState, handleOrder } = useCartState();
  return (
    <div className="col-span-12 lg:col-span-6 w-full">
      <div className="h-full lg:max-h-[550px] overflow-y-auto scrollbar w-full py-4">
        <div className="flex flex-col">
          <ul className="w-full">
            {cartState.map((cartItem) => {
              return (
                <CartContentListItem
                  cartItem={cartItem}
                  handleOrder={handleOrder}
                  key={cartItem.product.id}
                />
              );
            })}
          </ul>
        </div>
      </div>
      <div className="h-20 bg-gradient-to-b from-transparent to-gray-50 -translate-y-20"></div>
    </div>
  );
};
