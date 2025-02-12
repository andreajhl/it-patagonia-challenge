"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  FC,
  useEffect,
} from "react";
import { Message } from "models";

interface GlobalContextProps {
  allMessages: Message[];
  setAllMessages: Dispatch<SetStateAction<Message[]>>;
  filteredMessages: Message[];
  setFilteredMessages: Dispatch<SetStateAction<Message[]>>;
}

interface GlobalProviderProps {
  children: ReactNode;
  initialData: Message[];
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider: FC<GlobalProviderProps> = ({
  children,
  initialData,
}) => {
  const [allMessages, setAllMessages] = useState(initialData);
  const [filteredMessages, setFilteredMessages] = useState(initialData);

  useEffect(() => {
    setFilteredMessages(allMessages);
  }, [allMessages]);

  return (
    <GlobalContext.Provider
      value={{
        allMessages,
        setAllMessages,
        filteredMessages,
        setFilteredMessages,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextProps => {
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error(
      "useNotificationContext must be used within a GlobalProvider",
    );

  return context;
};
