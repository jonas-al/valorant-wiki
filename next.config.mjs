/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["media.valorant-api.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.valorant-api.com",
        port: "",
        pathname: "/agents/**",
      },
    ],
  },
};

export default nextConfig;
