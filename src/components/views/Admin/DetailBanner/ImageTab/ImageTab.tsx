import InputFile from "@/components/ui/InputFile";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Skeleton } from "@heroui/skeleton";
import Image from "next/image";
import useImageTab from "./useImageTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { Spinner } from "@heroui/spinner";
import { IBanner } from "@/types/Banner";

interface PropTypes {
  currentImage: string;
  onUpdate: (data: IBanner) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const ImageTab = (props: PropTypes) => {
  const { currentImage, onUpdate, isPendingUpdate, isSuccessUpdate } = props;

  const {
    handleDeleteImage,
    handleUploadImage,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,

    controlUpdateImage,
    errorsUpdateImage,
    handleSubmitUpdateImage,
    resetUpdateImage,

    preview,
  } = useImageTab();

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateImage();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Banner Image</h1>
        <p className="w-full text-small text-default-400">
          Manage image of this banner
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateImage(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">
              Current Image
            </p>
            <Skeleton
              isLoaded={!!currentImage}
              className="h-32 rounded-lg"
            >
              {currentImage && (
                <Image
                  src={currentImage}
                  alt="image"
                  fill
                  className="!relative rounded-lg"
                />
              )}
            </Skeleton>
          </div>
          <Controller
            name="image"
            control={controlUpdateImage}
            render={({ field: { onChange, ...field } }) => (
              <InputFile
                {...field}
                onUpload={(files) => handleUploadImage(files, onChange)}
                isUploading={isPendingMutateUploadFile}
                isDeleting={isPendingMutateDeleteFile}
                onDelete={() => handleDeleteImage(onChange)}
                isInvalid={errorsUpdateImage.image !== undefined}
                errorMessage={errorsUpdateImage.image?.message}
                isDropable
                label={
                  <p className="mb-2 text-sm font-medium text-default-700">
                    Upload new image
                  </p>
                }
                preview={typeof preview === "string" ? preview : ""}
              ></InputFile>
            )}
          />
          <Button
            color="danger"
            className="mt-2 disabled:bg-default-500"
            type="submit"
            disabled={isPendingMutateUploadFile || isPendingUpdate || !preview}
          >
            {isPendingUpdate ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default ImageTab;
