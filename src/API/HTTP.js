import axios from "axios";

export const HTTP = axios.create({
  baseURL: "https://transfer-go.herokuapp.com"
})