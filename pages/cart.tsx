import { useCartState } from "../components/Cart/CartContext";

const CartContent = () => {
  const { items, removeItemsFromCart } = useCartState();
  return (
    <div className="col-span-2">
      <ul className="divide-y divide-grey-200 divide-dashed">
        {items.map(({ title, price, count, id }, index) => (
          <li className="flex justify-between p-3" key={`${index}-${title}`}>
            <div>
              {count} x {title}
            </div>
            <div className="flex">
              {price}
              <div
                className="ml-2 text-red-500 cursor-pointer"
                onClick={() => removeItemsFromCart(id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-label="Usuń element"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const CartSummary = () => <div>Podsumowanie koszyka</div>;

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
