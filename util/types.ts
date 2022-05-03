import type { MDXRemoteSerializeResult } from "next-mdx-remote";

export type InferGetStaticPaths<T> = T extends () => Promise<{
  paths: Array<{ params: infer R }>;
}>
  ? { params?: R }
  : never;

export type MarkdownResult = MDXRemoteSerializeResult<Record<string, unknown>>;
