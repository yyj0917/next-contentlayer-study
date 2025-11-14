const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * `reactStrictMode` remains configurable but continues to default to `true` in
   * Next.js 16. Keeping the flag explicit makes the intention of the project
   * clear while aligning with the current default behaviour.
   */
  reactStrictMode: true,
  /**
   * Next.js 16 removes the legacy `swcMinify` toggle. Minification is always
   * handled by SWC and the option is no longer respected, so it has been
   * removed from the configuration.
   */
  images: {
    /**
     * Optimised image formats are enabled by default from Next.js 16 onwards.
     * Declaring them here keeps the behaviour explicit and documents the
     * expectation for downstream tooling.
     */
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = withContentlayer(nextConfig);
