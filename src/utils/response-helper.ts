import { ApiResponse } from './types/response.type';

export const apiResponse = <T>(statusCode: number, message: string, data?: T): ApiResponse<T> => ({
  statusCode,
  message,
  data,
});
