import { View, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";

const MathTable = () => {
	const [mathArray, setMathArray] = useState([0]);
	const [count, setCount] = useState(0);
	arr = [0];

	useEffect(() => {
		let timer = setInterval(() => {
			// setCount((count) => count + 1);
			// mathArray.push(count);
			setMathArray((mathArray) => [...mathArray, mathArray[mathArray.length - 1] + 1]);
			return mathArray;

			// console.log(mathArray);
		}, 1000);
	}, []);

	return (
		<View>
			<ScrollView>
				<Text>I've rendered {count} times!</Text>
				{mathArray.map((val) => {
					return <Text key={val}>{val}</Text>;
				})}
			</ScrollView>
			{/* <Text>I've rendered {console.log(count)} times!</Text> */}
		</View>
	);
};

export default MathTable;
