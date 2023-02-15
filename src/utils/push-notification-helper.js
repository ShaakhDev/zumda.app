import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppState } from "react-native";
import notifee, { AndroidImportance } from "@notifee/react-native";
export async function requestUserPermission() {
	const authStatus = await messaging().requestPermission();

	if (!messaging().isDeviceRegisteredForRemoteMessages) {
		await messaging().registerDeviceForRemoteMessages();
	}
	const enabled =
		authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
		authStatus === messaging.AuthorizationStatus.PROVISIONAL;

	if (enabled) {
		console.log("Authorization status:", authStatus);
		const token = await getFCMToken();
		//await api(/users/token)
	}
}

export async function getFCMToken() {
	let fcmtoken = await AsyncStorage.getItem("fcmToken");
	console.log("old token", fcmtoken);
	if (!fcmtoken) {
		try {
			fcmtoken = await messaging().getToken();
			if (fcmtoken) {
				console.log("new token", fcmtoken);
				// user has a device token
				await AsyncStorage.setItem("fcmToken", fcmtoken);
			}
		} catch (err) {
			console.log(err);
		}
	}

	return fcmtoken;
}

export const NotificationListener = async remoteMessage => {
	// messaging().onMessage(onMessageReceived);
	// messaging().setBackgroundMessageHandler(onMessageReceived);
	// messaging().getInitialNotification(onMessageReceived);
	// notifee.onBackgroundEvent(onMessageReceived);
	console.log("function is fired", remoteMessage);
	const { title, body } = remoteMessage.notification;

	const channelId = await notifee.createChannel({
		id: "order-notification",
		name: "Food Order Notification",
		sound: "notification",
		vibration: true,
		vibrationPattern: [300, 500],
	});

	await notifee.displayNotification({
		title: `<p style="color:#880002;"><b>${title}</b><p/>`,
		subtitle: "🍔",
		body: body,
		android: {
			channelId,

			smallIcon: "ic_small_icon",
			largeIcon: require("../../assets/icon.png"),

			importance: AndroidImportance.HIGH,
		},
	});
};
