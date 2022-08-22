import { motion } from "framer-motion";
import { Button } from "../ButtonsAndLinks/Button";
import { EuroIcon } from "../Svg";
import { format } from "date-fns";
import type { OrderHistoryItem } from "../../util/types";

interface OrderHistoryListItemProps {
  orderDetails: OrderHistoryItem | undefined;
  setSelectedOrderId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const animation = { opacity: [0.25, 0.5, 0.75, 1, 0.75, 0.5, 0.25] };
const transition = { repeat: Infinity, duration: 2 };

export const OrderHistoryListItem = ({
  orderDetails,
  setSelectedOrderId,
}: OrderHistoryListItemProps) => {
  const { orderItems, total, updatedAt, id } = orderDetails || {};
  const formatedPurchaseDate =
    orderDetails && format(new Date(updatedAt), "do LLL yyyy, H:mm");
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
            animate={animation}
            transition={transition}
            className="h-5 w-2/3 bg-bermuda-intense rounded-full"
          ></motion.div>
        )}
        {orderDetails ? (
          <Button
            type="button"
            bgColor="#77aaFF"
            onClick={() => setSelectedOrderId(id)}
          >
            details
          </Button>
        ) : (
          <motion.div
            animate={animation}
            transition={transition}
            className="h-10 w-24 bg-bermuda-intense"
          ></motion.div>
        )}
      </div>
      {orderDetails ? (
        <div className="w-full mt-2 font-anonymous">
          <div className="mr-2">
            <span className="inline-block mr-1 font-bold">
              {orderItems?.length}
            </span>
            items for total of
            <span className="inline-block ml-2 font-bold">
              {Number(total) / 100}
              <EuroIcon className="inline" />
            </span>
          </div>
        </div>
      ) : (
        <motion.div
          animate={animation}
          transition={transition}
          className="h-5 w-1/3 mt-2 bg-bermuda-intense rounded-full"
        ></motion.div>
      )}
    </li>
  );
};
