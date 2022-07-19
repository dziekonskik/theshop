import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import type { ProductDetailsFragment } from "../generated/graphql";

export type InferGetStaticPaths<T> = T extends () => Promise<{
  paths: Array<{ params: infer R }>;
}>
  ? { params?: R }
  : never;

export type MarkdownResult = MDXRemoteSerializeResult<Record<string, unknown>>;

export interface CartItem {
  id?: string;
  quantity: number;
  product: ProductDetailsFragment;
}

export type MutateOrder = (
  currentItem: CartItem
) => (calculator: CalculatorFn) => void;

export type CalculatorFn = (
  cartItemQuantity: number,
  currentItemQuantity: number
) => number;

export enum PaymentMethods {
  creditCard = "creditCard",
  p24 = "p24",
}
