import { ToasterContext } from "@/contexts/ToasterContext";
import ticketServices from "@/services/ticket.service";
import { ITicket } from "@/types/Ticket";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input name "),
  price: yup.string().required("Please input price "),
  quantity: yup.string().required("Please input quantity "),
  description: yup.string().required("Please input description "),
});

const useUpdateTicketModal = (id: string) => {
  const { setToaster } = useContext(ToasterContext);
  const params = useParams();
  const idEvent = params?.id as string;

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      price: "",
      quantity: "",
      description: "",
    },
  });

  const updateTicket = async (payload: ITicket) => {
    const res = await ticketServices.updateTicket(id, payload);
    return res;
  };

  const {
    mutate: mutateUpdateTicket,
    isPending: isPendingMutateUpdateTicket,
    isSuccess: isSuccessMutateUpdateTicket,
  } = useMutation({
    mutationFn: updateTicket,
    onError: (error) => {
      setToaster({ type: "error", message: error.message });
    },
    onSuccess: () => {
      setToaster({ type: "success", message: "Success update ticket" });
      reset();
    },
  });

  const handleUpdateTicket = (data: ITicket) => {
    data.events = idEvent;
    data.price = Number(data.price);
    data.quantity = Number(data.quantity);
    mutateUpdateTicket(data);
  };

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleUpdateTicket,
    isPendingMutateUpdateTicket,
    isSuccessMutateUpdateTicket,
  };
};

export default useUpdateTicketModal;
