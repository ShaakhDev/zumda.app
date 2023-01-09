import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function requestUserPermission() {
	const authStatus = await messaging().requestPermission();
	const enabled =
		authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
		authStatus === messaging.AuthorizationStatus.PROVISIONAL;

	if (enabled) {
		console.log("Authorization status:", authStatus);
		await getFCMToken();
	}
}

async function getFCMToken() {
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
}

export const NotificationListener = () => {
	messaging().onNotificationOpenedApp(remoteMessage => {
		console.log(
			"Notification caused app to open from background state:",
			remoteMessage.notification
		);
	});

	messaging()
		.getInitialNotification()
		.then(remoteMessage => {
			if (remoteMessage) {
				console.log(
					"Notification caused app to open from quit state:",
					remoteMessage.notification
				);
			}
		});

	messaging().onMessage(async remoteMessage => {
		console.log(
			"notification on foreground state.....",
			JSON.stringify(remoteMessage)
		);
	});
};
