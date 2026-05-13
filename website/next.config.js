const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias['@data'] = path.resolve(__dirname, '../data');
    config.resolve.alias['@tipos'] = path.resolve(__dirname, '../types');
    return config;
  },
};

module.exports = nextConfig;
