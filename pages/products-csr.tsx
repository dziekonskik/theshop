import { useQuery } from "react-query";
import { ProductLstItem } from "../components/Product";

const getPproducts = async () => {
  const res = await fetch("https://naszsklep-api.vercel.app/api/products");
  const data: StoreApiResponse[] = await res.json();
  return data;
};

const ProductsPageCSR = () => {
  const { isLoading, error, data } = useQuery("products", getPproducts);

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
