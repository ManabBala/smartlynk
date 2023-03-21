import axios from "axios";

const ping = function (ipOrHost) {
	return axios.get(`http://${ipOrHost}`);
};
