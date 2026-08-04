import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.31.91", "localhost"],
  experimental: {
    optimizePackageImports: ["lucide-react"]
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "http://localhost:5104/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;
