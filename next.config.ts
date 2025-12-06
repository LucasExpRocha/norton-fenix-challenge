import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  transpilePackages: ['ol'],
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
