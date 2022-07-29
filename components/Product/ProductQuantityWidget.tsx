import { ArrowUpIcon, ArrowDownIcon } from "../Svg";
import { motion } from "framer-motion";

interface ProductQuantityWidgetProps {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

export const ProductQuantityWidget = (props: ProductQuantityWidgetProps) => {
  const { quantity, setQuantity } = props;
  return (
    <article className="hover:shadow-sm bg-silver border border-b-lightblue border-l-lightblue border-t-midnight border-r-midnight flex items-center mb-4 w-fit">
      <button
        className="p-2 lg:p-1"
        onClick={() =>
          setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1))
        }
      >
        <ArrowDownIcon className="h-7 w-7 lg:h-6 lg:w-6" />
      </button>
      <span className="mx-4">{quantity}</span>
      <motion.button
        className="p-2 lg:p-1"
        onClick={() => setQuantity((prevQuantity) => prevQuantity + 1)}
      >
        <ArrowUpIcon className="h-7 w-7 lg:h-6 lg:w-6" />
      </motion.button>
    </article>
  );
};
