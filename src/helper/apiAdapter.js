import axios from "axios";

export default function apiAdapter(baseUrl) {
  return axios.create({
    baseURL: baseUrl,
    timeout: 5000,
  });
}
