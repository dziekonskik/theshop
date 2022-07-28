interface AddToCartButtonProps {
  onClick: (...args: any) => void;
  disabled: boolean;
  children: React.ReactNode;
  type: React.ButtonHTMLAttributes<string>["type"];
  svgMarkup?: React.ReactNode;
  bgColor: "#77aaFF" | "#F4F3FF";
}

export const Button = ({
  onClick,
  disabled,
  children,
  svgMarkup,
  bgColor,
  type,
}: AddToCartButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex items-center px-6 py-2 font-comfortaa uppercase shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
      style={{
        backgroundColor: bgColor,
        color: bgColor === "#77aaFF" ? "#F4F3FF" : "#565584",
      }}
    >
      <span className="translate-y-px flex items-center">
        {children}
        {svgMarkup && svgMarkup}
      </span>
    </button>
  );
};
