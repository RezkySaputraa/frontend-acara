"use client";

import { useContext, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ILogin } from "@/types/Auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { ToasterContext } from "@/contexts/ToasterContext";

const loginSchema = yup.object().shape({
  identifier: yup.string().required("Email or Username is required"),
  password: yup.string().required("Password is required"),
});

const useLogin = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const searchParams = useSearchParams();
  const { setToaster } = useContext(ToasterContext);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const redirectTo: string = searchParams.get("callbackUrl") || "/";

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const loginService = async (payload: ILogin) => {
    const result = await signIn("credentials", {
      ...payload,
      redirect: false,
      redirectTo,
    });

    if (result?.error) {
      throw new Error("Login failed");
    }
  };

  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: loginService,
    onError: (error) => {
      setToaster({ type: "error", message: "Your Credentials is wrong" });
    },
    onSuccess: () => {
      reset();
      setToaster({ type: "success", message: "Login success" });
      router.push(redirectTo);
    },
  });

  const handleLogin = (data: ILogin) => mutateLogin(data);

  return {
    isVisible,
    toggleVisibility,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  };
};

export default useLogin;
