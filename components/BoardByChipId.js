import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Button, Input } from "react-native-elements";
import { PlusIcon } from "react-native-heroicons/outline";
import { getBoardApi } from "../utils/api/board.api";
import { useDispatch } from "react-redux";
import { addBoard } from "../features/boardSlice";

const BoardByChipId = () => {
	const [chipId, setChipId] = useState("");
	const dispatch = useDispatch();

	return (
		<View className="flex-row p-1 mt-2 mx-2 rounded-lg border-2 border-slate-200">
			<TextInput
				className="grow text-lg"
				placeholder="Board Id"
				keyboardType="numeric"
				maxLength={7}
				onChangeText={(input) => {
					console.log(input);
				}}
			/>
			<TouchableOpacity>
				<PlusIcon
					size={25}
					color="#00CCBB"
					onPress={(chipId) =>
						getBoardApi("192.168.0.172")
							.then((response) => {
								console.log(response.data);
								dispatch(addBoard(response.data));
							})
							.catch((error) => {
								console.log(error);
							})
					}
				/>
			</TouchableOpacity>
		</View>
	);
};

export default BoardByChipId;
