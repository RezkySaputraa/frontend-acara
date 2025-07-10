"use client";

import { Button } from "@heroui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const RegisterSuccess = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center w-screen gap-10 p-4">
      <div className="flex flex-col items-center justify-center gap-10">
        <Image
          src={"/images/general/logo.svg"}
          alt="logo"
          width={180}
          height={180}
        ></Image>
        <Image
          src={"/images/illustration/email-send.svg"}
          alt="success"
          width={300}
          height={300}
        ></Image>
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold text-danger-500">
          Create Account Success
        </h1>
        <p className="text-xl font-bold text-default-500">
          Check your email for account activation
        </p>
        <Button
          className="mt-4 w-fit"
          variant="bordered"
          color="danger"
          onPress={() => router.push("/")}
        >
          Back to home
        </Button>
      </div>
    </div>
  );
};

export default RegisterSuccess;
