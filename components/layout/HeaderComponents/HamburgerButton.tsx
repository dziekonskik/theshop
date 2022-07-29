import { motion, SVGMotionProps } from "framer-motion";

interface HamburgerButtonProps {
  open: boolean;
  toggleOpen: () => void;
}

export const HamburgerButton = ({ open, toggleOpen }: HamburgerButtonProps) => {
  return (
    <motion.button
      className="translate-x-1 text-midnight z-50"
      onClick={() => toggleOpen()}
      initial="closed"
      exit="open"
      animate={open ? "open" : "closed"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-9 w-9"
        viewBox="0 0 24 24"
        strokeWidth={1}
      >
        <motion.path
          stroke="#3F3D56"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={{
            closed: { d: "M13 20L21 20" },
            open: { d: "M3 4L21 20" },
          }}
        />
        <Motionpath
          variants={{
            closed: { d: "M3 12H21" },
            open: { d: "M25 12H25" },
          }}
        />
        <Motionpath
          variants={{
            closed: { d: "M3 4H21" },
            open: { d: "M3 20L21 4" },
          }}
        />
      </svg>
    </motion.button>
  );
};

const Motionpath = (props: SVGMotionProps<SVGPathElement>) => (
  <motion.path
    stroke="#3F3D56"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  />
);
