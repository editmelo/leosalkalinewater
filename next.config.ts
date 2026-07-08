import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Store 2 became the primary /store; keep the old demo URL working.
    return [{ source: "/store-simple", destination: "/store", permanent: false }];
  },
};

export default nextConfig;
