import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

export const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    authorization:
      typeof localStorage !== "undefined"
        ? localStorage.getItem("authorization")
        : null,
  },
});
