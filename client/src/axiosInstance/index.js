import axios from "axios";

const defaultOptions = {
  baseURL: "http://localhost:5000/api/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

const instance = axios.create(defaultOptions);

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("jwt");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    let err = error.response.data.message;

    if (err === undefined) err = error.response.data.error.error;
    window.alert(err);
    console.log(error.response);
  }
);

export default instance;
