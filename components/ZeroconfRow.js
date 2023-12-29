import { View, Text } from "react-native";
import React from "react";

import Zeroconf from "react-native-zeroconf";
const zeroconf = new Zeroconf();

zeroconf.on("start", () => console.log("The scan has started."));
zeroconf.on("resolved", (service) => {
	console.log("The scan has resoled.");
	console.log(service);
});
zeroconf.on("remove", (service) => {
	console.log("The scan has removed.");
	console.log(service);
});
zeroconf.on("stop", () => console.log("The scan has stopped."));

const ZeroconfRow = () => {
	zeroconf.scan("http", "tcp", "local.");

	// clearTimeout(this.timeout);
	// this.timeout = setTimeout(() => {
	//   zeroconf.stop();
	// }, 5000);

	return (
		<View>
			<Text>ZeroconfRow</Text>
		</View>
	);
};

export default ZeroconfRow;
