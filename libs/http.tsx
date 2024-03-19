import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'; // prettier-ignore
import Cookies from "js-cookie";

let store: any;
let logout: any;

// injects
export const injectStore = (_store: any) => {
  store = _store;
};

export const injectLogout = (_logout: any) => {
  logout = _logout;
};

export const http = axios.create({
  timeout: 1000 * 60 * 5,
  baseURL: process.env["NEXT_PUBLIC_BASE_API"],
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
  },
});

http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const [token] = (() => {
    const _store = localStorage.getItem(
      process.env["NEXT_PUBLIC_STORAGE_KEY"]!
    );

    if (_store || store) {
      const st = _store && JSON.parse(_store);

      return [store?.token || st?.token];
    }

    return [];
  })();

  if (config.headers) {
    if (token) {
      config.headers["authorization"] = `Bearer ${token}`;
    }
  }

  config.params = {
    ...config.params,
  };

  return config;
});

http.interceptors.response.use(
  (response: AxiosResponse) => response.data.response,
  (error: AxiosError<string>) => {
    if (error.response?.status !== 500) {
      if (error.response?.status === 401) {
        logout?.();
      }

      return Promise.reject(error?.response?.data ?? error?.message);
    }

    if (error.response?.status === 500) {
      return Promise.reject({ message: "Internal server error" });
    }

    return;
  }
);

export default Object.assign(http, {
  injectStore,
  injectLogout,
});
