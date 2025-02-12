import CreatePage from "@components/pages/create";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create",
};

export default function Create() {
  return <CreatePage />;
}
