import Login from "@/components/views/Auth/Login";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Acara | Login",
  description: "Rezky Saputra Acara",
};

const LoginPage = () => {
  return (
    <Suspense>
      <Login></Login>
    </Suspense>
  );
};

export default LoginPage;
