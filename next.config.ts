import type { NextConfig } from "next";

const backendUrl = (process.env.BACKEND_API_URL || process.env.LIVE_BACKEND_API_URL || "http://localhost:5104").replace(/\/$/, "");

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.31.91", "localhost"],
  experimental: {
    optimizePackageImports: ["lucide-react"]
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${backendUrl}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
