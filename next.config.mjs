/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel 배포를 위한 설정
  output: 'standalone',
  // webpack 설정
  webpack: (config) => {
    config.resolve.fallback = { 
      ...config.resolve.fallback,
      fs: false
    };
    return config;
  },
};

export default nextConfig; 