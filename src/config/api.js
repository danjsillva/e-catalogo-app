import axios from "axios";

export const apiURL = "http://localhost:3333";

const API = axios.create({
  baseURL: apiURL
});

export default API;
