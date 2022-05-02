import { useCartState } from "./CartContext";

interface CartSummaryProps {
  handlePayment: () => void;
}
export const CartSummary = ({ handlePayment }: CartSummaryProps) => {
  const { calculateCartTotal } = useCartState();
  const cartTotal = calculateCartTotal();
  return (
    <div>
      <h3>Total: {cartTotal} PLN</h3>
      <button
        onClick={handlePayment}
        className="inline-block mt-4 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      >
        Potwierdź zamówienie
      </button>
    </div>
  );
};