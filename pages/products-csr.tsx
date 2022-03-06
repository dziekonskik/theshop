import { useQuery } from "react-query";

const getPproducts = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
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
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <img src={item.image} alt="dupa" />
            <h2>{item.title}</h2>
            <p>{item.description}</p>
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
