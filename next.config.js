/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['52.53.213.105', 'ec2-54-219-168-219.us-west-1.compute.amazonaws.com'],
  },
  env: {
    API: process.env.API_URL,
    CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
    F_API_KEY: process.env.FIREBASE_API_KEY,
    F_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    F_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    F_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    F_MESSAGE_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    F_APP_ID: process.env.FIREBASE_APP_ID,
    F_MEASURE_ID: process.env.FIREBASE_MEASUREMENT_ID,
    LC_WIDGET_ID: process.env.LC_WIDGET_ID,
    CRYPTO_WALLET_ADDRESS: process.env.CRYPTO_WALLET_ADDRESS,
  },
};

module.exports = nextConfig;
