interface AddToCartButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export const AddToCartButton = ({
  onClick,
  disabled,
}: AddToCartButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="inline-flex items-center px-6 py-1.5 bg-blue-600 text-white font-light italic leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out disabled:bg-slate-600"
    >
      Dodaj
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-6 w-6 ml-2 ${disabled ? "animate-wiggle" : ""}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
    </button>
  );
};
