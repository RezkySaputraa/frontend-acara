import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailEvent from "@/components/views/Admin/DetailEvent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Detail Event",
  description: "Rezky Saputra Acara",
};

const AdminDetailEventPage = () => {
  return (
    <DashboardLayout
      type="admin"
      title={
        typeof metadata.title === "string" ? metadata.title : "Detail Event"
      }
      description="Manage information for this event"
    >
      <DetailEvent />
    </DashboardLayout>
  );
};

export default AdminDetailEventPage;
