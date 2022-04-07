import type { MDXRemoteSerializeResult } from "next-mdx-remote";

export type InferGetStaticPaths<T> = T extends () => Promise<{
  paths: Array<{ params: infer R }>;
}>
  ? { params?: R }
  : never;

export interface StoreApiResponse {
  products: Product[];
}

interface Product {
  name: string;
  price: number;
  id: string;
  slug: string;
  images: Image[];
}

interface Image {
  height: number;
  url: string;
  width: number;
}

export type MarkdownResult = MDXRemoteSerializeResult<Record<string, unknown>>;
