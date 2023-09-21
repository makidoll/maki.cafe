/** @type {import('next').NextConfig} */

// const CopyPlugin = require("copy-webpack-plugin");

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
			{
				protocol: "https",
				hostname: "mastodon.hotmilk.space",
			},
		],
	},
	i18n: {
		locales: ["en"],
		defaultLocale: "en",
	},
	webpack: (config, { isServer }) => {
		// config.experiments = { ...config.experiments, asyncWebAssembly: true };

		// config.plugins = [
		// 	...config.plugins,
		// 	new CopyPlugin({
		// 		patterns: [
		// 			{
		// 				from: "node_modules/three/examples/jsm/libs/draco/",
		// 				to: "./static/libs/draco/",
		// 			},
		// 		],
		// 	}),
		// ];

		const prefix = config.assetPrefix ?? config.basePath ?? "";

		config.module.rules.push({
			test: /\.mp4$/,
			use: [
				{
					loader: "file-loader",
					options: {
						publicPath: `${prefix}/_next/static/media/`,
						outputPath: `${isServer ? "../" : ""}static/media/`,
						name: "[name].[hash:8].[ext]",
					},
				},
			],
		});

		return config;
	},
};

module.exports = nextConfig;
