"use client";

import { MessageProps } from "./index.d";
import { FC, useCallback } from "react";
import Link from "next/link";

const Message: FC<MessageProps> = ({ id, title, content, handleRemove }) => {
  const handleDelete = useCallback(() => handleRemove(id), [handleRemove, id]);

  return (
    <article className="flex h-full w-full flex-col items-center gap-3 rounded-md px-6 py-4 shadow-md">
      <header className="flex w-full items-center justify-between">
        <h4 className="text-sm font-bold md:text-base">{title}</h4>
        <nav className="flex items-center gap-4">
          <Link
            href={`/message/${id}/edit`}
            aria-label={`Edit message: ${title}`}
            className="hover:text-blue-600"
          >
            <i className="fa-regular fa-pen-to-square" />
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            aria-label={`Remove message: ${title}`}
            className="hover:text-red-600"
          >
            <i className="fa-solid fa-trash-can" />
          </button>
        </nav>
      </header>
      <section className="line-clamp-2 w-full text-sm text-gray-600 md:text-sm">
        {content}
      </section>
    </article>
  );
};

export default Message;
