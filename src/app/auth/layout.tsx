import AuthLayout from "@/components/layouts/AuthLayout";

export default function AuthLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-w-full min-h-screen gap-10 py-10 antialiased lg:py-0">
      <AuthLayout>{children}</AuthLayout>
    </div>
  );
}
