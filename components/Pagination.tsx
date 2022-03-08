import Link from "next/link";

interface Props {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const Pagination = ({ currentPage, setCurrentPage }: Props) => {
  return (
    <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0">
      <div className="hidden md:-mt-px md:flex">
        {Array.from({ length: 10 }, (_, i) => (
          <Link href={`/products/${i + 1}`} key={i}>
            <a
              onClick={() => setCurrentPage(i + 1)}
              className={`${
                currentPage === i + 1
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium`}
            >
              {i + 1}
            </a>
          </Link>
        ))}
      </div>
    </nav>
  );
};
