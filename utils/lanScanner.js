export const scanNetwork = async () => {
	console.log("scanNetwork called");
	let successIpResults = [];
	let errorIpResults = [];
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
			method: "GET",
			mode: "no-cors",
			signal,
		})
			.then((response) => {
				const endTime = performance.now();
				if (response.ok) {
					console.log(i, ")es ok");
					successIpResults.push({
						status: true,
						ip: ip,
						// time: parseInt(endTime - startTime),
						// message: "",
					});
				}
			})
			.catch((error) => {
				const endTime = performance.now();
				// console.log(i, ")res not ok");
				errorIpResults.push({
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
	return successIpResults;
};
