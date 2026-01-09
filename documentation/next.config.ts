import { withContentCollections } from "@content-collections/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serve all docs under /docs
  basePath: "/docs",
  assetPrefix: "/docs/", // ensures CSS/JS load correctly
};

export default withContentCollections(nextConfig);
