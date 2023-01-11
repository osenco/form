import axios, {
	AxiosError,
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
} from "axios";

const http: AxiosInstance = axios.create({
	withCredentials: true,
	headers: {
		Accept: "Application/json",
		"Content-Type": "Application/json",
	},
});

const buildQueryString = (query: any): string => {
	return (
		"?" +
		Object.keys(query)
			.map((k) => `${k}=${query[k]}`)
			.join("&")
	);
};

export const remotePost = async (
	url: string,
	payload: any,
	options?: AxiosRequestConfig
): Promise<any> => {
	try {
		const { data } = await http.post(url, payload, options);

		return data;
	} catch (error) {
		return error;
	}
};

export const remoteGet = async (
	url: string,
	query: any = {},
	options?: AxiosRequestConfig
): Promise<any> => {
	try {
		const { data } = await http.get(url + buildQueryString(query), options);

		return data;
	} catch (error) {
		return error;
	}
};

export const fetchAll = async (
	path: string,
	options?: AxiosRequestConfig
): Promise<any> => {
	try {
		const { data } = await http.get(path, options);

		return data;
	} catch (error) {
		return error;
	}
};

export const searchRecord = async (
	searchTerm: any,
	path = "users",
	options?: AxiosRequestConfig
): Promise<any> => {
	try {
		const res = await remoteGet(path, searchTerm, options);
		const { data } = res;

		return data ? data[0] ?? 404 : res[0] ?? 404;
	} catch (error) {
		return error;
	}
};

export const searchRecords = async (
	searchTerm: any,
	path = "users",
	options?: AxiosRequestConfig
): Promise<any> => {
	try {
		const { data } = await http.get(
			`${path}?search=${searchTerm}`,
			options
		);

		return data;
	} catch (error) {
		return error;
	}
};

export const fetchRecord = async (
	id: string | number,
	path = "users",
	options?: AxiosRequestConfig
): Promise<any> => {
	try {
		const { data } = await http.get(`${path}/${id}`, options);

		return data;
	} catch (error) {
		return error;
	}
};

export const createRecord = async (
	payload: any,
	path = "users",
	multipart: boolean = false,
	options?: AxiosRequestConfig
): Promise<any> => {
	if (multipart) {
		http.defaults.headers.common["Content-Type"] = "multipart/form-data";
	}

	try {
		const { data } = await http.post(path, payload, options);

		return data;
	} catch (error) {
		return error;
	}
};

export const remotePut = async (
	payload: any,
	path: string = "users",
	multipart: boolean = false,
	options?: AxiosRequestConfig
): Promise<any> => {
	if (multipart) {
		http.defaults.headers.common["Content-Type"] = "multipart/form-data";
	}

	try {
		const { data } = await http.put(
			`${path}/${payload.id ?? ""}`,
			payload,
			options
		);

		return data;
	} catch (error) {
		return error;
	}
};

export const remotePatch = async (
	payload: any,
	path: string = "users",
	multipart: boolean = false,
	options?: AxiosRequestConfig
): Promise<any> => {
	if (multipart) {
		http.defaults.headers.common["Content-Type"] = "multipart/form-data";
	}

	try {
		const { data } = await http.patch(
			`${path}/${payload.id ?? ""}`,
			payload,
			options
		);

		return data;
	} catch (error) {
		return error;
	}
};

export const deleteRecord = async (
	id: number | string,
	path = "users",
	options?: AxiosRequestConfig
): Promise<any> => {
	try {
		const { data } = await http.delete(`/${path}/${id}`, options);

		return data;
	} catch (error) {
		return error;
	}
};
