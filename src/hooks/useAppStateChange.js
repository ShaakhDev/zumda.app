import { useEffect, useState, useRef } from "react";
import { AppState } from "react-native";

export function useAppStateChange() {
	const appState = useRef(AppState.currentState);
	const [appStateVisible, setAppStateVisible] = useState(appState.current);

	useEffect(() => {
		AppState.addEventListener("change", _handleAppStateChange);

		return () => {
			AppState.addEventListener("change", _handleAppStateChange);
		};
	}, []);

	const _handleAppStateChange = nextAppState => {
		if (
			appState.current.match(/inactive|background/) &&
			nextAppState === "active"
		) {
			console.log("App has come to the foreground!");
		}

		appState.current = nextAppState;
		setAppStateVisible(appState.current);
		// console.log("AppState", appState.current);
	};

	return appStateVisible;
}
