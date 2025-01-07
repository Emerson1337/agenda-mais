/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  async rewrites() {
    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://fallback.nextconfig"; // Fallback if .env is not set
    return [
      {
        // Proxy API requests from `/api` to the configured API base URL
        source: "/api/:path*",
        destination: `${API_BASE_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
