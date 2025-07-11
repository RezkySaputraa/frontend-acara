import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Rezky Saputra Acara",
};

export default function DashboardAdminLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout
      type="admin"
      title={typeof metadata.title === "string" ? metadata.title : "Dashboard"}
      description="Dashboard Admin"
    >
      {children}
    </DashboardLayout>
  );
}
