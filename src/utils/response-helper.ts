import { ApiResponse } from './types/response.type';

export const apiResponse = <T>(message: string, data?: T): ApiResponse<T> => ({
  message,
  data,
});
