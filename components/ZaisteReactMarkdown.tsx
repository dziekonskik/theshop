import Link from "next/link";
import { MDXRemote } from "next-mdx-remote";
import { MarkdownResult } from "../util/types";

export const ZaisteReactMarkdown = ({
  children,
}: {
  children: MarkdownResult;
}) => {
  return (
    <MDXRemote
      {...children}
      components={{
        a: ({ href, ...props }) => {
          console.log({ ...props });
          if (!href) {
            return (
              <a
                {...props}
                className="cursor-pointer text-indigo-600 no-underline"
              ></a>
            );
          }
          if (href.startsWith("http")) {
            return (
              <a
                {...props}
                rel="noopener noreferrer"
                target="_blank"
                className="cursor-pointer text-indigo-600 no-underline"
              ></a>
            );
          }
          return (
            <Link href={href}>
              <a
                {...props}
                className="cursor-pointer text-indigo-600 no-underline"
              ></a>
            </Link>
          );
        },
      }}
    />
  );
};
