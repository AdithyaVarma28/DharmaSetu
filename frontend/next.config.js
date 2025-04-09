/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // Fix for EINVAL: invalid argument, readlink with @ prefixed packages
    config.module = {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /node_modules[\\/]@floating-ui[\\/].*/,
          sideEffects: false,
        },
      ],
    };
    
    return config;
  },
}

module.exports = nextConfig