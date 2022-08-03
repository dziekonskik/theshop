import * as yup from "yup";
import { checkoutFormSchema } from "./yupSchema/checkoutFormSchema";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import type { ProductDetailsFragment } from "../generated/graphql";

export type InferGetStaticPaths<T> = T extends () => Promise<{
  paths: Array<{ params: infer R }>;
}>
  ? { params?: R }
  : never;

export type MarkdownResult = MDXRemoteSerializeResult<Record<string, unknown>>;

export interface CartItem {
  id: string;
  quantity: number;
  product: Omit<ProductDetailsFragment, "description">;
}

export enum PaymentMethods {
  creditCard = "creditCard",
  p24 = "p24",
}

export type UserAddress = yup.InferType<typeof checkoutFormSchema>;
export interface UserDetails {
  nickname: string;
  avatar: {
    id: string;
    url: string;
    width: number;
    height: number;
  };
  address: UserAddress;
}

// export type InferGetStaticPathsType<T> = T extends () => Promise<{
//   paths: Array<{ params: infer R }>;
// }>
//   ? R extends ParsedUrlQuery
//     ? GetStaticPropsContext<R>
//     : never
//   : never;
