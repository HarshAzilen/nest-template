import { InfinityPaginationResultType, PaginatedResult } from './types/infinity-pagination-result.type';
import { IPaginationOptions } from './types/pagination-options';

export const infinityPagination = <T>(data: T[], options: IPaginationOptions): InfinityPaginationResultType<T> => {
  return {
    records: data,
    pagination: {
      page: options.page,
      limit: options.limit,
      count: options.count,
      hasNextPage: options.count > options.limit * options.page,
    },
  };
};

export const emptyPaginatedResult = <T>(): PaginatedResult<T> => {
  return {
    data: [],
    count: 0,
  };
};
