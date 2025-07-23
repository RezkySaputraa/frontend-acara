import categoryServices from "@/services/category.service";
import { DateValue } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { getLocalTimeZone, now } from "@internationalized/date";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateInfo = yup.object().shape({
  name: yup.string().required("Please input name"),
  description: yup.string().required("Please input description"),
  slug: yup.string().required("Please input slug "),
  category: yup.string().required("Please select category "),
  startDate: yup.mixed<DateValue>().required("Please select start date "),
  endDate: yup.mixed<DateValue>().required("Please select end date "),
  isPublish: yup.string().required("Please select status "),
  isFeatured: yup.string().required("Please select featured "),
});

const useInfoTab = () => {
  const {
    control: controlUpdateInfo,
    handleSubmit: handleSubmitUpdateInfo,
    formState: { errors: errorsUpdateInfo },
    reset: resetUpdateInfo,
  } = useForm({
    resolver: yupResolver(schemaUpdateInfo),
    defaultValues: {
      name: "",
      description: "",
      slug: "",
      category: "",
      startDate: now(getLocalTimeZone()),
      endDate: now(getLocalTimeZone()),
      isPublish: "",
      isFeatured: "",
    },
  });

  const { data: dataCategory } = useQuery({
    queryKey: ["Categories"],
    queryFn: () => categoryServices.getCategories(),
    enabled: true,
  });

  return {
    dataCategory,
    controlUpdateInfo,
    handleSubmitUpdateInfo,
    errorsUpdateInfo,
    resetUpdateInfo,
  };
};

export default useInfoTab;
