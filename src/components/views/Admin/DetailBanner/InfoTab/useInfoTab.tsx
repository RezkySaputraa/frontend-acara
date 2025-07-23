import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateInfo = yup.object().shape({
  title: yup.string().required("Please input title"),
  isShow: yup.string().required("Please select show status"),
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
      title: "",
      isShow: "",
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
