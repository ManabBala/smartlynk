import React, { useState, useEffect } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import NetworkScanResultCard from "./NetworkScanResultCard";

const NetworkScanner = ({ setDevices }) => {
	const [showAllScanResult, setShowAllScanResult] = useState(false);
	// setShowAllScanResult(true);
	const [ipArray, setIpArray] = useState([]);

	const scanNetwork = async () => {
		console.log("scanNetwork called");
		setIpArray([]);
		tempIpResult = [];
		const currentIP = "192.168.0."; // Change this to your local IP range
		const promises = [];

		const controller = new AbortController();
		const signal = controller.signal;

		for (let i = 1; i < 255; i++) {
			const ip = `${currentIP}${i}`;
			// console.log("Scan Ip: ", ip);

			const startTime = performance.now();
			const timeout = setTimeout(() => {
				controller.abort();
			}, 15000); // 1 second timeout

			const promise = fetch(`http://${ip}`, {
				method: "HEAD",
				mode: "no-cors",
				signal,
			})
				.then((response) => {
					const endTime = performance.now();
					if (response.ok) {
						// console.log(i, ")es ok");
						tempIpResult.push({
							status: true,
							ip: ip,
							// time: parseInt(endTime - startTime),
							// message: "",
						});
						// setIpArray([...tempIpResult]);

						// useState only using to update the true values
						setIpArray((ipArray) => [
							...ipArray,
							{
								status: true,
								ip: ip,
								// time: parseInt(endTime - startTime),
								// message: "",
							},
						]);
					}
				})
				.catch((error) => {
					const endTime = performance.now();
					// console.log(i, ")res not ok");
					tempIpResult.push({
						status: false,
						ip: ip,
						// time: parseInt(endTime - startTime),
						// message: error.message,
					});
					// setIpArray([...tempIpResult]); // not calling as useState can't catchup with promise
				});

			promises.push(promise);
			// cleanup the timeout
			promise.finally(() => {
				clearTimeout(timeout);
			});
		}

		await Promise.all(promises);

		// Setting values at end to avoid useState update issue
		setIpArray([...tempIpResult]);
	};

	return (
		<View>
			<Button title="Scan Network" onPress={scanNetwork} />
			<ScrollView>
				{ipArray.map((data) => {
					// console.log(data);
					if (showAllScanResult || data.status)
						return (
							<NetworkScanResultCard
								key={data.ip}
								status={data.status}
								ip={data.ip}
								time={data?.time / 1000}
								message={data?.message}
								setDevices={setDevices}
							></NetworkScanResultCard>
						);
				})}
			</ScrollView>
		</View>
	);
};

export default NetworkScanner;
