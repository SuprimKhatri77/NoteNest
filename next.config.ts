import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
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
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias["pdfjs-dist"] = path.join(
      __dirname,
      "node_modules/pdfjs-dist/legacy/build/pdf"
    );
    return config;
  },
};

export default nextConfig;
