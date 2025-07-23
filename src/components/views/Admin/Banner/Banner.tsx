"use client";

import DataTable from "@/components/ui/DataTable";
import Image from "next/image";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { COLUMN_LISTS_BANNER } from "./Banner.constants";
import useBanner from "./useBanner";
import { useSearchParams } from "next/navigation";
import { useDisclosure } from "@heroui/use-disclosure";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";
import { Chip } from "@heroui/chip";

const Banner = () => {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const {
    dataBanners,
    isLoadingBanners,
    isRefetchingBanners,

    refetchBanners,
    selectedId,
    setSelectedId,
  } = useBanner();

  const addBannerModal = useDisclosure();
  const deleteBannerModal = useDisclosure();
  const { setUrl } = useChangeUrl();

  useEffect(() => {
    setUrl();
  }, []);

  const renderCell = useCallback(
    (banner: Record<string, unknown>, columnKey: Key) => {
      const cellValue = banner[columnKey as keyof typeof banner];

      switch (columnKey) {
        case "image":
          return (
            <Image src={`${cellValue}`} alt="image" width={300} height={200} />
          );
        case "isShow":
          return (
            <Chip
              color={cellValue ? "success" : "warning"}
              size="sm"
              variant="flat"
            >
              {cellValue === true ? "Published" : "Not published"}
            </Chip>
          );
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() => push(`/admin/banner/${banner._id}`)}
              onPressButtonDelete={() => {
                setSelectedId(`${banner._id}`);
                deleteBannerModal.onOpen();
              }}
            ></DropdownAction>
          );

        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  return (
    <section>
      {Array.from(searchParams.entries()).length > 0 && (
        <DataTable
          buttonTopContentLabel="Create Banner"
          columns={COLUMN_LISTS_BANNER}
          data={dataBanners?.data || []}
          emptyContent="Banner is empty"
          isLoading={isLoadingBanners || isRefetchingBanners}
          onClickButtonTopContent={addBannerModal.onOpen}
          renderCell={renderCell}
          totalPage={dataBanners?.pagination.totalPage}
        />
      )}
    </section>
  );
};

export default Banner;
