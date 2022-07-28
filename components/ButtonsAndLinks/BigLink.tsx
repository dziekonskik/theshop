import NextLink, { LinkProps } from "next/link";

interface BigButtonProps extends LinkProps {
  children: React.ReactNode;
  bgColor: "#6C63FF" | "#F4E13E";
  fullWidth?: boolean;
}

export const BigLink = ({
  href,
  children,
  bgColor,
  fullWidth,
}: BigButtonProps) => {
  return (
    <NextLink href={href}>
      <a
        className={`px-10 py-5 font-comfortaa uppercase shadow-xl hover:shadow-lg hover:brightness-110 text-center`}
        style={{
          backgroundColor: bgColor,
          color: bgColor === "#6C63FF" ? "#F4F3FF" : "#3F3D56",
          width: fullWidth ? "100%" : "fit-content",
        }}
      >
        {children}
      </a>
    </NextLink>
  );
};
