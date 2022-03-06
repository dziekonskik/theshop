import { InferGetStaticPropsType } from "next";
import { ProductLstItem } from "../components/Product";
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

const ProductsPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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

export const getStaticProps = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data: StoreApiResponse[] = await res.json();

  return {
    props: {
      data,
    },
  };
};

export default ProductsPage;
