import { Button } from "@heroui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acara | Home",
  description: "Rezky Saputra Acara",
};
export default function Page() {
  return (
    <div>
      <Button color="primary">Click me</Button>
    </div>
  );
}
