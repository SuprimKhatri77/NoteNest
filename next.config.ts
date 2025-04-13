import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["uploadthing.com", "utfs.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.uploadthing.com",
      },
      {
        protocol: "https",
        hostname: "*.utfs.io",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
