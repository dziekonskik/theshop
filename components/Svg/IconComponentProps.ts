import { SVGAttributes } from "react";
import { SVGMotionProps } from "framer-motion";

// only vital svg props, to be extended if necessaary
export type IconComponentProps = Partial<
  Pick<
    SVGAttributes<SVGSVGElement>,
    "strokeWidth" | "className" | "width" | "height" | "fill"
  >
> &
  Partial<
    Pick<
      SVGMotionProps<SVGSVGElement>,
      "pathLength" | "initial" | "animate" | "exit" | "variants"
    >
  >;
