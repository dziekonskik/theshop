import { useState, ButtonHTMLAttributes } from "react";

interface ButtonWithIconProps {
  children: React.ReactNode;
  type: ButtonHTMLAttributes<string>["type"];
  onClick: (...args: any) => void;
  side: "left" | "right";
  svgMarkup: React.ReactNode;
  bgColor: "#6C63FF" | "#F4E13E";
  fullWidth?: boolean;
}

export const ButtonWithIcon = ({
  children,
  onClick,
  side,
  svgMarkup,
  bgColor,
  fullWidth,
}: ButtonWithIconProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      className={`px-10 py-5 font-acme text-lg uppercase shadow-xl hover:shadow-lg hover:brightness-110 flex items-center justify-center ${
        fullWidth ? "w-full" : ""
      }`}
      style={{ backgroundColor: bgColor }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {side === "left" && (
        <span
          className={`mr-3 text-lg ${isHovered ? "animate-wiggleOnce" : ""}`}
        >
          {svgMarkup}
        </span>
      )}
      {children}
      {side === "right" && (
        <span
          className={`ml-3 text-lg ${isHovered ? "animate-wiggleOnce" : ""}`}
        >
          {svgMarkup}
        </span>
      )}
    </button>
  );
};
