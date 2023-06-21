/** @type {import('next').NextConfig} */

const CopyPlugin = require("copy-webpack-plugin");

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
			{
				protocol: "https",
				hostname: "media.discordapp.net",
			},
			{
				protocol: "https",
				hostname: "static.wikia.nocookie.net",
			},
		],
	},
	i18n: {
		locales: ["en"],
		defaultLocale: "en",
	},
	webpack: function (config, options) {
		config.experiments = { ...config.experiments, asyncWebAssembly: true };
		config.plugins = [
			...config.plugins,
			new CopyPlugin({
				patterns: [
					{
						from: "node_modules/three/examples/jsm/libs/draco/",
						to: "./static/libs/draco/",
					},
				],
			}),
		];
		return config;
	},
};

module.exports = nextConfig;
