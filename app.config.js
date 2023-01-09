module.exports = {
	expo: {
		name: "zumda",
		slug: "zumda",
		version: "1.0.0",
		orientation: "portrait",
		icon: "./assets/icon.png",
		userInterfaceStyle: "light",
		splash: {
			image: "./assets/splash.png",
			resizeMode: "contain",
			backgroundColor: "#ffffff",
		},
		updates: {
			fallbackToCacheTimeout: 0,
		},
		assetBundlePatterns: ["**/*"],
		ios: {
			supportsTablet: true,
			bundleIdentifier: "com.shaakhzodbobolov.zumda",
		},
		owner: "shakhzod-bobolov",
		android: {
			package: "com.shaakhzodbobolov.zumda",
			googleServicesFile: "./google-services.json",
			adaptiveIcon: {
				foregroundImage: "./assets/adaptive-icon.png",
				backgroundColor: "#FFFFFF",
			},
		},
		ios: {
			bundleIdentifier: "com.shakhzodbobolov.zumda",
			googleServicesFile: "./GoogleService-Info.plist",
		},
		web: {
			favicon: "./assets/favicon.png",
		},
		plugins: ["@react-native-firebase/app"],
		extra: {
			eas: {
				projectId: "dac2e7fc-56fe-4bf7-90f9-dfd2da6f9c38",
			},
		},
	},
};
