/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    localPatterns: [
      {
        search: "",
        pathname: "/assets/images/**",
      },
    ],
  },
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          as: "*.js",
          loaders: ["@svgr/webpack"],
        },
      },
    },
  },
};

export default nextConfig;
