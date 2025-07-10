import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IActivation, IRegister } from "@/types/Auth";

const authServices = {
  register: async (payload: IRegister) => {
    try {
      const response = await instance.post(
        `${endpoint.AUTH}/register`,
        payload,
      );
      return response;
    } catch (error: any) {
      console.log("🚫 API Error:", error.response?.data || error.message);
      throw error;
    }
  },
  activation: (payload: IActivation) =>
    instance.post(`${endpoint.AUTH}/activation`, payload),
};

export default authServices;
