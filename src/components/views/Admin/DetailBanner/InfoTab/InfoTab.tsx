import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Skeleton } from "@heroui/skeleton";
import { Input } from "@heroui/input";
import { Spinner } from "@heroui/spinner";
import useInfoTab from "./useInfoTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IBanner } from "@/types/Banner";
import { Select, SelectItem } from "@heroui/select";

interface PropTypes {
  dataBanner: IBanner;
  onUpdate: (data: IBanner) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
  const { dataBanner, onUpdate, isPendingUpdate, isSuccessUpdate } = props;

  const {
    controlUpdateInfo,
    handleSubmitUpdateInfo,
    errorsUpdateInfo,
    resetUpdateInfo,
  } = useInfoTab();

  useEffect(() => {
    if (dataBanner) {
      resetUpdateInfo({
        title: `${dataBanner.title}`,
        isShow: `${dataBanner.isShow}`,
      });
    }
  }, [dataBanner, resetUpdateInfo]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateInfo();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Banner Information</h1>
        <p className="w-full text-small text-default-400">
          Manage information of this banner
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          <Skeleton isLoaded={!!dataBanner?.title} className="rounded-lg">
            <Controller
              name="title"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Title"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                  isInvalid={errorsUpdateInfo.title !== undefined}
                  errorMessage={errorsUpdateInfo.title?.message}
                  className="mt-2"
                ></Input>
              )}
            />
          </Skeleton>

          <Skeleton isLoaded={!!dataBanner} className="rounded-lg">
            <Controller
              name="isShow"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Status"
                  variant="bordered"
                  labelPlacement="outside"
                  isInvalid={errorsUpdateInfo.isShow !== undefined}
                  errorMessage={errorsUpdateInfo.isShow?.message}
                  defaultSelectedKeys={[dataBanner?.isShow ? "true" : "false"]}
                  disallowEmptySelection
                >
                  <SelectItem key="true" textValue="Show">
                    Show
                  </SelectItem>
                  <SelectItem key="false" textValue="Hide">
                    Hide
                  </SelectItem>
                </Select>
              )}
            />
          </Skeleton>

          <Button
            color="danger"
            className="mt-2 disabled:bg-default-500"
            type="submit"
            disabled={isPendingUpdate || !dataBanner?._id}
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

export default InfoTab;
