import Link from "next/link";
import { PaginationItem } from "./PaginationItem";

interface Props {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  numberOfPages: number;
}

export const Pagination = ({
  currentPage,
  setCurrentPage,
  numberOfPages,
}: Props) => {
  return (
    <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0">
      <div className="hidden md:-mt-px md:flex items-baseline">
        <Link href={`/products${currentPage > 1 ? `/${currentPage - 1}` : ""}`}>
          <a className="mr-4 bg-indigo-600 hover:bg-indigo-700 text-white shadow-md p-2 disabled:bg-indigo-300">
            Prev
          </a>
        </Link>
        {Array.from({ length: numberOfPages }, (_, i) => (
          <PaginationItem
            currentPage={currentPage}
            pageNumber={i + 1}
            setCurrentPage={setCurrentPage}
            key={i}
          />
        ))}
        <Link href={`/products/${Math.min(currentPage + 1, numberOfPages)}`}>
          <a className="ml-4 bg-indigo-600 hover:bg-indigo-700 text-white shadow-md p-2">
            Next
          </a>
        </Link>
      </div>
    </nav>
  );
};
