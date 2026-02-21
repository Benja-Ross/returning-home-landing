import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Prevent Sentry (and other instrumentation) from running in development to avoid rate limits
  experimental: {
    instrumentationHook: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
