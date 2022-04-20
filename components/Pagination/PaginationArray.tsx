import { PaginationItem } from "./PaginationItem";

interface Props {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  numberOfPages: number;
}

function calculateNumberOfPages(currentPage: number, numberOfPages: number) {
  switch (currentPage) {
    case 1:
      return 1;
    case numberOfPages:
      return 1;
    case 2:
      return currentPage;
    case 3:
      return currentPage;
    case numberOfPages - 1:
      return numberOfPages - currentPage + 1;
    case numberOfPages - 2:
      return numberOfPages - currentPage + 1;
    default:
      return 3;
  }
}

export const PaginationArray = ({
  currentPage,
  numberOfPages,
  setCurrentPage,
}: Props) => {
  let pages = Array.from(
    { length: calculateNumberOfPages(currentPage, numberOfPages) },
    (_, i) => {
      if (currentPage === 1) {
        return currentPage + 1;
      } else if (currentPage === 2) {
        return currentPage + i;
      } else if (currentPage === numberOfPages - 1) {
        return currentPage - i;
      } else {
        return currentPage - 1 + i;
      }
    }
  );
  pages = currentPage === numberOfPages - 1 ? pages.reverse() : pages;
  return (
    <>
      {pages.map((number) => (
        <PaginationItem
          key={number}
          pageNumber={number}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ))}
    </>
  );
};
