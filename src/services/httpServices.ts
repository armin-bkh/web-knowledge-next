import axios from "axios";
import config from "@/global/config";

axios.defaults.baseURL = config.webKnowledgeApi;
axios.defaults.withCredentials = true;

export const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
