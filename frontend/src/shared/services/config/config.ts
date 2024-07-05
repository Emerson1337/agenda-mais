import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization:
      typeof localStorage !== "undefined"
        ? localStorage.getItem("Authorization")
        : null,
  },
});
