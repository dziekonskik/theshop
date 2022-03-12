import Link from "next/link";

interface PaginationItemProps {
  pageNumber: number;
  currentPage: number;
  setCurrentPage: (x: number) => void;
}

export const PaginationItem = ({
  pageNumber,
  currentPage,
  setCurrentPage,
}: PaginationItemProps) => (
  <Link href={`/products/${pageNumber}`}>
    <a
      onClick={() => setCurrentPage(pageNumber)}
      className={`${
        currentPage === pageNumber
          ? "border-indigo-500 text-indigo-600"
          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
      } border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium`}
    >
      {pageNumber}
    </a>
  </Link>
);
