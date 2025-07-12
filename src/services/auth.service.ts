import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IActivation, ILogin, IRegister } from "@/types/Auth";
import serverInstance from "@/libs/axios/serverInstance";

const authServices = {
  register: async (payload: IRegister) =>
    instance.post(`${endpoint.AUTH}/register`, payload),

  activation: (payload: IActivation) =>
    serverInstance.post(`${endpoint.AUTH}/activation`, payload),

  login: (payload: ILogin) =>
    serverInstance.post(`${endpoint.AUTH}/login`, payload),

  getProfileWithToken: (token: string) =>
    serverInstance.get(`${endpoint.AUTH}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export default authServices;
