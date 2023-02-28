import { View, Text } from "react-native";
import React, { useState } from "react";
import ToggleSwitch from "toggle-switch-react-native";

const ButtonCard = ({ ip, relays }) => {
	return (
		<View>
			{relays.map((relay) => {
				const [toggleState, setToggleState] = useState(false);
				return (
					<View
						key={relay["id"]}
						className=" flex-row p-1 my-1 bg-white rounded-md items-center justify-between"
						// style={{ elevation: 2 }}
					>
						<Text className="font-bold text-lg text-slate-700">{relay["name"]}</Text>
						<ToggleSwitch
							isOn={toggleState}
							onColor="#06b6d4"
							offColor="#cbd5e1"
							size="medium"
							onToggle={(isOn) => {
								setToggleState(!toggleState);
								console.log(`[${ip}][${relay["id"]}] changed to : ${isOn}`);
							}}
						/>
					</View>
				);
			})}
		</View>
	);
};

export default ButtonCard;
