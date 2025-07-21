import { DELAY } from "@/constants/list.contants";
import { ToasterContext } from "@/contexts/ToasterContext";
import useDebounce from "@/hooks/useDebounce";
import useMediaHandling from "@/hooks/useMediaHandling";
import categoryServices from "@/services/category.service";
import eventServices from "@/services/event.service";
import { IEvent, IEventForm } from "@/types/Event";
import { toDateStandar } from "@/utils/date";
import { DateValue } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { getLocalTimeZone, now } from "@internationalized/date";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input name "),
  slug: yup.string().required("Please input slug "),
  category: yup.string().required("Please select category "),
  startDate: yup.mixed<DateValue>().required("Please select start date "),
  endDate: yup.mixed<DateValue>().required("Please select end date "),
  isPublished: yup.string().required("Please select status "),
  isFeatured: yup.string().required("Please select featured "),
  description: yup.string().required("Please select description "),
  isOnline: yup.string().required("Please select online or offline"),
  region: yup.string().required("Please select region "),
  longitude: yup.string().required("Please input longitude coordinate "),
  latitude: yup.string().required("Please input latitude coordinate"),
  banner: yup.mixed<FileList | string>().required("Please input banner "),
});

const useAddEventModal = () => {
  const { setToaster } = useContext(ToasterContext);
  const [searchRegency, setSearchRegency] = useState("");
  const debounce = useDebounce();

  const {
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
    handleDeleteFile,
    handleUploadFile,
  } = useMediaHandling();

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const preview = watch("banner");
  const fileUrl = getValues("banner");

  useEffect(() => {
    setValue("startDate", now(getLocalTimeZone()));
    setValue("endDate", now(getLocalTimeZone()));
  }, [setValue]);

  const addEvent = async (payload: IEvent) => {
    const res = await eventServices.addEvent(payload);
    return res;
  };

  const {
    mutate: mutateAddEvent,
    isPending: isPendingMutateAddEvent,
    isSuccess: isSuccessMutateAddEvent,
  } = useMutation({
    mutationFn: addEvent,
    onError: (error) => {
      setToaster({ type: "error", message: error.message });
    },
    onSuccess: () => {
      setToaster({ type: "success", message: "Add category success" });
      reset();
    },
  });

  const handleOnClose = (onClose: () => void) => {
    handleDeleteFile(fileUrl, () => {
      reset();
      onClose();
    });
  };

  const handleUploadBanner = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValue("banner", fileUrl);
      }
    });
  };

  const handleDeleteBanner = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  const handleAddEvent = (data: IEventForm) => {
    const payload = {
      ...data,
      isFeatured: data.isFeatured === "true",
      isPublished: data.isPublished === "true",
      isOnline: data.isOnline === "true",
      startDate: data.startDate ? toDateStandar(data.startDate) : '',
      endDate: data.endDate ? toDateStandar(data.endDate) : '',
      location: {
        region: `${data.region}`,
        coordinates: [Number(data.latitude), Number(data.longitude)],
      },
      banner: data.banner,
    };
    mutateAddEvent(payload);
  };

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
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddEvent,
    isPendingMutateAddEvent,
    isSuccessMutateAddEvent,
    preview,
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
    handleOnClose,
    handleUploadBanner,
    handleDeleteBanner,

    dataCategory,
    dataRegion,
    searchRegency,
    handleSearchRegion,
  };
};

export default useAddEventModal;
