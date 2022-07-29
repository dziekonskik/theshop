import { SvgIcon } from "../SvgIcon";
import { IconComponentProps } from "../IconComponentProps";
import { motion } from "framer-motion";

export const AnimatedCheckHeroIcon = (props: IconComponentProps) => (
  <SvgIcon {...props}>
    <motion.path
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{
        pathLength: 1,
        transition: { duration: 0.4 },
      }}
      d="M5 13l4 4L19 7"
    />
  </SvgIcon>
);
