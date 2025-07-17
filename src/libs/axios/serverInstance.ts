import { auth } from "@/auth";
import environment from "@/config/environment";
import { SessionExtended } from "@/types/Auth";
import axios from "axios";

const serverInstance = axios.create({
  baseURL: environment.API_URL,
  timeout: 60 * 1000,
});

serverInstance.interceptors.request.use(
  async (request) => {
    const session: SessionExtended | null = await auth();
    if (session && session.accessToken) {
      request.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return request;
  },
  (error) => Promise.reject(error),
);

serverInstance.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => Promise.reject(error),
);

export default serverInstance;
