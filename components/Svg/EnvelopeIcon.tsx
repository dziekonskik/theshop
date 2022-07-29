import { SvgIcon } from "./SvgIcon";
import { IconComponentProps } from "./IconComponentProps";

export const EnvelopeIcon = (props: IconComponentProps) => (
  <SvgIcon {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </SvgIcon>
);
