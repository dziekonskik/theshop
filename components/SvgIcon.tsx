interface SvgIconProps {
  children: React.ReactNode;
  strokeWidth?: number;
  width?: number;
  height?: number;
  className?: string;
}

export const SvgIcon = ({
  children,
  strokeWidth = 1,
  width = 24,
  height = 24,
  className,
}: SvgIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
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
