const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const path = require("path");

// Specify the port that your app will run on
let appPort = 3030;
let chalk;

// Custom log a message when compilation completes
class LogAfterCompilationPlugin {
	apply(compiler) {
		compiler.hooks.done.tapPromise("LogAfterCompilationPlugin", async (stats) => {
			if (!chalk) {
				chalk = await import("chalk");
			}
			const timestamp = new Date().toLocaleTimeString();
			const compilationMsg = chalk.default.bold.magenta;
			const errorMsg = chalk.default.bold.red;
			if (stats.hasErrors()) {
				console.log(errorMsg(`❌ [${timestamp}] Compilation failed due to an error. ❌\n`));
				return;
			}
			console.log(compilationMsg(`\n⚡️ [${timestamp}] Application compiled and is running on port: ${appPort} ⚡️\n`));
		});
	}
}

module.exports = {
	module: {
		rules: [
			{
				// Babel to handle react jsx
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				// Compile css
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
			{
				// Compile with media
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				loader: "file-loader",
				options: {
					name: "[path][name].[ext]",
				},
			},
		],
	},
	plugins: [
		// Use css
		new MiniCssExtractPlugin(),
		// Use custom log
		new LogAfterCompilationPlugin(),
		// Use html
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "public", "index.html"),
		}),
		// Use ESlint
		new ESLintPlugin({
			extensions: ["js", "jsx"],
		}),
	],
	resolve: {
		// Resolve these files
		extensions: [".js", ".jsx"],
	},
	// Tell webpack to watch source map
	devtool: "source-map",
	// Establish development server
	devServer: {
		// Specify port to run at
		port: appPort,
		// Catch 404 cases
		historyApiFallback: true,
		// Only log erros (removes webpack bloat)
		devMiddleware: {
			stats: "errors-only",
		},
		// Use public assets
		static: {
			directory: path.join(__dirname, "public"),
		},
		// Allow hot reloads
		hot: true,
	},
	// Output for production build
	output: {
		path: path.resolve(__dirname, "dist"),
		clean: true,
	},
};
