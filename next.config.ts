import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://s3.wareeasy.com/demo-netflix/**')],
  },
};

export default nextConfig;
