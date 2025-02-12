"use client";

import { deleteMessage, getMessages } from "@actions/index";
import Message from "@components/menssage";
import { useGlobalContext } from "context";
import Link from "next/link";
import { FC } from "react";

const Home: FC = () => {
  const { messages, setMessages } = useGlobalContext();

  const updateMessages = async () => {
    const data = await getMessages();
    setMessages(data);
  };

  const handleRemove = async (id: number) => {
    await deleteMessage(id);
    await updateMessages();
  };

  return (
    <section className="w-full" aria-labelledby="band-genre-section">
      <div className="flex items-center justify-between gap-2 border-b-2 border-gray-300">
        <h3
          id="band-genre-section"
          className="w-auto text-sm font-bold capitalize text-blue-600 md:text-base lg:text-lg"
        >
          Messages
        </h3>
        <Link
          href="/message/create"
          aria-label="Go to create message"
          className="flex items-center gap-1 text-xs text-gray-400 md:text-sm lg:text-base"
        >
          Add message
        </Link>
      </div>
      <ul className="mt-4 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {messages.map((message) => (
          <li key={message.id} className="h-full w-full">
            <Message {...message} handleRemove={handleRemove} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Home;
