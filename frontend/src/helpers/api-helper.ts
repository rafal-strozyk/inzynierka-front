import Axios from "axios";

const apiHelper = Axios.create({
  baseURL: "/api",
});

apiHelper.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${
    localStorage.getItem("token") ?? sessionStorage.getItem("token") ?? ""
  }`;
  return config;
});

export default apiHelper;
