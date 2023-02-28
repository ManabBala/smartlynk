import { View, Text } from "react-native";
import React from "react";
import { useNetInfo } from "@react-native-community/netinfo";
import { CheckCircleIcon, WifiIcon, XCircleIcon } from "react-native-heroicons/outline";

const NetInfo = () => {
	// For Internet info
	const netInfo = useNetInfo();

	return (
		<View className="items-center">
			<View className="flex-row space-x-2">
				<Text>Connection: {netInfo.type.toUpperCase().trim()}</Text>
				<WifiIcon size={13} color="#00CCBB"></WifiIcon>
			</View>
			<Text>
				Is Connected?{" "}
				{netInfo.isConnected ? (
					<CheckCircleIcon size={14} color={"green"} />
				) : (
					<XCircleIcon size={14} color="red" />
				)}
			</Text>
			<Text>
				Is Internet Available?{" "}
				{netInfo.isInternetReachable ? (
					<CheckCircleIcon size={14} color="green" />
				) : (
					<XCircleIcon size={14} color="red" />
				)}
			</Text>
		</View>
	);
};

export default NetInfo;
