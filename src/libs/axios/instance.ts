import environment from "@/config/environment";
import { SessionExtended } from "@/types/Auth";
import axios from "axios";
import { getSession } from "next-auth/react";

const instance = axios.create({
  baseURL: environment.API_URL,
  timeout: 60 * 1000,
});

instance.interceptors.request.use(
  async (request) => {
    const session: SessionExtended | null = await getSession();
    if (session && session.accessToken) {
      request.headers.Authorization = `Bearer ${session.accessToken}`;
    }

    console.log("🔍 Axios Request:");
    console.log("URL:", request.baseURL, request.url);
    console.log("Headers:", request.headers);
    console.log("Method:", request.method);
    console.log("Data:", request.data);

    return request;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => Promise.reject(error),
);

export default instance;
