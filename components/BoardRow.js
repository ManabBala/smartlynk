import { View, Text, ScrollView, TouchableOpacity, Pressable, Alert } from "react-native";
import React from "react";
import { faCouch, faMugSaucer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import ControlRow from "./ControlRow";
import { useDispatch, useSelector } from "react-redux";
import { removeBoard, selectBoards } from "../features/boardSlice";

const BoardRow = () => {
	const boards = useSelector(selectBoards);
	const dispatch = useDispatch();

	const boardRemoveAlert = function (chipId, name) {
		Alert.alert(
			// Title
			"Remove Board",
			// body
			`You will no longer able to control those devises.`,
			[
				{
					text: "Remove",
					onPress: () => {
						console.log("removing board with chip:", chipId);
						dispatch(removeBoard(chipId));
					},
				},
				{
					text: "Cancel",
					onPress: () => {
						console.log("Not removing board with chip:", chipId);
					},
				},
			],
			{
				cancelable: true,
				onDismiss: () => console.log("alert dismissed by tapping outside."),
			}
		);
	};

	return (
		<ScrollView contentContainerStyle={{ paddingBottom: 225 }}>
			{boards.map((board) => (
				<View
					key={board.chipId}
					className="shadow-md mx-2 shadow-slate-900 mt-4 rounded-lg bg-white"
				>
					<Pressable
						onLongPress={() => boardRemoveAlert(board.chipId, board.name)}
						className="flex-row items-center justify-between px-1"
					>
						<Text className="font-bold text-xl text-slate-900"> {board.name}</Text>
						<FontAwesomeIcon icon={faCouch} size={32} color={"rgb(32, 228, 255)"} />
					</Pressable>
					<Text className="text-xs text-gray-600 px-2">({board.chipId})</Text>
					<View className="h-px my-2 bg-gray-200 border-1 dark:bg-gray-700"></View>
					{/* button area */}
					<View className="mt-2">
						<ControlRow
							ip={board.ip}
							chipId={board.chipId}
							devices={board.devices}
							className="m-2 rounded-md"
							remote={board?.remote}
						/>
					</View>
				</View>
			))}
		</ScrollView>
	);
};

export default BoardRow;
