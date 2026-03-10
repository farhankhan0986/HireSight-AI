/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    // leave empty or add future options
  },
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://10.166.46.236:3000",
  ],
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    
    // Provide global for pdfjs
    config.module.rules.push({
      test: /pdf\.mjs$/,
      type: "javascript/auto",
    });
    
    return config;
  },
  eslint: {
  ignoreDuringBuilds: true,
}
};

module.exports = nextConfig;
