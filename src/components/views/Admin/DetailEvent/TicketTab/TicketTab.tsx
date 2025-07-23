import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/use-disclosure";
import { convertIDR } from "@/utils/currency";
import { Fragment, Key, ReactNode, useCallback, useState } from "react";
import DropdownAction from "@/components/commons/DropdownAction";
import DataTable from "@/components/ui/DataTable";
import { COLUMN_LISTS_TICKET } from "./TicketTab.constants";
import useTicketTab from "./useTicketTab";
import AddTicketModal from "./AddTicketModal";
import DeleteTicketModal from "./DeleteTicketModal";
import { ITicket } from "@/types/Ticket";
import UpdateTicketModal from "./UpdateTicketModal";

const TicketTab = () => {
  const { dataTicket, refetchTicket, isPendingTicket, isRefetchingTicket } =
    useTicketTab();
  const addTicketModal = useDisclosure();
  const deleteTicketModal = useDisclosure();
  const updateTicketModal = useDisclosure();

  const [selectedDataTicket, setSelectedDataTicket] = useState<ITicket | null>(
    null,
  );

  const renderCell = useCallback(
    (ticket: Record<string, unknown>, columnKey: Key) => {
      const cellValue = ticket[columnKey as keyof typeof ticket];

      switch (columnKey) {
        case "price":
          return `${convertIDR(cellValue as number)}`;

        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() => {
                setSelectedDataTicket(ticket as ITicket);
                updateTicketModal.onOpen();
              }}
              onPressButtonDelete={() => {
                setSelectedDataTicket(ticket as ITicket);
                deleteTicketModal.onOpen();
              }}
            ></DropdownAction>
          );

        default:
          return cellValue as ReactNode;
      }
    },
    [],
  );

  return (
    <Fragment>
      <Card className="w-full p-4">
        <CardHeader className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <h1 className="w-full text-xl font-bold">Ticket Location</h1>
            <p className="w-full text-small text-default-400">
              Manage ticket of this event
            </p>
          </div>
          <Button color="danger" onPress={addTicketModal.onOpen}>
            Add new ticket
          </Button>
        </CardHeader>
        <CardBody className="pt-0">
          <DataTable
            columns={COLUMN_LISTS_TICKET}
            data={dataTicket || []}
            emptyContent="Ticket is empty"
            isLoading={isPendingTicket || isRefetchingTicket}
            renderCell={renderCell}
            showLimit={false}
            showSearch={false}
            totalPage={1}
          />
        </CardBody>
      </Card>
      <AddTicketModal {...addTicketModal} refetchTicket={refetchTicket} />

      <DeleteTicketModal
        {...deleteTicketModal}
        selectedDataTicket={selectedDataTicket}
        setSelectedDataTicket={setSelectedDataTicket}
        refetchTicket={refetchTicket}
      />

      <UpdateTicketModal
        {...updateTicketModal}
        selectedDataTicket={selectedDataTicket}
        setSelectedDataTicket={setSelectedDataTicket}
        refetchTicket={refetchTicket}
      />
    </Fragment>
  );
};

export default TicketTab;
