import {
	View,
	Text,
	Pressable,
	Alert,
	ScrollView,
	Button,
	ScrollViewComponent,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserIcon, WifiIcon, CheckCircleIcon, XCircleIcon } from "react-native-heroicons/outline";

import NetworkScanner from "../components/NetworkScanner";
import DeviceController from "../components/DeviceController";
import NetInfo from "../components/NetInfo";

const HomeScreen = () => {
	const navigation = useNavigation();

	const [devices, setDevices] = useState({});

	// temp data to produce device
	const tempDevices = {
		"192.168.0.1": {
			ip: "192.168.0.1",
			name: "Bedroom Automation Device",
			user: { 7363062221: { name: "Manab Bala" }, 9609609064: { name: "Bibek Bala" } },
			pass: "deviceSecretCode",
			host: "Esp8266-12345.local",
			boardId: "esp8266-41234234",
			location: "Bedroom",
			relays: [
				{ id: 3201115269, name: "Tube Light", type: "light", lastState: false },
				{ id: 2342342343, name: "POP Light", type: "light", lastState: true },
				{ id: 3201113334, name: "Fan", type: "fan", lastState: true },
			],
		},
	};

	useEffect(() => {
		setDevices(tempDevices);
	}, []);

	// useEffect(() => {
	// 	console.log("devices: ", devices);
	// }, [devices]);

	// useLayoutEffect(() => {
	// 	navigation.setOptions({
	// 		headerShown: false,
	// 	});
	// }, []);

	return (
		<SafeAreaView className="bg-white pt-5 px-2">
			{/* Header */}
			<View className="flex-row pb-3 items-center space-x-2">
				<WifiIcon size={20} color="#00CCBB" />
				<View className="flex-1">
					<Text className="font-bold text-xl">SmartLynk</Text>
				</View>
				<UserIcon size={25} color="#00CCBB" />
			</View>
			{/* Internet Connection Info */}
			{/* <NetInfo /> */}
			{/* Devices Scanning in LAN */}
			<NetworkScanner setDevices={setDevices} />
			{/* Room Dashboard */}
			<ScrollView>
				<DeviceController devices={devices} />
			</ScrollView>
		</SafeAreaView>
	);
};

export default HomeScreen;
