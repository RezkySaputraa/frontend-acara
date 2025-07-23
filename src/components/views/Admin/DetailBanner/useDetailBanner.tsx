"use client";

import { ToasterContext } from "@/contexts/ToasterContext";
import bannerServices from "@/services/banner.service";
import { IBanner } from "@/types/Banner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useContext } from "react";

const useDetailBanner = () => {
  const params = useParams();
  const id = params?.id as string;
  const { setToaster } = useContext(ToasterContext);

  const getBannerById = async () => {
    try {
      const { data } = await bannerServices.getBannerById(id);
      return data.data;
    } catch (error) {
      throw error;
    }
  };
  const { data: dataBanner, refetch: refetchBanner } = useQuery({
    queryKey: ["Banner", id],
    queryFn: getBannerById,
    enabled: !!id,
  });

  const updateBanner = async (payload: IBanner) => {
    const { data } = await bannerServices.updateBanner(id, payload);
    return data.data;
  };

  const {
    mutate: mutateUpdateBanner,
    isPending: isPendingMutateUpdateBanner,
    isSuccess: isSuccessMutateUpdateBanner,
  } = useMutation({
    mutationFn: (payload: IBanner) => updateBanner(payload),
    onError: (error) => {
      setToaster({ type: "error", message: error.message });
    },
    onSuccess: () => {
      refetchBanner();
      setToaster({ type: "success", message: "Success update banner" });
    },
  });

  const handleUpdateBanner = (data: IBanner) => mutateUpdateBanner(data);

  return {
    dataBanner,
    handleUpdateBanner,
    isPendingMutateUpdateBanner,
    isSuccessMutateUpdateBanner,
  };
};

export default useDetailBanner;
