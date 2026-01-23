/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    // leave empty or add future options
  },
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://10.166.46.236:3000",
  ],
};

module.exports = nextConfig;
