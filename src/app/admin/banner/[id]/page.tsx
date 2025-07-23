import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailBanner from "@/components/views/Admin/DetailBanner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Detail Banner",
  description: "Rezky Saputra Acara",
};

const AdminDetailBannerPage = () => {
  return (
    <DashboardLayout
      type="admin"
      title={
        typeof metadata.title === "string" ? metadata.title : "Detail Banner"
      }
      description="Manage information for this banner"
    >
      <DetailBanner />
    </DashboardLayout>
  );
};

export default AdminDetailBannerPage;
