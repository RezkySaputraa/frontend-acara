import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Category",
  description: "Rezky Saputra Acara",
};

export default function AdminCategoryLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout
      type="admin"
      title={typeof metadata.title === "string" ? metadata.title : "Category"}
      description="List of all categories, create new category, and manage existing categories"
    >
      {children}
    </DashboardLayout>
  );
}
