import { SvgIcon } from "./SvgIcon";
import { IconComponentProps } from "./IconComponentProps";

export const MessageIcon = (props: IconComponentProps) => (
  <SvgIcon {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
    />
  </SvgIcon>
);
