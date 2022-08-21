import { motion } from "framer-motion";
import { Button } from "../ButtonsAndLinks/Button";
import { EuroIcon } from "../Svg";
import { format } from "date-fns";
import type { OrderHistoryItem } from "./OrderHistory";

interface OrderHistoryListItemProps {
  orderDetails: OrderHistoryItem | undefined;
}

export const OrderHistoryListItem = ({
  orderDetails,
}: OrderHistoryListItemProps) => {
  const { orderItems, total, updatedAt } = orderDetails || {};
  const formatedPurchaseDate = format(new Date(updatedAt), "do LLL yyyy, H:mm");
  return (
    <li
      className="text-midnight my-4 py-4 lg:w-3/5 mx-auto border-b"
      style={{
        borderBottom: `1px solid ${orderDetails ? "#565584" : "#78DCCA"}`,
      }}
    >
      <div className="flex justify-between items-center">
        {orderDetails ? (
          <div className="font-anonymous">
            Purchased on:
            <div className="lg:inline ml-1">{formatedPurchaseDate}</div>
          </div>
        ) : (
          <motion.div
            animate={{ opacity: [0.25, 0.5, 0.75, 1, 0.75, 0.5, 0.25] }}
            transition={{ loop: Infinity, duration: 2 }}
            className="h-5 w-2/3 bg-bermuda-intense rounded-full"
          ></motion.div>
        )}
        {orderDetails ? (
          <Button type="button" bgColor="#77aaFF" onClick={() => {}}>
            details
          </Button>
        ) : (
          <motion.div
            animate={{ opacity: [0.25, 0.5, 0.75, 1, 0.75, 0.5, 0.25] }}
            transition={{ loop: Infinity, duration: 2 }}
            className="h-10 w-24 bg-bermuda-intense"
          ></motion.div>
        )}
      </div>
      {orderDetails ? (
        <div className="w-full mt-2 font-anonymous">
          <span className="mr-2">
            {orderItems?.length} items for total of {Number(total) / 100}
          </span>
          <EuroIcon className="inline" />
        </div>
      ) : (
        <motion.div
          animate={{ opacity: [0.25, 0.5, 0.75, 1, 0.75, 0.5, 0.25] }}
          transition={{ loop: Infinity, duration: 2 }}
          className="h-5 w-1/3 mt-2 bg-bermuda-intense rounded-full"
        ></motion.div>
      )}
    </li>
  );
};
