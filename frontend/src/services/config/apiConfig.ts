import axios from "axios";
import { apiAddress } from "@shared/contants/apiAddresses";

const BASE_URL = process.env.REACT_APP_BASE_URL || apiAddress;

export const API = axios.create({
  baseURL: BASE_URL,
});
