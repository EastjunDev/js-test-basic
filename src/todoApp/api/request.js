import { METHOD } from "../utils/constants.js";
import axios from "axios";

export const request = async (url, config = createAxiosConfig()) => {
  try {
    const res = await axios({ ...config, url });
    if (res.status !== 200) {
      throw new Error(`Error status code : ${res.status}`);
    }
    return res.data;
  } catch (error) {
    throw Error(error.message);
  }
};

export function createAxiosConfig(method = METHOD.GET, data) {
  return {
    headers: { "Content-Type": "application/json" },
    method,
    data,
  };
}
