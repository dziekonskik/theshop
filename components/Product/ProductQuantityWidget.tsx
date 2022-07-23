import { ArrowUpIcon, ArrowDownIcon } from "../Svg";

interface ProductQuantityWidgetProps {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

export const ProductQuantityWidget = (props: ProductQuantityWidgetProps) => {
  const { quantity, setQuantity } = props;
  return (
    <article>
      <button
        onClick={() =>
          setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1))
        }
      >
        <ArrowDownIcon />
      </button>
      <span>{quantity}</span>
      <button onClick={() => setQuantity((prevQuantity) => prevQuantity + 1)}>
        <ArrowUpIcon />
      </button>
    </article>
  );
};
