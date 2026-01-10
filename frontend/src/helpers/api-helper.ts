import Axios, {type  AxiosInstance, type AxiosRequestConfig } from "axios";

class ApiHelper {
  private axios: AxiosInstance;

  constructor() {
    this.axios = Axios.create({
      baseURL: '/api',
    });
  }

  get(url: any, config?: AxiosRequestConfig) {
    return this.axios.get(url, config);
  }

  post(url: any, data:any, config?: AxiosRequestConfig) {
    return this.axios.post(url, data, config);
  }
}

export default new ApiHelper();
