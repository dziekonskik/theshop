import { useEffect, useState } from "react";

import { ProductLstItem } from "./Product";
import { Pagination } from "./Pagination";
import { useRouter } from "next/router";

interface StoreApiResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  longDescription: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductGridProps {
  data: StoreApiResponse[];
}

export const ProductsGrid = ({ data }: ProductGridProps) => {
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
          numberOfPages={10}
        />
      </div>
    </section>
  );
};
