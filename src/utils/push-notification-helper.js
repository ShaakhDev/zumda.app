import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
		sound: "default",
		lights: false,
		vibration: true,
		importance: AndroidImportance.HIGH,
	});

	await notifee.displayNotification({
		title: title,
		body: body,
		android: {
			channelId,
		},
	});
};

// const onMessageReceived = message => {
// 	console.log(message);

// 	notifee.displayNotification(JSON.parse(message.data.notifee));
// };
