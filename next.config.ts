import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // 1. Existing Turbopack settings
  turbopack: {
    root: __dirname,
  },
  
  // 2. Existing Image settings
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
    dangerouslyAllowSVG: true, 
  },

  // 3. ADDED: Moved to the top level for newer Next.js versions!
  outputFileTracingIncludes: {
    '/*': ['./content/**/*'],
  },
};

export default withNextIntl(nextConfig);