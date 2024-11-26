import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;


const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Proxy API requests
        destination: "http://127.0.0.1:8000/api/:path*", // Django backend
      },
    ];
  },
};

export default nextConfig;

