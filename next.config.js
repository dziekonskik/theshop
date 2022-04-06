/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["media.graphcms.com", "media.graphassets.com"],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
