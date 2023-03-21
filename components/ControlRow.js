import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import ToggleSwitch from "toggle-switch-react-native";
import { deviceControl } from "../utils/api/deviceSwitch.api";
import { selectBoardsByChipId } from "../features/boardSlice";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMobileRetro } from "@fortawesome/free-solid-svg-icons";
import { remoteControl } from "../utils/api/remote.api";
import { useSelector } from "react-redux";

const ControlRow = ({ chipId }) => {
	const board = useSelector((state) => selectBoardsByChipId(state, chipId))[0];
	return (
		<View>
			<View>
				{board.devices.map((device, index) => {
					const [toggleState, setToggleState] = useState(false);

					return (
						<View
							key={`${chipId}-${device["relay"]}`}
							className=" flex-row p-1 my-1 bg-white rounded-md items-center justify-between"
							// style={{ elevation: 2 }}
						>
							<Text
								className="font-bold text-lg text-slate-700"
								onPress={() => {
									setToggleState(!toggleState);
								}}
							>
								{device["name"]}
							</Text>
							<ToggleSwitch
								isOn={
									"deviceState" in board
										? board.deviceState[index] == 1
											? true
											: false
										: toggleState
								}
								onColor="#06b6d4"
								offColor="#cbd5e1"
								size="medium"
								onToggle={(isOn) => {
									setToggleState(!toggleState);
									console.log(
										`[${chipId}-${device["relay"]}][${device["name"]}] changed to : ${isOn}`
									);
									//  `${toggleState ? "0" : "1"}` as setToggleStage will update later.
									deviceControl(board.ip, device.relay, `${toggleState ? "0" : "1"}`)
										.then((response) => {
											console.log("ESP:", response.data, "||", response.config.url);
										})
										.catch((error) => console.log(error));
								}}
							/>
						</View>
					);
				})}
			</View>

			{"remote" in board ? (
				<View>
					<View className="h-px my-2 bg-gray-200 border-1 dark:bg-gray-700"></View>
					<View className="p-2">
						<View className="flex-row justify-between">
							<Text className="font-bold text-xl text-slate-900">Remote</Text>
							<FontAwesomeIcon icon={faMobileRetro} size={32} color={"rgb(32, 228, 255)"} />
						</View>
						<View className="h-px my-2 bg-gray-200 border-1 dark:bg-gray-700"></View>
						<View className="flex items-center gap-2">
							{board.remote?.map((remoteBtn) => {
								return (
									<TouchableOpacity
										key={remoteBtn.code}
										onPress={() => {
											console.log(remoteBtn.code);
											remoteControl(board.ip, remoteBtn.code)
												.then((response) => {
													console.log("ESP:", response.data, "||", response.config.url);
												})
												.catch((error) => console.log(error));
										}}
									>
										<Text className="font-bold text-lg text-slate-700">{remoteBtn.name}</Text>
									</TouchableOpacity>
								);
							})}
						</View>
					</View>
				</View>
			) : null}
		</View>
	);
};

export default ControlRow;
