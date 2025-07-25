"use client";

import DataTable from "@/components/ui/DataTable";
import Image from "next/image";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { COLUMN_LISTS_EVENT } from "./Event.constants";
import useEvent from "./useEvent";
import { useSearchParams } from "next/navigation";
import { useDisclosure } from "@heroui/use-disclosure";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";
import { Chip } from "@heroui/chip";
import AddEventModal from "./AddEventModal";
import DeleteEventModal from "./DeleteEventModal";

const Event = () => {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const {
    dataEvents,
    isLoadingEvents,
    isRefetchingEvents,

    refetchEvents,
    selectedId,
    setSelectedId,
  } = useEvent();

  const addEventModal = useDisclosure();
  const deleteEventModal = useDisclosure();

  const { setUrl } = useChangeUrl();

  useEffect(() => {
    setUrl();
  }, []);

  const renderCell = useCallback(
    (event: Record<string, unknown>, columnKey: Key) => {
      const cellValue = event[columnKey as keyof typeof event];

      switch (columnKey) {
        case "banner":
          return (
            <Image
              className="object-cover rounded-lg aspect-video w-36"
              src={`${cellValue}`}
              alt="icon"
              width={200}
              height={100}
            />
          );
        case "isPublish":
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
              onPressButtonDetail={() => push(`/admin/event/${event._id}`)}
              onPressButtonDelete={() => {
                setSelectedId(`${event._id}`);
                deleteEventModal.onOpen();
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
          buttonTopContentLabel="Create Event"
          columns={COLUMN_LISTS_EVENT}
          data={dataEvents?.data || []}
          emptyContent="Event is empty"
          isLoading={isLoadingEvents || isRefetchingEvents}
          onClickButtonTopContent={addEventModal.onOpen}
          renderCell={renderCell}
          totalPage={dataEvents?.pagination.totalPage}
        />
      )}

      <AddEventModal {...addEventModal} refetchEvents={refetchEvents} />

      <DeleteEventModal
        {...deleteEventModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchEvents={refetchEvents}
      />
    </section>
  );
};

export default Event;
