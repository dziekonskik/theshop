import { useState, ButtonHTMLAttributes } from "react";

interface ButtonWithIconProps {
  children: React.ReactNode;
  type: ButtonHTMLAttributes<string>["type"];
  onClick: (...args: any) => void;
  side: "left" | "right";
  svgMarkup: React.ReactNode;
  bgColor: "#6C63FF" | "#F4E13E";
  fullWidth?: boolean;
  disabled?: boolean;
}

export const ButtonWithIcon = ({
  children,
  onClick,
  side,
  svgMarkup,
  bgColor,
  fullWidth,
  disabled,
}: ButtonWithIconProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-10 py-5 font-comfortaa text-lg uppercase shadow-xl hover:shadow-lg hover:brightness-110 flex items-center justify-center"
      style={{
        backgroundColor: bgColor,
        color: bgColor === "#6C63FF" ? "#F4F3FF" : "#3F3D56",
        width: fullWidth ? "100%" : "fit-content",
      }}
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
