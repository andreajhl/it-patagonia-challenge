import { Message } from "models";

export interface GetMessages {
  (): Promise<Message[]>;
}

export interface GetMessageByID {
  (id: string): Promise<Message | undefined>;
}

export interface CreateMessage {
  (_: any, formData: FormData): Promise<{ ok: boolean }>;
}

export interface UpdateMessage {
  (messageID: string, _: any, formData: FormData): Promise<{ ok: boolean }>;
}

export interface DeleteMessage {
  (messageID: number): Promise<{ ok: boolean }>;
}
