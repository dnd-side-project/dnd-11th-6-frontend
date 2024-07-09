import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
};

export default withPWA({
  ...nextConfig,
  dest: "public",
});
