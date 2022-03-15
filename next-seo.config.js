const title = "The Shop";
const description = "This is The Shop";

const nextSeoConfig = {
  title,
  description,
  canonical: "https://theshop-nu.vercel.app",
  openGraph: {
    url: `https://theshop-nu.vercel.app`,
    title,
    description,
    site_name: title,
  },
};

export default nextSeoConfig;
