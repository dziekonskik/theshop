import { IconComponentProps } from "./IconComponentProps";

interface SvgIconProps extends IconComponentProps {
  children: React.ReactNode;
}

export const SvgIcon = ({
  children,
  strokeWidth = 1,
  width = 24,
  height = 24,
  className,
  fill = "none",
}: SvgIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill={fill}
      viewBox={`0 0 ${width} ${height}`}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      width={width}
      height={height}
    >
      {children}
    </svg>
  );
};
