import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { addBoard } from "../features/boardSlice";

const IpScanResultCard = ({ status, ip, time, message }) => {
	const dispatch = useDispatch();

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

	return (
		<TouchableOpacity
			onPress={() => {
				getBoardInfo(ip);
			}}
			className={`shadow-lg shadow-slate-700 rounded p-1 my-1 items-center ${
				status ? "bg-green-500" : "bg-red-500"
			}`}
		>
			<Text>{ip}</Text>
		</TouchableOpacity>
	);
};

export default IpScanResultCard;
