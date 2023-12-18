import axios, {AxiosInstance} from "axios";
import {getAuthenticationToken} from "@common/util";

export const API: AxiosInstance = axios.create({
  // baseURL: "https://api-gateway.europe.es-dis.net",
  headers: {
    Authorization: `Bearer ${getAuthenticationToken()}`
  }
})
