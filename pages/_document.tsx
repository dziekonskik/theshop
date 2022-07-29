import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pl">
      <Head />
      <body className="bg-bermuda antialiased">
        <Main />
        <div id="portal" />
        <NextScript />
      </body>
    </Html>
  );
}
