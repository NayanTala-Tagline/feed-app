import axios from 'axios';
import { APP_URL } from './host';

export const axiosClient = axios.create({
	baseURL: APP_URL,
});


axiosClient.interceptors.request.use(async (config) => {
	try {
		if (config.method === "post") {
			config.headers = {
				...config.headers,
				'Content-Type': 'multipart/form-data',
				Accept: 'application/json',
			}
		} else {
			config.headers = {
				...config.headers,
				"Content-Type": 'application/json',
				Accept: 'application/json',
			}
		}
	} catch (e) {
	}
	return config;
});
