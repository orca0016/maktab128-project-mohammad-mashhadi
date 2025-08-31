import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL(`https://minimal-backend-project.onrender.com/images/**`)],
  },
  experimental: {
    authInterrupts: true,
  },
};

export default nextConfig;
