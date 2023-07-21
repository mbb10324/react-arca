const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const path = require("path");

module.exports = {
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				loader: "file-loader",
				options: {
					name: "[path][name].[ext]",
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "public", "index.html"),
		}),
		new MiniCssExtractPlugin(),
		new ESLintPlugin({
			extensions: ["js", "jsx"],
		}),
	],
	resolve: {
		extensions: [".js", ".jsx"],
	},
	devServer: {
		port: 3030,
		historyApiFallback: true,
		devMiddleware: {
			stats: {
				assets: false,
				colors: true,
				errors: true,
				errorDetails: true,
				modules: false,
			},
		},
		static: {
			directory: path.join(__dirname, "public"),
		},
		hot: true,
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		clean: true,
	},
};
