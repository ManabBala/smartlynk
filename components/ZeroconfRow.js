import { View, Text, DeviceEventEmitter } from "react-native";
import React, { useState, useEffect } from "react";

import Zeroconf from "react-native-zeroconf";
const zeroconf = new Zeroconf();

const ZeroconfRow = ({ localDevicesIp, setLocalDevicesIp }) => {
	useEffect(() => {
		zeroconf.on("start", () => console.log("The zeroconf scan has started."));
		zeroconf.on("resolved", (service) => {
			console.log(`The scan has resoled: Name:${service.name}, Ip:${service.host}`);
			// console.log(service);
			setLocalDevicesIp((prev) => [...prev, service.host]);
		});
		zeroconf.on("remove", (service) => {
			console.log("The scan has removed.");
			console.log(service);
		});
		zeroconf.on("stop", () => console.log("The scan has stopped."));

		zeroconf.scan("http", "tcp", "local.");

		// clearTimeout(this.timeout);
		// this.timeout = setTimeout(() => {
		// 	zeroconf.stop();
		// }, 5000);
		return () => {
			DeviceEventEmitter.removeAllListeners("RNZeroconfStart");
			DeviceEventEmitter.removeAllListeners("RNZeroconfStop");
			DeviceEventEmitter.removeAllListeners("RNZeroconfRemove");
			DeviceEventEmitter.removeAllListeners("RNZeroconfResolved");
		}; // cleanup the old listeners for memory leak
	}, []);

	return null;
};

export default ZeroconfRow;
