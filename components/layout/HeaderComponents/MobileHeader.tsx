import { useEffect } from "react";
import Link from "next/link";
import { useCycle, motion, AnimatePresence } from "framer-motion";
import { HamburgerButton } from "./HamburgerButton";
import { Portal } from "../../Portal";
import { NavLink } from "../../ButtonsAndLinks/NavLink";
import { CartIcon } from "../../Svg";
import type { NavItem } from "../Header";

interface MobileHeaderProps {
  navItems: NavItem[];
}

export const MobileHeader = ({ navItems }: MobileHeaderProps) => {
  const [open, toggleOpen] = useCycle(false, true);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const navVariants = {
    open: {
      height: "100%",
    },
    closed: {
      height: 0,
      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const listItemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: -50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  return (
    <section className="relative h-full flex items-center justify-between px-4 md:hidden">
      <Link href="/cart">
        <a onClick={() => toggleOpen(0)}>
          <CartIcon className="h-9 w-9 mr-2" />
        </a>
      </Link>
      <HamburgerButton open={open} toggleOpen={toggleOpen} />
      <AnimatePresence exitBeforeEnter>
        {open && (
          <Portal>
            <motion.nav
              className="bg-bermuda fixed top-16 w-full flex flex-col justify-center items-start z-50"
              initial="closed"
              exit="closed"
              variants={navVariants}
              animate={open ? "open" : "closed"}
              layout
            >
              <motion.div className="flex-1" layout></motion.div>
              <ul className="flex-1 w-full flex flex-col justify-center items-center">
                {navItems.map(({ url, text }) => (
                  <motion.li
                    initial="closed"
                    exit="closed"
                    variants={listItemVariants}
                    animate={open ? "open" : "closed"}
                    key={text}
                    className="mb-7"
                    onClick={() => toggleOpen()}
                  >
                    <NavLink href={url}>{text}</NavLink>
                  </motion.li>
                ))}
              </ul>
              <div className="flex-1 w-full flex items-center justify-center">
                <NavLink href="/cart">
                  <motion.span
                    initial="closed"
                    exit="closed"
                    variants={listItemVariants}
                    animate={open ? "open" : "closed"}
                    className="flex"
                    onClick={() => toggleOpen()}
                  >
                    <CartIcon /> <span className="ml-2">Cart</span>
                  </motion.span>
                </NavLink>
              </div>
            </motion.nav>
          </Portal>
        )}
      </AnimatePresence>
    </section>
  );
};
