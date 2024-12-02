import axios from "axios";


const csrfToken = document
  .querySelector('meta[name="csrf-token"]')
  ?.getAttribute("content");

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  responseType: "json",
  withCredentials: true,
  headers: {
    "X-CSRF-TOKEN": csrfToken,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const httpRequest = async (data) => {
  try {
    const res = await axiosInstance.request(data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
