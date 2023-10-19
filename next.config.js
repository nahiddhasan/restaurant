/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true,
    },
    
      images: {
          remotePatterns: [
            {
              protocol: 'https',
              hostname: 'lh3.googleusercontent.com',
            },
            {
              protocol: 'http',
              hostname: 'res.cloudinary.com',
            },
          ],
        },


      
  }
  
  module.exports = nextConfig