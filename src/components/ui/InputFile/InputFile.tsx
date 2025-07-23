import { cn } from "@/utils/cn";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import Image from "next/image";
import { ChangeEvent, ReactNode, useEffect, useId, useRef } from "react";
import { CiSaveUp2, CiTrash } from "react-icons/ci";

interface PropTypes {
  name: string;
  isDropable?: boolean;
  className?: string;
  onUpload?: (files: FileList) => void;
  onDelete?: () => void;
  isUploading?: boolean;
  isDeleting?: boolean;
  preview?: string;
  isInvalid?: boolean;
  errorMessage?: string;
  label?: ReactNode;
}

const InputFile = (props: PropTypes) => {
  const drop = useRef<HTMLLabelElement>(null);
  const dropzoneId = useId();
  const {
    name,
    className,
    isDropable = false,
    isInvalid,
    errorMessage,
    onUpload,
    onDelete,
    isUploading,
    isDeleting,
    preview,
    label,
  } = props;

  const handleDragOver = (e: DragEvent) => {
    if (isDropable) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer?.files;

    if (files && onUpload) {
      onUpload(files);
    }
  };

  useEffect(() => {
    const dropCurrent = drop.current;
    if (dropCurrent) {
      dropCurrent.addEventListener("dragover", handleDragOver);
      dropCurrent.addEventListener("drop", handleDrop);

      return () => {
        dropCurrent.removeEventListener("dragover", handleDragOver);
        dropCurrent.removeEventListener("drop", handleDrop);
      };
    }
  }, []);

  const handleOnUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && onUpload) {
      onUpload(files);
    }
  };

  return (
    <div>
      {label}
      <label
        ref={drop}
        htmlFor={`dropzone-file-${dropzoneId}`}
        className={cn(
          "flex min-h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100",
          className,
          { "border-danger-500": isInvalid },
        )}
      >
        {preview && (
          <div className="relative flex flex-col items-center justify-center p-5">
            <div className="w-1/2 mb-2">
              <Image
                fill
                src={preview}
                alt="image"
                className="!relative"
              ></Image>
            </div>
            <Button
              isIconOnly
              onPress={onDelete}
              disabled={isDeleting}
              className="absolute flex items-center justify-center rounded right-2 top-2 h-9 w-9 bg-danger-100"
            >
              {isDeleting ? (
                <Spinner size="sm" color="danger" />
              ) : (
                <CiTrash className="w-5 h-5 text-danger-500" />
              )}
            </Button>
          </div>
        )}

        {!preview && !isUploading && (
          <div className="flex flex-col items-center justify-center p-5">
            <CiSaveUp2 className="w-10 h-10 mb-2 text-gray-400" />
            <p className="text-sm font-semibold text-center text-gray-500">
              {isDropable
                ? "Drag and drop or click to upload file here"
                : "Click to upload file here"}
            </p>
          </div>
        )}

        {isUploading && (
          <div className="flex flex-col items-center justify-center p-5">
            <Spinner color="danger"></Spinner>
          </div>
        )}
        <input
          type="file"
          className="hidden"
          accept="image/*"
          id={`dropzone-file-${dropzoneId}`}
          onChange={handleOnUpload}
          name={name}
          disabled={preview !== ""}
          onClick={(e) => {
            e.currentTarget.value = "";
            e.target.dispatchEvent(new Event("change", { bubbles: true }));
          }}
        />
      </label>
      {isInvalid && (
        <p className="mt-2 text-sm text-danger-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputFile;
