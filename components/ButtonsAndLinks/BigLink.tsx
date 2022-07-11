import NextLink, { LinkProps } from "next/link";

interface BigButtonProps extends LinkProps {
  children: React.ReactNode;
  bgColor: "#6C63FF" | "#F4E13E";
}

export const BigLink = ({ href, children, bgColor }: BigButtonProps) => {
  return (
    <NextLink href={href}>
      <a
        className={`px-10 py-5 font-acme uppercase shadow-xl hover:shadow-lg hover:brightness-110`}
        style={{ backgroundColor: bgColor }}
      >
        {children}
      </a>
    </NextLink>
  );
};
