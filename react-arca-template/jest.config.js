module.exports = {
	verbose: true,
	moduleFileExtensions: ["js", "jsx"],
	moduleDirectories: ["node_modules"],
	moduleNameMapper: {
		"\\.(css|less)$": "identity-obj-proxy",
		"\\.(jpg|jpeg|png|gif|webp|svg|mp4|webm|ogg|mp3|wav|flac|aac)$": "<rootDir>/assetTransformer.js",
	},
	transform: {
		"^.+\\.jsx?$": "babel-jest",
	},
	testEnvironment: "jsdom",
	collectCoverageFrom: ["src/**/*.{js,jsx}", "!src/index.js"],
};
