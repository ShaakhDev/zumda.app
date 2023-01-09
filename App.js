import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import {
	requestUserPermission,
	NotificationListener,
} from "./src/utils/push-notification-helper";
import { Alert } from "react-native";

export default function App() {
	// useEffect(() => {
	// 	const unsubscribe = messaging().onMessage(async remoteMessage => {
	// 		Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
	// 	});

	// 	return unsubscribe;
	// }, []);

	useEffect(() => {
		requestUserPermission();
		NotificationListener();
	}, []);
	return (
		<View style={styles.container}>
			<Text>Open up App.js to start working on your app!</Text>
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
