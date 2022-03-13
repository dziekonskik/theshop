import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { PaginationCSR } from "../components/PaginationCSR";
import { ProductLstItem } from "../components/Product";

const getPproducts = async (pageNumber: number) => {
  const productsPerPage = 25;
  const res = await fetch(
    `https://naszsklep-api.vercel.app/api/products?take=25&offset=${
      pageNumber * productsPerPage
    }`
  );
  const data: StoreApiResponse[] = await res.json();
  return data;
};

const ProductsPageCSR = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading, error, data } = useQuery(["products", currentPage], () =>
    getPproducts(currentPage - 1)
  );

  const { query } = useRouter();

  useEffect(() => {
    if (query.page !== undefined && typeof query.page === "string") {
      setCurrentPage(parseInt(query.page));
    }
  }, [query]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || error) {
    return <div>Coś podszło nie tak</div>;
  }

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
        <PaginationCSR
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </section>
  );
};

interface StoreApiResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
export default ProductsPageCSR;
