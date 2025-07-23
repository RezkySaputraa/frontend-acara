import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateInfo = yup.object().shape({
  name: yup.string().required("Please input name"),
  description: yup.string().required("Please input description"),
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
    },
  });

  return {
    controlUpdateInfo,
    handleSubmitUpdateInfo,
    errorsUpdateInfo,
    resetUpdateInfo,
  };
};

export default useInfoTab;
