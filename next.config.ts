import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@lib": path.resolve(__dirname, "src/lib"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@actions": path.resolve(__dirname, "src/actions"),
      "@components": path.resolve(__dirname, "src/components"),
    };
    return config;
  },
};

export default nextConfig;
