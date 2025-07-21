import { DELAY } from "@/constants/list.contants";
import useDebounce from "@/hooks/useDebounce";
import categoryServices from "@/services/category.service";
import eventServices from "@/services/event.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateLocation = yup.object().shape({
  isOnline: yup.string().required("Please select online or offline"),
  longitude: yup.string().required("Please input longitude coordinate "),
  latitude: yup.string().required("Please input latitude coordinate"),
  region: yup.string().required("Please select region "),
});

const useLocationTab = () => {
  const [searchRegency, setSearchRegency] = useState("");
  const debounce = useDebounce();
  const {
    control: controlUpdateLocation,
    handleSubmit: handleSubmitUpdateLocation,
    formState: { errors: errorsUpdateLocation },
    reset: resetUpdateLocation,
    setValue: setValueUpdateLocation,
  } = useForm({
    resolver: yupResolver(schemaUpdateLocation),
    defaultValues: {
      isOnline: "",
      longitude: "",
      latitude: "",
      region: "",
    },
  });

  const { data: dataCategory } = useQuery({
    queryKey: ["Categories"],
    queryFn: () => categoryServices.getCategories(),
    enabled: true,
  });

  const { data: dataRegion } = useQuery({
    queryKey: ["region", searchRegency],
    queryFn: () => eventServices.searchLocationByRegency(`${searchRegency}`),
    enabled: searchRegency !== "",
  });

  const handleSearchRegion = (region: string) => {
    debounce(() => setSearchRegency(region), DELAY);
  };

  return {
    dataCategory,
    controlUpdateLocation,
    handleSubmitUpdateLocation,
    errorsUpdateLocation,
    resetUpdateLocation,
    setValueUpdateLocation,

    searchRegency,
    handleSearchRegion,
    dataRegion,
  };
};

export default useLocationTab;
