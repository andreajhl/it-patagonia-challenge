import { createMessage } from "@actions/index";
import CreateForm from "@components/form";
import { FC } from "react";

const Create: FC = () => (
  <>
    <section className="flex w-full max-w-96 flex-col items-center gap-5 rounded-xl bg-white p-8 shadow-md">
      <h3 className="text-base font-bold text-blue-500 md:text-lg">
        Create new message
      </h3>
      <CreateForm handleSubmit={createMessage} />
    </section>
  </>
);

export default Create;
