import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import NetworkScanner from "../components/NetworkScanner";
import { useSelector } from "react-redux";
import boardSlice, { selectBoards } from "../features/boardSlice";

const SettingsScreen = () => {
	const boards = useSelector(selectBoards);
	return (
		<SafeAreaView className="bg-white pt-5 px-2">
			<NetworkScanner />
			<View>
				{boards.map((board, index) => (
					<Text key={board.chipId}>
						{index + 1}
						{")"}
						{board.name}
					</Text>
				))}
			</View>
		</SafeAreaView>
	);
};

export default SettingsScreen;
