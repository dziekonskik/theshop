import { CartContentListItem } from "./CartContentListItem";
import { useCartState } from "./CartContext";

export const CartContent = () => {
  const { cartState, handleOrder } = useCartState();
  return (
    <div className="col-span-2">
      <div className="h-full max-h-[500px] overflow-y-auto">
        <div className="flex flex-col">
          <h2 className="font-hubballi text-3xl">Summary</h2>
          <ul>
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
