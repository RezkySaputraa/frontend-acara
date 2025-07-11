import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Rezky Saputra Acara",
};

export default function DashboardMemberLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout
      type="member"
      title={typeof metadata.title === "string" ? metadata.title : "Dashboard"}
      description="Dashboard Member"
    >
      {children}
    </DashboardLayout>
  );
}
