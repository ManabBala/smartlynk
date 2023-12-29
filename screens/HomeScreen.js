import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WifiIcon, Cog6ToothIcon } from "react-native-heroicons/outline";

import BoardRow from "../components/BoardRow";
import BoardByChipId from "../components/BoardByChipId";
import { useDispatch, useSelector } from "react-redux";
import {
	addBoard,
	selectBoards,
	selectBoardsByChipId,
	updateDeviceStateOfBoard,
	updateIpOfBoard,
} from "../features/boardSlice";
import { deviceState } from "../utils/api/deviceSwitchState.api";
import ZeroconfRow from "../components/ZeroconfRow";

const HomeScreen = () => {
	const navigation = useNavigation();

	const dispatch = useDispatch();

	const boards = useSelector(selectBoards);

	// temp data to produce device
	const tempBoard = {
		version: "1.0.0",
		ip: "192.168.0.103",
		chipId: 9371903,
		name: "Temple Automation Device",
		room: "Bedroom",
		devices: [
			{ relay: 1, name: "Music System", type: "music" },
			{ relay: 2, name: "POP Light Green", type: "light" },
			{ relay: 3, name: "Fan", type: "fan" },
		],
		// remote: [
		// 	{ code: "0x1FE48B7", name: "Power/Sleep" },
		// 	{ code: "0x1FE58A7", name: "Mode" },
		// 	{ code: "0x1FE609F", name: "Volume Up" },
		// 	{ code: "0x1FEA05F", name: "Volume Down" },
		// 	{ code: "0x1FEC03F", name: "Next" },
		// 	{ code: "0x1FE40BF", name: "Previous" },
		// 	{ code: "0x1FE807F", name: "Play/Pause" },
		// 	{ code: "0x1FE7887", name: "Mute" },
		// ],
	};

	useEffect(() => {
		console.log("useEffect Launched.");
		const storeData = async (value) => {
			try {
				const jsonValue = JSON.stringify(value);
				await AsyncStorage.setItem("@storage_Key", jsonValue);
			} catch (e) {
				// saving error
			}
		};
		// dispatch(addBoard(tempBoard));
		// TODO: temporarily adding board by manually with mDNS
		const mdnsAddresses = [
			"smartlynk-1458270.local",
			"smartlynk-1454108.local",
			"smartlynk-16339691.local",
		];
		const getBoardInfo = function (ip) {
			const promise = fetch(`http://${ip}/board`);
			promise
				.then((response) => {
					if (response.ok) {
						// TODO: add strong check for board verification
						return response.json();
					} else return false;
				})
				.then((board) => {
					if (board) {
						board.ip = ip;
						dispatch(addBoard(board));
					} else console.log("Not a valid esp board.");
				})
				.catch((error) => console.log(error));
		};
		mdnsAddresses.map((mdns) => getBoardInfo(mdns));

		// function to check state of the switch
		const checkDeviceState = function (chipId, ip) {
			deviceState(ip)
				.then((response) => {
					console.log("ESP:", response.data, "||", response.config.url);
					if ("state" in response.data)
						dispatch(
							updateDeviceStateOfBoard({ chipId: chipId, deviceState: response.data.state })
						);
				})
				.catch((error) => console.log(error));
		};
		// checking for board update every 1 second
		const interval = setInterval(() => {
			// console.log("Board update every second!");
			boards.map((board) => {
				// dispatch(updateIpOfBoard(board.chipId));
				checkDeviceState(board.chipId, board.ip);
			});
		}, 1000);
		// return () => clearInterval(interval);
	}, []);

	return (
		<SafeAreaView className="bg-white pt-5 px-2">
			{/* Header */}
			<View className="flex-row pb-3 items-center space-x-2 px-2">
				<WifiIcon size={30} color="#00CCBB" />
				<View className="flex-1">
					<Text className="font-bold text-2xl">SmartLynk</Text>
				</View>
				<TouchableOpacity>
					<Cog6ToothIcon
						size={30}
						color="#00CCBB"
						onPress={() => {
							navigation.navigate("Settings", {});
						}}
					/>
				</TouchableOpacity>
			</View>

			{/* Zeroconf Scanner */}
			<ZeroconfRow />

			{/* Add Board by chipId */}
			<BoardByChipId />

			{/* Room Dashboard */}
			<BoardRow />
		</SafeAreaView>
	);
};

export default HomeScreen;
