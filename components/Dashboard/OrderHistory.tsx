import { useEffect, useState } from "react";
import useMediaQuery from "../../util/useMediaquery";
import { Button } from "../ButtonsAndLinks/Button";
import { NothingHere } from "../NothingHere";
import { OrderHistoryListItem } from "./OrderHistoryListItem";
import { useGetPersonOrdersByIdsQuery } from "../../generated/graphql";

import type { RenderedInfo } from "../../pages/auth/dashboard";

interface OrderHistoryProps {
  setRenderedInfo: React.Dispatch<
    React.SetStateAction<RenderedInfo | undefined>
  >;
  orderIds: string[] | undefined;
}

export type OrderHistoryItem = {
  id: string;
  updatedAt: any;
  total: number;
  orderItems: {
    quantity: number;
    total: number;
    product: {
      name: string;
      price: number;
    };
  }[];
};

export const OrderHistory = ({
  setRenderedInfo,
  orderIds,
}: OrderHistoryProps) => {
  const [ordersDetails, setOrdersDetails] = useState<OrderHistoryItem[]>();
  const matches = useMediaQuery("(max-width: 768px)");
  const { data } = useGetPersonOrdersByIdsQuery({
    variables: {
      idArray: orderIds,
    },
  });

  useEffect(() => {
    if (!data?.orders) return;
    const ordersDetailsArray: OrderHistoryItem[] = data.orders.map((order) => ({
      id: order.id,
      total: order.total,
      updatedAt: order.updatedAt,
      orderItems: order.orderItems.map((orderItem) => ({
        quantity: orderItem.quantity,
        total: orderItem.total,
        product: {
          name: orderItem.product!.name,
          price: orderItem.product!.price,
        },
      })),
    }));
    setOrdersDetails(ordersDetailsArray);
  }, [data?.orders]);

  if (!orderIds?.length) {
    return (
      <NothingHere
        setRenderedInfo={setRenderedInfo}
        matches={matches}
        message="You have no orders to display"
      />
    );
  }

  return (
    <div className="h-full">
      <ul className="md:h-4/5 overflow-auto">
        {orderIds.map((orderId) => {
          const orderDetails = ordersDetails?.find(
            (order) => order.id === orderId
          );
          return (
            <OrderHistoryListItem key={orderId} orderDetails={orderDetails} />
          );
        })}
      </ul>
      {matches && (
        <Button
          bgColor="#F4F3FF"
          type="button"
          onClick={() => setRenderedInfo(undefined)}
          fullWidth
        >
          Go back
        </Button>
      )}
    </div>
  );
};
