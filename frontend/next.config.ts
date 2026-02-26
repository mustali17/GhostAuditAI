import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        // In production on Vercel, set NEXT_PUBLIC_API_URL="" and BACKEND_URL="https://ghostauditai.onrender.com"
        // In local development, it defaults to localhost:5000 if BACKEND_URL is not set
        destination: process.env.BACKEND_URL
          ? `${process.env.BACKEND_URL}/api/:path*`
          : "http://localhost:5000/api/:path*",
      },
    ];
  },
};

export default nextConfig;
