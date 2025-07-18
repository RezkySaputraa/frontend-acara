import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailCategory from "@/components/views/Admin/DetailCategory";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Detail Category",
  description: "Rezky Saputra Acara",
};

const AdminDetailCategoryPage = () => {
  return (
    <DashboardLayout
      type="admin"
      title={
        typeof metadata.title === "string" ? metadata.title : "Detail Category"
      }
      description="Manage information for this category"
    >
      <DetailCategory />
    </DashboardLayout>
  );
};

export default AdminDetailCategoryPage;
