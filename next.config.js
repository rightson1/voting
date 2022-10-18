/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: [
            "avatars.dicebear.com",
            "res.cloudinary.com",
            "firebasestorage.googleapis.com",
        ],
    },
};

module.exports = nextConfig;