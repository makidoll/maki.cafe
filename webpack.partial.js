module.exports = config => {
	config.module.rules.push({
		test: /\.(svg|html)$/,
		loader: "raw-loader",
	});

	const angularWebpackPlugin = config.plugins.find(
		plugin => plugin.constructor.name == "AngularWebpackPlugin",
	);

	if (angularWebpackPlugin) {
		angularWebpackPlugin.pluginOptions.directTemplateLoading = false;
	}

	return config;
};
