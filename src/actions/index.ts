"use server";

import {
  CreateMessage,
  GetMessages,
  DeleteMessage,
  UpdateMessage,
  GetMessageByID,
} from "./index.d";
import { createCustomError } from "@utils/errors";
import prisma from "@lib/prisma";

export const getMessages: GetMessages = async () => {
  try {
    return await prisma.message.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.log("Error fetch messages: ", error);
    return [];
  }
};

export const getMessageByID: GetMessageByID = async (messageID) => {
  try {
    const message = await prisma.message.findUnique({
      where: {
        id: Number(messageID),
      },
    });

    if (!message) throw createCustomError("message not found", 404);

    return message;
  } catch (error) {
    console.log(`Error fetch message ${messageID} `, error);
    return;
  }
};

export const createMessage: CreateMessage = async (_, formData) => {
  try {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    return await prisma.message.create({
      data: {
        title,
        content,
      },
    });
  } catch (error) {
    console.log("Error create message: ", error);
    return {};
  }
};

export const updateMessage: UpdateMessage = async (messageID, _, formData) => {
  try {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    return await prisma.message.update({
      where: {
        id: Number(messageID),
      },
      data: {
        title,
        content,
      },
    });
  } catch (error) {
    console.log("Error update message: ", error);
    return;
  }
};

export const deleteMessage: DeleteMessage = async (messageID) => {
  try {
    return await prisma.message.delete({
      where: {
        id: Number(messageID),
      },
    });
  } catch (error) {
    console.log("Error remove message: ", error);
    return {};
  }
};
