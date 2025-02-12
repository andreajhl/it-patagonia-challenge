import { updateMessage } from "@actions/index";
import EditForm from "@components/form";
import { EditProps } from "./index.d";
import { FC } from "react";

const Edit: FC<EditProps> = async ({ message }) => {
  const updateMessageWithId = updateMessage.bind(null, message.id);

  return (
    <>
      <section className="flex w-full max-w-96 flex-col items-center gap-5 rounded-xl bg-white p-8 shadow-md">
        <h3 className="text-base font-bold text-blue-500 md:text-lg">
          Edit message {message.id}
        </h3>
        <EditForm
          handleSubmit={updateMessageWithId}
          initialState={{
            title: message.title,
            content: message.content || "",
          }}
        />
      </section>
    </>
  );
};

export default Edit;
