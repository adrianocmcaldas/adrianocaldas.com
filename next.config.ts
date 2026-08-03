import type { NextConfig } from "next";

const isS3Build = process.env.BUILD_TARGET === "s3";

const nextConfig: NextConfig = isS3Build
  ? {
      output: "export",
      images: { unoptimized: true },
      turbopack: { root: process.cwd() },
    }
  : {};

export default nextConfig;
