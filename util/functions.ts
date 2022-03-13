import type { StoreApiResponse } from "./types";

export async function fetchProductsData(
  currentPage: number,
  productsPerPage: number
) {
  const res = await fetch(
    `https://naszsklep-api.vercel.app/api/products?take=${productsPerPage}&offset=${
      currentPage * productsPerPage
    }`
  );
  const allItemsQuery = await fetch(
    `https://naszsklep-api.vercel.app/api/products?take=10000000&offset=0`
  );
  const data: StoreApiResponse[] = await res.json();
  const allItemsData: StoreApiResponse[] = await allItemsQuery.json();

  return { data, allItemsData };
}
