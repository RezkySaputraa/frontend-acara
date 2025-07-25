"use client"

import { createContext, useState } from "react";

interface IToaster {
  type: string;
  message: string;
}

interface IToasterState {
  toaster: IToaster;
  setToaster: (toaster: { type: string; message: string }) => void;
}
const defaultToaster = {
  type: "",
  message: "",
};

const ToasterContext = createContext<IToasterState>({
  toaster: defaultToaster,
  setToaster: () => {},
});

const ToasterProvider = ({ children }: { children: React.ReactNode }) => {
  const [toaster, setToaster] = useState<IToaster>(defaultToaster);

  return (
    <ToasterContext.Provider value={{ toaster, setToaster }}>
      {children}
    </ToasterContext.Provider>
  );
};

export {ToasterProvider, ToasterContext, defaultToaster};
export type {IToaster, IToasterState}