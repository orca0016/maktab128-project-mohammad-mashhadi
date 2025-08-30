import type { NextConfig } from "next";
import { SRC_BACK_END } from "./helpers/local-paths";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL(`${SRC_BACK_END}/images/**`)],
  },
  experimental: {
    authInterrupts: true,
  },
};

export default nextConfig;
