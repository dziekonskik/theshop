import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { ProductDetailsFragment } from "../generated/graphql";

export type InferGetStaticPaths<T> = T extends () => Promise<{
  paths: Array<{ params: infer R }>;
}>
  ? { params?: R }
  : never;

export type MarkdownResult = MDXRemoteSerializeResult<Record<string, unknown>>;
export type CartItem = Omit<ProductDetailsFragment, "description"> & {
  count: number;
};
