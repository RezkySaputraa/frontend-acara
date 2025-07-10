import Register from "@/components/views/Auth/Register";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acara | Register",
  description: "Rezky Saputra Acara",
};

const RegisterPage = () => {
  return <Register></Register>;
};

export default RegisterPage;
