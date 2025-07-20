import { ToasterContext } from "@/contexts/ToasterContext";
import uploadServices from "@/services/upload.service";
import { IFileURL } from "@/types/File";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useMediaHandling = () => {
  const { setToaster } = useContext(ToasterContext);

  const uploadFile = async (
    file: File,
    callback: (fileUrl: string) => void,
  ) => {
    const formData = new FormData();
    formData.append("file", file);
    console.log("📦 File name:", file.name);

    const {
      data: {
        data: { secure_url: fileUrl },
      },
    } = await uploadServices.uploadFile(formData);
    callback(fileUrl);
  };

  const { mutate: mutateUploadFile, isPending: isPendingMutateUploadFile } =
    useMutation({
      mutationFn: (variables: {
        file: File;
        callback: (fileUrl: string) => void;
      }) => uploadFile(variables.file, variables.callback),
      onError: (error) => {
        console.error("🔥 Error in uploadIcon:", error);
        setToaster({ type: "error", message: error.message });
      },
    });

  const deleteFile = async (fileUrl: string, callback: () => void) => {
    const res = await uploadServices.deleteFile({ fileUrl });
    if (res.data.meta.status === 200) {
      callback();
    }
  };

  const { mutate: mutateDeleteFile, isPending: isPendingMutateDeleteFile } =
    useMutation({
      mutationFn: (variables: { fileUrl: string; callback: () => void }) =>
        deleteFile(variables.fileUrl, variables.callback),
      onError: (error) => {
        console.error("🔥 Error in uploadIcon:", error);
        setToaster({ type: "error", message: error.message });
      },
    });

  const handleUploadFile = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
    callback: (fileUrl?:string) => void,
  ) => {
    if (files.length !== 0) {
      onChange(files);
      const file = files[0];
      console.log("🔍 FILE YANG DIPILIH:", file);
      mutateUploadFile({
        file: files[0],
        callback,
      });
    }
  };

  const handleDeleteFile = (
    fileUrl: string | FileList | undefined,
    callback: () => void,
  ) => {
    if (typeof fileUrl === "string") {
      mutateDeleteFile({ fileUrl, callback });
    } else {
      callback();
    }
  };

  return {
    mutateUploadFile,
    isPendingMutateUploadFile,
    mutateDeleteFile,
    isPendingMutateDeleteFile,

    handleUploadFile,
    handleDeleteFile,
  };
};

export default useMediaHandling;
