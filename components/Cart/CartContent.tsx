import { useEffect, useState, forwardRef, useRef } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { BigLink } from "../ButtonsAndLinks/BigLink";
import { CartContentListItem } from "./CartContentListItem";
import { useCartState } from "./CartContext";
import type { CartItem } from "../../util/types";

export const CartContent = () => {
  const [cartIemsListHeight, setCartItemsListHeight] = useState<number>(0);
  const [scrollbarVisible, setScrollbarVisible] = useState(false);
  const { cartItems, cartTotal, deleteOrderItem, increment, decrement } =
    useCartState();
  const mobileBottomWidgetRef = useRef<HTMLSelectElement | null>(null);
  const cartIemsListRef = useRef<HTMLUListElement | null>(null);
  const { scrollYProgress } = useScroll({
    container: cartIemsListRef,
  });
  const scaleX = useSpring(scrollYProgress);
  // this is the value of my-7 on ul element and h-2 of scroll indicator
  const listMagrinY = 28 * 2 + 8;

  useEffect(() => {
    const handleScrollbarVisibility = () => {
      if (!cartIemsListRef.current) return;
      const scrollbarVisible =
        cartIemsListRef.current?.scrollHeight >
        cartIemsListRef.current?.clientHeight;
      setScrollbarVisible(scrollbarVisible);
    };

    cartIemsListRef.current?.addEventListener(
      "scroll",
      handleScrollbarVisibility
    );
    () => {
      cartIemsListRef.current?.removeEventListener(
        "scroll",
        handleScrollbarVisibility
      );
    };
  }, [cartItems.length]);

  useEffect(() => {
    const headerHeight = document
      .getElementById("header")
      ?.getBoundingClientRect().height;
    const footerHeight = document
      .getElementById("footer")
      ?.getBoundingClientRect().height;
    const documentElementHeight = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
    const mobileBottomWidgetHeight =
      mobileBottomWidgetRef.current?.getBoundingClientRect().height || 0;

    const handleLayoutElementsHEight = () => {
      if (headerHeight && footerHeight && documentElementHeight) {
        setCartItemsListHeight(
          documentElementHeight -
            (headerHeight + footerHeight + mobileBottomWidgetHeight)
        );
      }
    };
    if (!cartIemsListHeight) {
      handleLayoutElementsHEight();
    }
    document.addEventListener("resize", handleLayoutElementsHEight);
    () => {
      document.removeEventListener("resize", handleLayoutElementsHEight);
    };
  }, [cartIemsListHeight]);

  return (
    <div className="flex flex-col w-full lg:w-1/2 h-full">
      {scrollbarVisible && (
        <motion.div
          className="h-2 w-full bg-bubble-gum"
          style={{ scaleX, transformOrigin: "0 0" }}
        ></motion.div>
      )}
      <motion.ul
        ref={cartIemsListRef}
        className="my-7 pt-7 overflow-y-auto scrollbar"
        style={{ height: cartIemsListHeight - listMagrinY }}
      >
        <AnimatePresence>
          {cartItems.map((cartItem) => {
            return (
              <CartContentListItem
                cartItem={cartItem}
                deleteOrderItem={deleteOrderItem}
                increment={increment}
                decrement={decrement}
                key={cartItem.product.slug}
              />
            );
          })}
        </AnimatePresence>
      </motion.ul>
      <SummaryBottomWidgetMobile
        ref={mobileBottomWidgetRef}
        cartItems={cartItems}
        cartTotal={cartTotal}
      />
    </div>
  );
};

interface SummaryBottomWidgetMobileProps {
  cartItems: CartItem[];
  cartTotal: number;
}

const SummaryBottomWidgetMobile = forwardRef(
  (
    { cartItems, cartTotal }: SummaryBottomWidgetMobileProps,
    ref: React.ForwardedRef<HTMLSelectElement>
  ) => (
    <section
      ref={ref}
      className="bg-sunny bg-opacity-90 lg:hidden sticky bottom-0 z-10 flex p-2"
    >
      <div className="container mx-auto flex justify-between">
        <summary className="flex flex-col w-1/2 md:w-1/3">
          <div className="flex justify-between mt-4 font-comfortaa">
            <span className="capitalize">Items:</span>
            <span>{cartItems.length}</span>
          </div>
          <div className="flex justify-between mt-4 font-comfortaa">
            <span className="capitalize">Discount:</span>
            <span>$ 0</span>
          </div>
          <div className="flex justify-between mt-4 font-comfortaa">
            <span className="uppercase mr-3">Total:</span>
            <span>$ {cartTotal / 100}</span>
          </div>
        </summary>
        <article className="flex justify-center items-center w-1/2 md:w-1/3">
          <BigLink bgColor="#6C63FF" href="/checkout">
            checkout
          </BigLink>
        </article>
      </div>
    </section>
  )
);
SummaryBottomWidgetMobile.displayName = "SummaryBottomWidgetMobile";
