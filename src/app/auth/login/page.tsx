import Login from "@/components/views/Auth/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acara | Login",
  description: "Rezky Saputra Acara",
};

const LoginPage = () => {
  return <Login></Login>;
};

export default LoginPage;
