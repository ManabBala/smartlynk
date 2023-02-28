import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React from "react";

const IpScanResultCard = ({ status, ip, time, message, setDevices }) => {
	const tempDevice = {
		[`${ip}`]: {
			name: "Temple Automation Device",
			host: "Esp8266-123456.local",
			user: { 7363062221: { name: "Manab Bala" }, 9609609064: { name: "Bibek Bala" } },
			pass: "deviceSecretCode",
			boardId: "esp8266-412324234",
			location: "Temple",
			relays: [
				{ id: 3201115234, name: "Music System", type: "music", lastState: true },
				{ id: 3201115843, name: "POP Light Red", type: "light", lastState: true },
				{ id: 3201115813, name: "Fan", type: "fan", lastState: false },
			],
		},
	};

	return (
		<TouchableOpacity
			onPress={() => {
				setDevices(function (devices) {
					if (devices[`${ip}`] !== undefined) {
						return devices;
					} else return { ...devices, ...tempDevice };
				});
			}}
			className={`shadow-lg shadow-slate-700 rounded p-1 my-1 items-center ${
				status ? "bg-green-500" : "bg-red-500"
			}`}
		>
			{/* <Text>{status ? "Success" : "Failed"}</Text> */}

			<Text>{ip}</Text>

			{/* <Text>{time ? time : ""}</Text>
			<Text>{message}</Text> */}
		</TouchableOpacity>
	);
};

export default IpScanResultCard;
