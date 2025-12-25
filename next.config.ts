import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Disable telemetry for privacy
  experimental: {
    telemetry: {
      enabled: false,
    },
  },
};

export default nextConfig;
