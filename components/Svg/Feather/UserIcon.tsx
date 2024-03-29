import { SvgIcon } from "../SvgIcon";
import { IconComponentProps } from "../IconComponentProps";

export const UserIcon = (props: IconComponentProps) => (
  <SvgIcon {...props}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </SvgIcon>
);
