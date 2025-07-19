import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Metadata } from "next";
import Event from "@/components/views/Admin/Event";

export const metadata: Metadata = {
  title: "Event",
  description: "Rezky Saputra Acara",
};

const AdminEventPage = () => {
  return (
    <DashboardLayout
      type="admin"
      title={typeof metadata.title === "string" ? metadata.title : "Event"}
      description="List of all events, create new event, and manage existing events"
    >
      <Event></Event>
    </DashboardLayout>
  );
};

export default AdminEventPage;
