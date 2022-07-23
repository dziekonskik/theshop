import {
  useDeleteOrderItemByIdMutation,
  useUpdateOrderMutation,
} from "../../generated/graphql";
import type { CartItem } from "../types";

interface UseDeleteOrderItemProps {
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  setCartTotal: React.Dispatch<React.SetStateAction<number>>;
  cartIdFromStorage: string | null;
  cartTotal: number;
}

export const useDeleteOrderItem = ({
  cartIdFromStorage,
  setCartItems,
  setCartTotal,
  cartTotal,
}: UseDeleteOrderItemProps) => {
  const [deleteOrderItemByIdMutation, deleteOrderItemByIdMutationStatus] =
    useDeleteOrderItemByIdMutation();
  const [updateOrderById, updateOrderByIdStatus] = useUpdateOrderMutation();

  const deleteOrderItem = async (id: string) => {
    const { data: orderItemData } = await deleteOrderItemByIdMutation({
      variables: { id },
    });
    const deletedItemTotal = orderItemData?.deleteOrderItem?.total;
    const deletedItemId = orderItemData?.deleteOrderItem?.id;

    if (!deletedItemTotal || !deletedItemId) return;
    const { data: orderData } = await updateOrderById({
      variables: {
        id: { id: cartIdFromStorage },
        data: { total: cartTotal - deletedItemTotal },
      },
    });
    const newOrderTotal = orderData?.updateOrder?.total;
    if (newOrderTotal === undefined) return;

    setCartItems((prevItems) => {
      const newCartState = prevItems.filter(
        (cartItem) => cartItem.id !== deletedItemId
      );
      return newCartState;
    });
    setCartTotal(newOrderTotal);
  };

  return { deleteOrderItem };
};
