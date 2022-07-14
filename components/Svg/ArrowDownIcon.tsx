import { SvgIcon } from "./SvgIcon";
import { IconComponentProps } from "./IconComponentProps";

export const ArrowDownIcon = (props: IconComponentProps) => (
  <SvgIcon {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 13l-5 5m0 0l-5-5m5 5V6"
    />
  </SvgIcon>
);
