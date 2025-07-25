import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Skeleton } from "@heroui/skeleton";
import { Input } from "@heroui/input";
import { Spinner } from "@heroui/spinner";
import useLocationTab from "./useLocationTab";
import { Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { IEventForm, IRegency } from "@/types/Event";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Select, SelectItem } from "@heroui/select";

interface PropTypes {
  dataEvent: IEventForm;
  onUpdate: (data: IEventForm) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;

  isPendingDefaultRegion: boolean;
  dataDefaultRegion: string;
}

const LocationTab = (props: PropTypes) => {
  const {
    dataEvent,
    onUpdate,
    isPendingUpdate,
    isSuccessUpdate,
    isPendingDefaultRegion,
    dataDefaultRegion,
  } = props;

  const {
    controlUpdateLocation,
    handleSubmitUpdateLocation,
    errorsUpdateLocation,
    resetUpdateLocation,

    dataRegion,
    handleSearchRegion,
    searchRegency,
    setSearchRegency,
  } = useLocationTab();
  const [inputRegion, setInputRegion] = useState(dataDefaultRegion);

  useEffect(() => {
    if (dataEvent) {
      resetUpdateLocation({
        isOnline: `${dataEvent?.isOnline}`,
        address: `${dataEvent?.location?.address}`,
        latitude: `${dataEvent?.location?.coordinates[0]}`,
        longitude: `${dataEvent?.location?.coordinates[1]}`,
        region: `${dataEvent?.location?.region}`,
      });
    }
  }, [dataEvent, resetUpdateLocation]);

  useEffect(() => {
    if (dataDefaultRegion) {
      setSearchRegency("");
      setInputRegion(dataDefaultRegion);
    }
  }, [dataDefaultRegion]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateLocation();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Event Location</h1>
        <p className="w-full text-small text-default-400">
          Manage location of this event
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateLocation(onUpdate)}
        >
          <Skeleton
            isLoaded={!!dataEvent?.location?.address}
            className="rounded-lg"
          >
            <Controller
              name="address"
              control={controlUpdateLocation}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Address"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                  isInvalid={errorsUpdateLocation.address !== undefined}
                  errorMessage={errorsUpdateLocation.address?.message}
                ></Input>
              )}
            />
          </Skeleton>

          <Skeleton isLoaded={!!dataEvent} className="rounded-lg">
            {dataEvent ? (
              <Controller
                name="isOnline"
                control={controlUpdateLocation}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Online / Offline"
                    labelPlacement="outside"
                    variant="bordered"
                    isInvalid={errorsUpdateLocation.isOnline !== undefined}
                    errorMessage={errorsUpdateLocation.isOnline?.message}
                    defaultSelectedKeys={[
                      dataEvent?.isOnline ? "true" : "false",
                    ]}
                    disallowEmptySelection
                  >
                    <SelectItem key="true" textValue="Online">
                      Online
                    </SelectItem>
                    <SelectItem key="false" textValue="Offline">
                      Offline
                    </SelectItem>
                  </Select>
                )}
              />
            ) : (
              <div className="w-full h-16"></div>
            )}
          </Skeleton>

          <Skeleton
            isLoaded={!!dataEvent?.location?.coordinates[0]}
            className="rounded-lg"
          >
            <Controller
              name="latitude"
              control={controlUpdateLocation}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Latitude"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                  isInvalid={errorsUpdateLocation.latitude !== undefined}
                  errorMessage={errorsUpdateLocation.latitude?.message}
                ></Input>
              )}
            />
          </Skeleton>

          <Skeleton
            isLoaded={!!dataEvent?.location?.coordinates[1]}
            className="rounded-lg"
          >
            <Controller
              name="longitude"
              control={controlUpdateLocation}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Longitude"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                  isInvalid={errorsUpdateLocation.longitude !== undefined}
                  errorMessage={errorsUpdateLocation.longitude?.message}
                ></Input>
              )}
            />
          </Skeleton>

          <Skeleton
            isLoaded={!!dataEvent?.location?.region && !isPendingDefaultRegion}
            className="rounded-lg"
          >
            {!isPendingDefaultRegion && dataDefaultRegion ? (
              <Controller
                name="region"
                control={controlUpdateLocation}
                render={({ field: { onChange, ...field } }) => (
                  <Autocomplete
                    {...field}
                    items={
                      dataRegion?.data.data && searchRegency !== ""
                        ? dataRegion?.data.data
                        : []
                    }
                    label="City"
                    variant="bordered"
                    labelPlacement="outside"
                    inputValue={inputRegion}
                    onInputChange={(search) => {
                      setInputRegion(search);
                      handleSearchRegion(search);
                    }}
                    isInvalid={errorsUpdateLocation.region !== undefined}
                    errorMessage={errorsUpdateLocation.region?.message}
                    onBlur={() => {
                      if (!inputRegion) {
                        setInputRegion(dataDefaultRegion);
                      }
                    }}
                    onSelectionChange={(value) => onChange(value)}
                    placeholder="Select city here..."
                  >
                    {(regency: IRegency) => (
                      <AutocompleteItem key={`${regency.id}`}>
                        {regency.name}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                )}
              />
            ) : (
              <div className="w-full h-16"></div>
            )}
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

export default LocationTab;
