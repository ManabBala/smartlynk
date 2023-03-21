import React, { useState, useEffect } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { getBoardApi } from "../utils/api/board.api";
import { scanNetwork } from "../utils/lanScanner";
import NetworkScanResultCard from "./NetworkScanResultCard";

const NetworkScanner = () => {
	const [showAllScanResult, setShowAllScanResult] = useState(false);
	// setShowAllScanResult(true);
	const [ipArray, setIpArray] = useState([]);

	// Setting values at end to avoid useState update issue
	// setIpArray([...tempIpResult]);

	return (
		<View>
			<Button
				title="Scan Network"
				onPress={() => {
					scanNetwork().then((pingAbleIp) => {
						console.log("outside", pingAbleIp);
						pingAbleIp.map(({ ip, status }) =>
							getBoardApi(ip)
								.then((res) => {
									console.log(res.data);
									setIpArray((ipArray) => [...ipArray, { ip: ip, status: "success" }]);
								})
								.catch((error) => console.log("Not a ESP board.", ip))
						);
					});
				}}
			/>
			<ScrollView>
				{ipArray.map((data) => {
					return (
						<NetworkScanResultCard
							key={data.ip}
							status={data.status}
							ip={data.ip}
							time={data?.time / 1000}
							message={data?.message}
						></NetworkScanResultCard>
					);
				})}
			</ScrollView>
		</View>
	);
};

export default NetworkScanner;
