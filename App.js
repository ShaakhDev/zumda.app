import { StatusBar } from "expo-status-bar";
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	Pressable,
	Button,
	TextInput,
	View,
} from "react-native";
import React, { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import {
	requestUserPermission,
	NotificationListener,
	getFCMToken,
} from "./src/utils/push-notification-helper";
import notifee from "@notifee/react-native";
import { Alert } from "react-native";
import { useAppStateChange } from "./src/hooks/useAppStateChange";

export default function App() {
	const appState = useAppStateChange();
	const [token, setToken] = React.useState(null);
	console.log(appState);
	useEffect(() => {
		requestUserPermission();
		const unsubscribe = messaging().onMessage(async remoteMessage => {
			console.log(remoteMessage);
			console.log(appState);
			try {
				if (appState === "active") {
					await NotificationListener(remoteMessage);
				} else return;
			} catch (err) {
				throw err;
			}
		});

		return () => unsubscribe;
	}, []);

	const sendMessage = async () => {
		return;
	};

	useEffect(() => {
		(async () => {
			const fcmtoken = await getFCMToken();
			setToken(fcmtoken);
		})();
	}, []);
	return (
		<View style={styles.container}>
			<TouchableOpacity style={{ elevation: 5 }} onPress={sendMessage}>
				<Text style={{ elevation: 0 }}>Send</Text>
			</TouchableOpacity>
			{/* <Text>{token}</Text> */}
			<TextInput value={token} onChangeText={setToken} />
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
});
