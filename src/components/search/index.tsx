"use client";

import { ChangeEvent, FC, useDeferredValue, useEffect, useState } from "react";
import { getMessages } from "@actions/index";
import { useGlobalContext } from "context";
import { Input } from "@components/ui";

const Search: FC = () => {
  const { allMessages, setFilteredMessages } = useGlobalContext();

  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearch = useDeferredValue(searchQuery);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase().trim());
  };

  const resetSearch = async () => {
    const messages = await getMessages();
    setFilteredMessages(messages);
  };

  useEffect(() => {
    if (!deferredSearch) {
      resetSearch();
      return;
    }

    const timeoutId = setTimeout(() => {
      const filteredMessages = allMessages.filter(({ title }) =>
        title.toLowerCase().includes(deferredSearch),
      );

      setFilteredMessages(filteredMessages);
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [deferredSearch]);

  return (
    <Input
      id="search"
      type="text"
      name="search"
      value={searchQuery}
      aria-label="Search message"
      placeholder="Search message..."
      showErrorMessage={false}
      onChange={handleSearchChange}
      action={{
        iconClass: "fa-solid fa-magnifying-glass",
      }}
    />
  );
};

export default Search;
