import { SVGAttributes } from "react";

export type IconComponentProps = Partial<
  Pick<
    SVGAttributes<SVGSVGElement>,
    "strokeWidth" | "className" | "width" | "height" | "fill"
  >
>;
