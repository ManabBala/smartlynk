import axios from "axios";

export const remoteControl = (ipOrHost, code) => {
	const url = `http://${ipOrHost}/remote?code=${code}`;
	return axios.get(url);
};
