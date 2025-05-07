import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
 
const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.wareeasy.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
