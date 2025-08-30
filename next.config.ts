import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("http://localhost:8000/images/**")],
  },
  experimental: {
    authInterrupts: true,
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "http://localhost:8000/api/:path*",
  //     },
  //   ];
  // },
};

export default nextConfig;
