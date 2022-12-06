/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "i.scdn.co",
			},
			{
				protocol: "https",
				hostname: "live.staticflickr.com",
			},
			{
				protocol: "https",
				hostname: "media.sketchfab.com",
			},
		],
	},
	i18n: {
		locales: ["en"],
		defaultLocale: "en",
	},
};

module.exports = nextConfig;
