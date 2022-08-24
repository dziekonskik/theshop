import { SvgIcon } from "../SvgIcon";
import { IconComponentProps } from "../IconComponentProps";

export const TargetIcon = (props: IconComponentProps) => (
  <SvgIcon {...props}>
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </SvgIcon>
);
