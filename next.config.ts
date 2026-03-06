import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // To run instrumentation only in production, gate it in instrumentation.ts using process.env.NODE_ENV.
  async redirects() {
    return [
      { source: "/playground", destination: "/voices", permanent: true },
      { source: "/playground/:path*", destination: "/voices/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
