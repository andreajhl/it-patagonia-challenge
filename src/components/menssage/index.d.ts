import { Message } from "models";

export interface MessageProps extends Message {
  handleRemove: (id: number) => void;
}
