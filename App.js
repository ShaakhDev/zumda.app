import { StatusBar } from "expo-status-bar";
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	Pressable,
	Button,
	View,
} from "react-native";
import React, { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import {
	requestUserPermission,
	NotificationListener,
} from "./src/utils/push-notification-helper";
import notifee from "@notifee/react-native";
import { Alert } from "react-native";

export default function App() {
	useEffect(() => {
		requestUserPermission();
		const unsubscribe = messaging().onMessage(async remoteMessage => {
			console.log(remoteMessage);
			await NotificationListener(remoteMessage);
		});

		return unsubscribe;
	}, []);

	const sendMessage = async () => {
		return;
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity style={{ elevation: 5 }} onPress={sendMessage}>
				<Text style={{ elevation: 0 }}>Send</Text>
			</TouchableOpacity>
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
	},
});
