import { useEffect } from "react";
import { useCycle, motion, AnimatePresence } from "framer-motion";
import { useSession, signIn, signOut } from "next-auth/react";
import { HamburgerButton } from "./HamburgerButton";
import { Cart } from "../../Cart/Cart";
import { Portal } from "../../Portal";
import { NavLink } from "../../ButtonsAndLinks/NavLink";
import { CartIcon } from "../../Svg";
import { UserIcon, UserLoggedInIcon } from "../../Svg/Feather";
import type { NavItem } from "../Header";

interface MobileHeaderProps {
  navItems: NavItem[];
}

export const MobileHeader = ({ navItems }: MobileHeaderProps) => {
  const [open, toggleOpen] = useCycle(false, true);
  const session = useSession();

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
      <div className="flex">
        <Cart strokeWidth={1} />
        {session.status === "authenticated" ? (
          <button onClick={() => signOut()}>
            <UserLoggedInIcon className="h-6 w-6 ml-5 text-midnight" />
          </button>
        ) : (
          <button onClick={() => signIn()}>
            <UserIcon className="h-6 w-6 ml-5 text-midnight" />
          </button>
        )}
      </div>
      <HamburgerButton open={open} toggleOpen={toggleOpen} />
      <AnimatePresence exitBeforeEnter>
        {open && (
          <Portal>
            <motion.nav
              className="bg-bermuda fixed top-0 w-full flex flex-col justify-center items-start z-30"
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
