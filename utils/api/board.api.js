import axios from "axios";

export const getBoardApi = function (ipOrHost) {
	return axios.get(`http://${ipOrHost}/board`, {
		method: "GET",
	});
};
