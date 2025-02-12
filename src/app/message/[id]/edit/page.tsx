import { getMessageByID, getMessages } from "@actions/index";
import EditPage from "@components/pages/edit";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface EditProps {
  params: Promise<Record<string, string>>;
}

export const generateStaticParams = async () => {
  const messages = await getMessages();

  return messages.slice(0, 10).map(({ id }) => ({ messageId: String(id) }));
};

export const generateMetadata = async ({
  params,
}: EditProps): Promise<Metadata> => {
  const messageId = (await params).id;
  const message = await getMessageByID(messageId);

  return { title: message?.title || "message" };
};

export default async function Edit({ params }: EditProps) {
  const messageId = (await params).id;

  const message = await getMessageByID(messageId);

  if (!message) notFound();

  return <EditPage message={message} />;
}
