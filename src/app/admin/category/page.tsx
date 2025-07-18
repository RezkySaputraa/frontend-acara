import Category from "@/components/views/Admin/Category";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Category",
  description: "Rezky Saputra Acara",
};

const AdminCategoryPage = () => {
  return (
    <DashboardLayout
      type="admin"
      title={typeof metadata.title === "string" ? metadata.title : "Category"}
      description="List of all categories, create new category, and manage existing categories"
    >
      <Category></Category>
    </DashboardLayout>
  );
};

export default AdminCategoryPage;
