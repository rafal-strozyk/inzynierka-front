import Axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

class ApiHelper {
  private axios: AxiosInstance;

  constructor() {
    this.axios = Axios.create({
      baseURL: "/api",
    });

    this.axios.interceptors.request.use(function (config) {
      config.headers.Authorization = `Bearer ${localStorage.getItem("token") ?? sessionStorage.getItem("token") ?? ""}`;
      return config;
    });
  }

  get(url: string, config?: AxiosRequestConfig) {
    return this.axios.get(url, config);
  }

  post(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.axios.post(url, data, config);
  }
}

export default new ApiHelper();
