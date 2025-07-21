import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Metadata } from "next";
import Event from "@/components/views/Admin/Event";
import { Suspense } from "react";

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
      <Suspense>
        <Event></Event>
      </Suspense>
    </DashboardLayout>
  );
};

export default AdminEventPage;
