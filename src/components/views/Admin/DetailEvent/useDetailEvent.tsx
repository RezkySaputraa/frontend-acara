"use client";

import { ToasterContext } from "@/contexts/ToasterContext";
import eventServices from "@/services/event.service";
import { IEvent, IEventForm } from "@/types/Event";
import { toDateStandard } from "@/utils/date";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useContext } from "react";

const useDetailEvent = () => {
  const params = useParams();
  const id = params?.id as string;
  const { setToaster } = useContext(ToasterContext);

  const getEventById = async () => {
    try {
      const { data } = await eventServices.getEventById(id);
      return data.data;
    } catch (error) {
      throw error;
    }
  };

  const { data: dataEvent, refetch: refetchEvent } = useQuery({
    queryKey: ["Event", id],
    queryFn: getEventById,
    enabled: !!id,
  });

  const updateEvent = async (payload: IEvent) => {
    const { data } = await eventServices.updateEvent(id, payload);
    return data.data;
  };

  const {
    mutate: mutateUpdateEvent,
    isPending: isPendingMutateUpdateEvent,
    isSuccess: isSuccessMutateUpdateEvent,
  } = useMutation({
    mutationFn: (payload: IEvent) => updateEvent(payload),
    onError: (error) => {
      setToaster({ type: "error", message: error.message });
    },
    onSuccess: () => {
      refetchEvent();
      setToaster({ type: "success", message: "Success update event" });
    },
  });

  const handleUpdateInfo = (data: IEventForm) => {
    const payload = {
      ...data,
      isFeatured: data.isFeatured === "true",
      isPublish: data.isPublish === "true",
      startDate: data.startDate ? toDateStandard(data.startDate) : "",
      endDate: data.endDate ? toDateStandard(data.endDate) : "",
    };
    mutateUpdateEvent(payload);
  };

  const handleUpdateEvent = (data: IEvent) => {
    mutateUpdateEvent(data);
  };

  const handleUpdateLocation = (data: IEventForm) => {
    const payload = {
      isOnline: data.isOnline === "true",
      location: {
        address: `${data.address}`,
        region: `${data.region}`,
        coordinates: [Number(data.latitude), Number(data.longitude)],
      },
    };
    mutateUpdateEvent(payload);
  };

  const { data: dataDefaultRegion, isPending: isPendingDefaultRegion } =
    useQuery({
      queryKey: ["defaultRegion", dataEvent],
      queryFn: () => eventServices.getRegencyById(dataEvent?.location?.region),
      enabled: !!dataEvent?.location?.region,
    });

  return {
    dataEvent,
    handleUpdateInfo,
    handleUpdateEvent,
    isPendingMutateUpdateEvent,
    isSuccessMutateUpdateEvent,
    handleUpdateLocation,

    dataDefaultRegion,
    isPendingDefaultRegion,
  };
};

export default useDetailEvent;
