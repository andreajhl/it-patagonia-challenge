import { CreateCustomError, CustomError } from "./index.d";

export const createCustomError: CreateCustomError = (
  message,
  statusCode,
  data,
) => {
  const error = new Error(message) as CustomError;
  error.response = {
    status: statusCode,
    ...(data && { data }),
  };

  return error;
};
