import Activation from "@/components/views/Auth/Activation";
import authServices from "@/services/auth.service";

type Status = "success" | "failed";

export default async function ActivationPage({
  searchParams,
}: {
  searchParams: { code: string };
}) {
  const { code } = await searchParams;
  let status: Status = "success";
  try {
    const result = await authServices.activation({ code });
    if (result.data.data) {
      status = "success";
    } else {
      status = "failed";
    }
  } catch (error) {
    console.log(" Activation API error:", error);
    status = "failed";
  }

  return <Activation status={status} />;
}
