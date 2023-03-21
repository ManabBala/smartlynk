import axios from "axios";

export const deviceState = (ipOrHost) => {
	const url = `http://${ipOrHost}/device-state`;
	return axios.get(url);
};
