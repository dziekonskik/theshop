import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Portal } from "../Portal";
import { CloseIcon, EuroIcon } from "../Svg";
import type { OrderHistoryItem } from "../../util/types";

interface OrderDetailsModalProps {
  setSelectedOrderId: React.Dispatch<React.SetStateAction<string | undefined>>;
  orderDetails: OrderHistoryItem | undefined;
}

export const OrderDetailsModal = ({
  orderDetails,
  setSelectedOrderId,
}: OrderDetailsModalProps) => {
  if (!orderDetails) return null;
  const { orderItems, total, updatedAt } = orderDetails;
  const formatedPurchaseDate = format(new Date(updatedAt), "do LLL yyyy, H:mm");
  return (
    <Portal>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setSelectedOrderId(undefined)}
        className="hidden lg:block bg-happy bg-opacity-30 absolute left-0 right-0 top-0 bottom-0 z-50"
      ></motion.div>

      <motion.article
        layout="position"
        initial={{ translateY: "-100%", translateX: "-50%" }}
        animate={{ translateY: "-50%", translateX: "-50%", scale: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        className="h-full w-full flex lg:h-1/2 lg:w-1/3 absolute top-1/2 left-1/2 p-4 bg-blue z-[999] font-anonymous"
      >
        <motion.span
          className="absolute top-4 right-4 text-silver"
          onClick={() => setSelectedOrderId(undefined)}
          whileHover={{ rotate: "10deg", scale: "0.9" }}
        >
          <CloseIcon className="h-9 w-9 cursor-pointer" />
        </motion.span>
        <div className="h-full w-full">
          <div className="text-silver">
            <span>Purchase date: </span>
            <span className="font-bold">{formatedPurchaseDate}</span>
          </div>
          <main className="flex flex-col justify-around items-center h-4/5">
            <h2 className="text-2xl text-silver mt-6">Puchased goods:</h2>
            <div>
              <ul>
                {orderItems.map(({ product, quantity, total }) => (
                  <li key={product.name} className="text-platinium">
                    <div>
                      <span className="font-bold">{product.name}</span> x{" "}
                      {quantity} - {total / 100}
                      <EuroIcon className="inline ml-1" />
                    </div>
                  </li>
                ))}
              </ul>
              <div className="text-xl text-platinium mt-4">
                Total: {total / 100}
                <EuroIcon className="inline ml-1" />
              </div>
            </div>
            <h3 className="text-2xl text-bubble-gum font-bold w-fit">
              Thank you!
              <motion.div
                className="bg-sunny w-10"
                layout
                initial={{ height: 2 }}
                animate={{ x: ["30%", "170%", "30%"], height: 2 }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  type: "spring",
                }}
              ></motion.div>
            </h3>
          </main>
        </div>
      </motion.article>
    </Portal>
  );
};
