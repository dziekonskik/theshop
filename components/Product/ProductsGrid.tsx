import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ProductLstItem } from "./ProductListItem";
import { DottedPagination } from "../Pagination";
import { GetProductListQuery } from "../../generated/graphql";

interface ProductGridProps {
  productsData: GetProductListQuery["products"];
  pagesTotal: number;
}

export const ProductsGrid = ({
  productsData,
  pagesTotal,
}: ProductGridProps) => {
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
    <section className="mx-auto w-full py-7 px-4 lg:px-0">
      <ul
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7"
        data-tesid="product-list"
      >
        {productsData.map((product) => (
          <ProductLstItem
            key={product.slug}
            product={{
              name: product.name,
              slug: product.slug,
              price: product.price,
              images: product.images,
              description: product.description,
            }}
          />
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
