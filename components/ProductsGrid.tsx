import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ProductLstItem } from "./Product";
import { DottedPagination } from "./Pagination";
import { GetProductListQuery } from "../generated/graphql";

interface ProductGridProps {
  data: GetProductListQuery;
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
        {data.products.map((item) => (
          <li key={item.id} className="shadow-lg">
            <ProductLstItem
              data={{
                id: item.id,
                name: item.name,
                thumbnailAlt: item.name,
                thumbnailUrl: item.images[0].url,
                slug: item.slug,
              }}
            />
          </li>
        ))}
      </ul>
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
