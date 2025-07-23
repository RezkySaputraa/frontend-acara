import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Skeleton } from "@heroui/skeleton";
import { Input, Textarea } from "@heroui/input";
import { Spinner } from "@heroui/spinner";
import useInfoTab from "./useInfoTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IEventForm } from "@/types/Event";
import { Select, SelectItem } from "@heroui/select";
import { DatePicker } from "@heroui/date-picker";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { ICategory } from "@/types/Category";
import { toInputDate } from "@/utils/date";

interface PropTypes {
  dataEvent: IEventForm;
  onUpdate: (data: IEventForm) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
  const { dataEvent, onUpdate, isPendingUpdate, isSuccessUpdate } = props;

  const {
    controlUpdateInfo,
    handleSubmitUpdateInfo,
    errorsUpdateInfo,
    resetUpdateInfo,
    dataCategory,
  } = useInfoTab();

  useEffect(() => {
    if (dataEvent) {
      resetUpdateInfo({
        name: dataEvent?.name,
        description: dataEvent?.description,
        slug: dataEvent?.slug,
        category: dataEvent?.category,
        startDate: toInputDate(`${dataEvent?.startDate}`),
        endDate: toInputDate(`${dataEvent?.endDate}`),
        isPublish: `${dataEvent?.isPublish}`,
        isFeatured: `${dataEvent?.isFeatured}`,
      });
    }
  }, [dataEvent, resetUpdateInfo]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateInfo();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Event Information</h1>
        <p className="w-full text-small text-default-400">
          Manage information of this event
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          <Skeleton isLoaded={!!dataEvent?.name} className="rounded-lg">
            <Controller
              name="name"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Name"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                  isInvalid={errorsUpdateInfo.name !== undefined}
                  errorMessage={errorsUpdateInfo.name?.message}
                ></Input>
              )}
            />
          </Skeleton>

          <Skeleton isLoaded={!!dataEvent?.slug} className="rounded-lg">
            <Controller
              name="slug"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Slug"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                  isInvalid={errorsUpdateInfo.slug !== undefined}
                  errorMessage={errorsUpdateInfo.slug?.message}
                ></Input>
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataEvent?.category} className="rounded-lg">
            {dataEvent?.category ? (
              <Controller
                name="category"
                control={controlUpdateInfo}
                render={({ field: { onChange, ...field } }) => (
                  <Autocomplete
                    {...field}
                    defaultItems={dataCategory?.data.data || []}
                    label="Category"
                    variant="bordered"
                    labelPlacement="outside"
                    defaultSelectedKey={dataEvent?.category}
                    isInvalid={errorsUpdateInfo.category !== undefined}
                    errorMessage={errorsUpdateInfo.category?.message}
                    onSelectionChange={(value) => onChange(value)}
                    placeholder="Select category here..."
                  >
                    {(category: ICategory) => (
                      <AutocompleteItem key={`${category._id}`}>
                        {category.name}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                )}
              />
            ) : (
              <div className="w-full h-16"></div>
            )}
          </Skeleton>

          <Skeleton isLoaded={!!dataEvent?.startDate} className="rounded-lg">
            <Controller
              name="startDate"
              control={controlUpdateInfo}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Start Date"
                  labelPlacement="outside"
                  variant="bordered"
                  hideTimeZone
                  showMonthAndYearPickers
                  isInvalid={errorsUpdateInfo.startDate !== undefined}
                  errorMessage={errorsUpdateInfo.startDate?.message}
                ></DatePicker>
              )}
            />
          </Skeleton>

          <Skeleton isLoaded={!!dataEvent?.endDate} className="rounded-lg">
            <Controller
              name="endDate"
              control={controlUpdateInfo}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="End Date"
                  variant="bordered"
                  labelPlacement="outside"
                  hideTimeZone
                  showMonthAndYearPickers
                  isInvalid={errorsUpdateInfo.endDate !== undefined}
                  errorMessage={errorsUpdateInfo.endDate?.message}
                ></DatePicker>
              )}
            />
          </Skeleton>

          <Skeleton isLoaded={!!dataEvent} className="rounded-lg">
            {dataEvent ? (
              <Controller
                name="isPublish"
                control={controlUpdateInfo}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Status"
                    variant="bordered"
                    labelPlacement="outside"
                    isInvalid={errorsUpdateInfo.isPublish !== undefined}
                    errorMessage={errorsUpdateInfo.isPublish?.message}
                    defaultSelectedKeys={[
                      dataEvent?.isPublish ? "true" : "false",
                    ]}
                    disallowEmptySelection
                  >
                    <SelectItem key="true" textValue="Publish">
                      Publish
                    </SelectItem>
                    <SelectItem key="false" textValue="Draft">
                      Draft
                    </SelectItem>
                  </Select>
                )}
              />
            ) : (
              <div className="w-full h-16"></div>
            )}
          </Skeleton>

          <Skeleton isLoaded={!!dataEvent} className="rounded-lg">
            {dataEvent ? (
              <Controller
                name="isFeatured"
                control={controlUpdateInfo}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Featured"
                    variant="bordered"
                    labelPlacement="outside"
                    isInvalid={errorsUpdateInfo.isFeatured !== undefined}
                    errorMessage={errorsUpdateInfo.isFeatured?.message}
                    defaultSelectedKeys={[
                      dataEvent?.isFeatured ? "true" : "false",
                    ]}
                    disallowEmptySelection
                  >
                    <SelectItem key="true" textValue="Yes">
                      Yes
                    </SelectItem>
                    <SelectItem key="false" textValue="No">
                      No
                    </SelectItem>
                  </Select>
                )}
              />
            ) : (
              <div className="w-full h-16"></div>
            )}
          </Skeleton>

          <Skeleton isLoaded={!!dataEvent?.description} className="rounded-lg">
            <Controller
              name="description"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Description"
                  variant="bordered"
                  labelPlacement="outside"
                  isInvalid={errorsUpdateInfo.description !== undefined}
                  errorMessage={errorsUpdateInfo.description?.message}
                ></Textarea>
              )}
            />
          </Skeleton>

          <Button
            color="danger"
            className="mt-2 disabled:bg-default-500"
            type="submit"
            disabled={isPendingUpdate || !dataEvent?._id}
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
