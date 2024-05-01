export type InfinityPaginationResultType<T> = Readonly<{
  records: T[];
  pagination: PaginationOptions;
}>;

export interface PaginationReponse<T> {
  message: string;
  data: {
    pagination: PaginationOptions;
    records: T[];
  };
}

export type PaginationOptions = {
  page: number;
  limit: number;
  count: number;
  hasNextPage: boolean;
};

export type PaginatedResult<T> = Readonly<{
  data: T[];
  count: number;
}>;
