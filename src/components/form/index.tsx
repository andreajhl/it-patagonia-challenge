"use client";

import {
  ChangeEvent,
  FC,
  FocusEvent,
  useActionState,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Input, Textarea } from "@components/ui";

import { useGlobalContext, useNotificationContext } from "context";
import { isEmptyText } from "@utils/validations";
import { getMessages } from "@actions/index";
import { useRouter } from "next/navigation";
import { FormProps } from "./index.d";

const defualtState = {
  title: "",
  content: "",
};

const Form: FC<FormProps> = ({ handleSubmit, initialState }) => {
  const router = useRouter();

  const { setMessages } = useGlobalContext();
  const { setNotification } = useNotificationContext();

  const [state, action, pending] = useActionState(handleSubmit, undefined);

  const [errorMessage, setErrorMessage] = useState("");
  const [messageData, setMessageData] = useState(initialState || defualtState);

  const isButtonDisabled = useMemo(
    () => messageData.title.length < 3 || !!errorMessage || pending,
    [messageData.title, errorMessage, pending],
  );

  const handleBlur = ({ target }: FocusEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setErrorMessage(isEmptyText(value) ? `Please enter a valid ${name}.` : "");
  };

  const handleFocus = () => setErrorMessage("");

  const handleChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = target;
    setMessageData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (!state) return;

    if (!state.ok) {
      setNotification({ type: "error", message: "Submission failed." });
      return;
    }

    getMessages().then((updateMessages) => setMessages(updateMessages));
    router.push("/");
  }, [state]);

  return (
    <form
      action={action}
      className="flex w-full flex-col items-center justify-between"
    >
      <Input
        required
        id="title"
        type="text"
        tabIndex={1}
        name="title"
        label="Title"
        minLength={3}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onChange={handleChange}
        value={messageData.title}
        errorMessage={errorMessage}
      />
      <Textarea
        rows={4}
        tabIndex={2}
        id="content"
        name="content"
        label="Content"
        onChange={handleChange}
        showErrorMessage={false}
        value={messageData.content}
      />
      <button
        tabIndex={3}
        type="submit"
        disabled={isButtonDisabled}
        className="btn-primary mt-4 w-full"
      >
        Save
      </button>
    </form>
  );
};

export default Form;
