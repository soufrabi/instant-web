/** @type {import('next').NextConfig} */
import nextPWA from 'next-pwa';

const withPWA = nextPWA({
    dest: "public",
    disable: process.env.NODE_ENV === 'development',
})

const nextConfig = {
    output: "standalone",
};


// export default nextConfig;
export default withPWA(nextConfig)
