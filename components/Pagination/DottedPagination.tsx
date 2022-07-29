import Link from "next/link";
import { PaginationArray, PaginationItem, PaginationDots } from ".";

interface Props {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  numberOfPages: number;
}

export const DottedPagination = ({
  currentPage,
  setCurrentPage,
  numberOfPages,
}: Props) => {
  return (
    <nav className="border-t border-blue px-4 flex items-center justify-between sm:px-0">
      <div className="flex items-baseline">
        <Link href={`/products${currentPage > 1 ? `/${currentPage - 1}` : ""}`}>
          <a className="mr-4 bg-blue text-white shadow-md hover:shadow-lg p-2 disabled:bg-silver disabled:text-metal">
            Prev
          </a>
        </Link>
        <PaginationItem
          pageNumber={1}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <PaginationDots
          condition={currentPage > 3}
          setCurrentPage={setCurrentPage}
        />
        <PaginationArray
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          numberOfPages={numberOfPages}
        />
        <PaginationDots
          condition={currentPage < numberOfPages - 2}
          setCurrentPage={setCurrentPage}
        />
        <PaginationItem
          pageNumber={numberOfPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <Link href={`/products/${Math.min(currentPage + 1, numberOfPages)}`}>
          <a className="ml-4 bg-blue text-white shadow-md hover:shadow-lg p-2 disabled:bg-silver disabled:text-metal">
            Next
          </a>
        </Link>
      </div>
    </nav>
  );
};
