const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
  
    images: {
        domains: ['localhost'],
    },
}

module.exports = nextConfig