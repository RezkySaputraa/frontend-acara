import Banner from "@/components/views/Admin/Banner";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Banner",
  description: "Rezky Saputra Acara",
};

const AdminBannerPage = () => {
  return (
    <DashboardLayout
      type="admin"
      title={typeof metadata.title === "string" ? metadata.title : "Banner"}
      description="List of all banners, create new banner, and manage existing banners"
    >
      <Suspense>
        <Banner></Banner>
      </Suspense>
    </DashboardLayout>
  );
};

export default AdminBannerPage;
