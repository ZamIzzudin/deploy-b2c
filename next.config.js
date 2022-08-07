/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['ec2-54-219-168-219.us-west-1.compute.amazonaws.com', 'lh3.googleusercontent.com'],
  },
};

module.exports = nextConfig;
