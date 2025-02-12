"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  FC,
} from "react";
import { Message } from "models";

interface GlobalContextProps {
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
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
  const [messages, setMessages] = useState<Message[]>(initialData);

  return (
    <GlobalContext.Provider value={{ messages, setMessages }}>
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
