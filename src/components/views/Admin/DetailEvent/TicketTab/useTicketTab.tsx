import ticketServices from "@/services/ticket.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const useTicketTab = () => {
  const params = useParams();
  const id = params?.id as string;

  const getTicketsByEventId = async () => {
    try {
      const { data } = await ticketServices.getTicketsByEventId(id);
      return data.data;
    } catch (error) {
      throw error;
    }
  };
  const {
    data: dataTicket,
    refetch: refetchTicket,
    isPending: isPendingTicket,
    isRefetching: isRefetchingTicket,
  } = useQuery({
    queryKey: ["Ticket", id],
    queryFn: getTicketsByEventId,
    enabled: !!id,
  });

  return {
    dataTicket,
    refetchTicket,
    isPendingTicket,
    isRefetchingTicket,
  };
};

export default useTicketTab;
