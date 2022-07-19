import { SvgIcon } from "./SvgIcon";
import { IconComponentProps } from "./IconComponentProps";

export const CubeTransparentIcon = (props: IconComponentProps) => (
  <SvgIcon {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
    />
  </SvgIcon>
);
