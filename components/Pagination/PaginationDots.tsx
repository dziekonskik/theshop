import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

interface TheDotsProps {
  condition: boolean;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const PaginationDots = ({ condition, setCurrentPage }: TheDotsProps) => {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleInputChange = (value: string) => {
    if (Number.isNaN(+value)) return;
    setInputValue(value);
  };

  useEffect(() => {
    const handleEnterKey = (e: KeyboardEvent) => {
      if (inputValue && e.key === "Enter") {
        router.push(`/products/${inputValue}`);
        setInputValue("");
      }
    };
    document.addEventListener("keyup", handleEnterKey);
    () => {
      document.removeEventListener("keyup", handleEnterKey);
    };
  }, [inputValue, router]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  if (showInput) {
    return (
      <input
        ref={inputRef}
        onMouseOut={() => setShowInput(false)}
        className="w-8 text-indigo-600 p-1 shadow-md transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 outline-0"
        placeholder="nr"
        type="text"
        value={inputValue}
        onChange={({ target }) => handleInputChange(target.value)}
      />
    );
  }
  {
    return condition ? (
      <div onMouseEnter={() => setShowInput(true)}>
        <span className="mx-1 font-bold">.</span>
        <span className="mx-1 font-bold text-indigo-600">.</span>
        <span className="mx-1 font-bold">.</span>
      </div>
    ) : null;
  }
};
