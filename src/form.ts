import { AxiosRequestConfig } from "axios";
import { reactive, watch } from "vue";
import {
	deleteRecord,
	remoteGet,
	remotePatch,
	remotePost,
	remotePut,
} from "./http";

interface TFormOpts {
	onStart?: Function;
	onCancelToken?: Function;
	onBefore?: Function;
	onSuccess?: Function;
	onError?: Function;
	onFinally?: Function;
	onProgress?: Function;
	onComplete?: Function;
	onAbort?: Function;
	onTimeout?: Function;
	onCancel?: Function;
	onUploadProgress?: Function;
	onFinish?: Function;
}

export default function useForm<TForm extends Record<string, any>>(
	data: TForm
) {
	let defaults: any = {};
	let cancelToken: any = null;
	let recentlySuccessfulTimeoutId: any = null;

	let transform: Function = (data: any) => data;

	const form = reactive({
		...data,
		isDirty: false,
		errors: data.errors,
		hasErrors: false,
		processing: false,
		progress: null,
		wasSuccessful: false,
		recentlySuccessful: false,

		data() {
			return Object.keys(data).reduce((carry: any, key) => {
				carry[key] = this[key];
				return carry;
			}, {});
		},

		transform(callback: Function) {
			transform = callback;
			return this;
		},

		defaults(key: any, value: any) {
			if (typeof key === "undefined") {
				defaults = this.data();
			} else {
				defaults = Object.assign(
					{},
					defaults,
					value ? { [key]: value } : key
				);
			}

			return this;
		},

		reset(...fields: any) {
			if (fields.length === 0) {
				Object.assign(this, defaults);
			} else {
				Object.assign(
					this,
					Object.keys(defaults)
						.filter((key) => fields.includes(key))
						.reduce((carry: any, key: string) => {
							carry[key] = defaults[key];
							return carry;
						}, {})
				);
			}

			return this;
		},

		setError(key: any, value: any) {
			Object.assign(this.errors, value ? { [key]: value } : key);

			this.hasErrors = Object.keys(this.errors).length > 0;

			return this;
		},

		clearErrors(...fields: any) {
			this.errors = Object.keys(this.errors).reduce(
				(carry, field) => ({
					...carry,
					...(fields.length > 0 && !fields.includes(field)
						? { [field]: this.errors[field] }
						: {}),
				}),
				{}
			);

			this.hasErrors = Object.keys(this.errors).length > 0;

			return this;
		},

		async submit(
			method: string,
			url: string,
			options: TFormOpts & AxiosRequestConfig = {}
		) {
			this.processing = true;
			const data = transform(this.data());
			const _options = {
				...options,
				onCancelToken: (token: any) => {
					cancelToken = token;

					if (options.onCancelToken) {
						return options.onCancelToken(token);
					}
				},
				onBefore: (visit: any) => {
					this.wasSuccessful = false;
					this.recentlySuccessful = false;
					clearTimeout(recentlySuccessfulTimeoutId);

					if (options.onBefore) {
						return options.onBefore(visit);
					}
				},
				onStart: (visit: any) => {
					this.processing = true;

					if (options.onStart) {
						return options.onStart(visit);
					}
				},
				onProgress: (event: any) => {
					this.progress = event;

					if (options.onProgress) {
						return options.onProgress(event);
					}
				},
				onSuccess: async (page: any) => {
					this.processing = false;
					this.progress = null;
					this.clearErrors();
					this.wasSuccessful = true;
					this.recentlySuccessful = true;

					recentlySuccessfulTimeoutId = setTimeout(
						() => (this.recentlySuccessful = false),
						2000
					);

					const onSuccess = options.onSuccess
						? await options.onSuccess(page)
						: null;

					defaults = {};

					this.isDirty = false;

					return onSuccess;
				},
				onError: (errors: any) => {
					this.processing = false;
					this.progress = null;
					this.clearErrors().setError(errors, errors);

					if (options.onError) {
						return options.onError(errors);
					}
				},
				onCancel: () => {
					this.processing = false;
					this.progress = null;

					if (options.onCancel) {
						return options.onCancel();
					}
				},
				onFinish: () => {
					this.processing = false;
					this.progress = null;
					cancelToken = null;

					if (options.onFinish) {
						return options.onFinish();
					}
				},
			};

			let ret: any;

			try {
				this.processing = true;
				const multipart = data instanceof FormData && !!data.values();

				switch (method) {
					case "post":
						ret = await remotePost(url, data, options);
						break;

					case "patch":
						ret = await remotePatch(data, url, multipart, options);
						break;

					case "put":
						ret = await remotePut(data, url, multipart, options);
						break;

					case "delete":
						ret = await deleteRecord(data, url, options);
						break;

					default:
						ret = await remoteGet(url, _options);
						break;
				}

				this.processing = false;
			} catch (error) {
				ret.errors = [error];
			}

			if ((ret?.response?.data as any)?.errors) {
				this.errors = (ret.response?.data as any).errors;
			}

			this.processing = false;
			return ret;
		},

		async get(url: string, options?: TFormOpts & AxiosRequestConfig) {
			return this.submit("get", url, options);
		},

		async post(url: string, options?: TFormOpts & AxiosRequestConfig) {
			return this.submit("post", url, options);
		},

		async put(url: string, options?: TFormOpts & AxiosRequestConfig) {
			return this.submit("put", url, options);
		},

		async patch(url: string, options?: TFormOpts & AxiosRequestConfig) {
			return this.submit("patch", url, options);
		},

		async delete(url: string, options?: TFormOpts & AxiosRequestConfig) {
			return this.submit("delete", url, options);
		},

		cancel() {
			if (cancelToken) {
				cancelToken.cancel();
			}
		},
	});

	watch(
		form,
		(val) => {
			form.isDirty = !!val;
		},
		{ immediate: true, deep: true }
	);

	return form;
}
