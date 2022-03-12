import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ProductLstItem } from "./Product";
import { DottedPagination, Pagination } from "./Pagination";
import { StoreApiResponse } from "../util/types";

interface ProductGridProps {
  data: StoreApiResponse[];
  pagesTotal: number;
}

export const ProductsGrid = ({ data, pagesTotal }: ProductGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { query } = useRouter();

  useEffect(() => {
    if (
      query.pageNumber !== undefined &&
      typeof query.pageNumber === "string"
    ) {
      setCurrentPage(parseInt(query.pageNumber));
    }
  }, [query]);

  return (
    <section>
      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {data.map((item) => (
          <li key={item.id} className="shadow-lg">
            <ProductLstItem
              data={{
                id: item.id,
                title: item.title,
                thumbnailAlt: item.title,
                thumbnailUrl: item.image,
              }}
            />
          </li>
        ))}
      </ul>
      <div className="flex justify-center mb-7 mt-14">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          numberOfPages={20}
        />
      </div>
      <div className="flex justify-center mb-7 mt-14">
        <DottedPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          numberOfPages={pagesTotal}
        />
      </div>
    </section>
  );
};
