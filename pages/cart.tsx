import { useState, useEffect } from "react";
import { CartContent } from "../components/Cart/CartContent";
import { CartSummary } from "../components/Cart/CartSummary";
import { EmptyCart } from "../components/Cart/EmptyCart";
import { CubeTransparentIcon } from "../components/Svg";
import { apolloClient } from "../graphql/apolloClient";
import {
  GetOrderTotalAndItemsByIdDocument,
  GetOrderTotalAndItemsByIdQuery,
  GetOrderTotalAndItemsByIdQueryVariables,
} from "../generated/graphql";
import { getCartIdFromStorage } from "../util/cartHelpers/cartUtilFunctions";

type CartPageItemsState = "loading" | "no-items" | "with-items";

const CartPage = () => {
  const [cartPageState, setCartPageState] =
    useState<CartPageItemsState>("loading");

  useEffect(() => {
    const cartIdFromStorage = getCartIdFromStorage();
    if (!cartIdFromStorage) {
      setCartPageState("no-items");
      return;
    }
    apolloClient
      .mutate<
        GetOrderTotalAndItemsByIdQuery,
        GetOrderTotalAndItemsByIdQueryVariables
      >({
        mutation: GetOrderTotalAndItemsByIdDocument,
        variables: {
          id: cartIdFromStorage,
        },
      })
      .then(({ data }) => {
        const orderItemsArray = data?.order?.orderItems;
        orderItemsArray?.length
          ? setCartPageState("with-items")
          : setCartPageState("no-items");
      });
  }, []);

  if (cartPageState === "loading") {
    return (
      <div className="w-full h-96 grid place-content-center">
        <CubeTransparentIcon className="h-20 w-20 animate-spin" />
      </div>
    );
  }
  if (cartPageState === "no-items") {
    return <EmptyCart />;
  }
  if (cartPageState === "with-items") {
    return (
      <div className="flex w-full h-full gap-6">
        <CartContent />
        <CartSummary />
      </div>
    );
  }
};

export default CartPage;
