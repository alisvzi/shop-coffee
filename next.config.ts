import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["localhost"],
    remotePatterns: [
      { protocol: "https", hostname: "set-coffee.vercel.app", pathname: "/**" },
      { protocol: "https", hostname: "**", pathname: "/**" },
    ],
  },
};

export default nextConfig;
