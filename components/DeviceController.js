import { View, Text, ScrollView } from "react-native";
import React from "react";
import { faCouch, faMugSaucer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import ButtonCard from "./ButtonCard";

const DeviceController = ({ devices }) => {
	return (
		<View className=" p-2">
			{Object.entries(devices).map(([ip, data]) => (
				<View key={ip} className="shadow-lg shadow-slate-900 mt-4 p-1 rounded-lg bg-white">
					<View className="flex-row items-center justify-between px-1">
						<Text className="font-bold text-xl text-slate-800"> {data["name"]}</Text>
						<FontAwesomeIcon icon={faCouch} size={32} color={"rgb(32, 228, 255)"} />
					</View>
					<Text className="text-xs text-gray-600 px-2">({ip})</Text>
					<View className="h-px my-2 bg-gray-200 border-1 dark:bg-gray-700"></View>
					{/* button area */}
					<View className="mt-2">
						<ButtonCard ip={ip} relays={data["relays"]} className="m-2 rounded-md" />
					</View>
				</View>
			))}
		</View>
	);
};

export default DeviceController;
