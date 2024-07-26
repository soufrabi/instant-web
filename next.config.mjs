/** @type {import('next').NextConfig} */
import nextPWA from 'next-pwa';

const withPWA = nextPWA({
    dest: "public",
    disable: process.env.NODE_ENV === 'development',
})

const nextConfig = {
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
        ],
    },
};


// export default nextConfig;
export default withPWA(nextConfig)
