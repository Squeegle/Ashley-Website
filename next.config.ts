import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      // Redirect gallery to projects
      {
        source: '/gallery',
        destination: '/projects',
        permanent: true,
      },
      // Redirect specific gallery pages to projects
      {
        source: '/gallery/:slug*',
        destination: '/projects/:slug*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
