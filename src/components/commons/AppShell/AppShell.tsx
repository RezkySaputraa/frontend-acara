"use client";

import Toaster from "@/components/ui/Toaster";
import { defaultToaster, ToasterContext } from "@/contexts/ToasterContext";
import { useContext, useEffect } from "react";

const AppShell = ({ children }: { children: React.ReactNode }) => {
  const { toaster, setToaster } = useContext(ToasterContext);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setToaster(defaultToaster);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [toaster]);

  return (
    <>
      {children}
      {toaster.type !== "" && (
        <Toaster type={toaster.type} message={toaster.message} />
      )}
    </>
  );
};

export default AppShell;
