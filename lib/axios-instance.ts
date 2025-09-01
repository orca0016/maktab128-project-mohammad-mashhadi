import axios from "axios";

export const axiosInstance = () => {
  return axios.create({
    // baseURL: "https://maktab128-project-mohammad-mashhadi.vercel.app",
    baseURL: "http://localhost:3000",
  });
};
export const axiosInstanceBackEnd = () => {
  const axiosClient = axios.create({
    baseURL: "https://minimal-backend.liara.run",
  });
  axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("access-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  axiosClient.interceptors.response.use(
    (res) => res,
    (error) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        if (
          !window.location.href.includes("login") &&
          !window.location.href.includes("sign-up")
        ) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      }
      return Promise.reject(error);
    }
  );
  return axiosClient;
};
