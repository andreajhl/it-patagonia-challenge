export interface CustomError extends Error {
  response: {
    status: number;
    data?: Record<string, any>;
  };
}

export interface CreateCustomError {
  (
    message: string,
    statudCode: number,
    data?: Record<string, any>,
  ): CustomError;
}
