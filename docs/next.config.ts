import { withContentCollections } from "@content-collections/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
	basePath: '/docs',
};

export default withContentCollections(nextConfig);
