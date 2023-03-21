import axios from "axios";

export const deviceControl = (ipOrHost, relay, state) => {
	const url = `http://${ipOrHost}/device?relay=${relay}&state=${state}`;
	return axios.get(url);
};
