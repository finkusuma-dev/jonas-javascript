export type PaginationNavigateFn = (page?: number) => void;

export type PaginationData<T> = {
  items?: T[];
  page: number;
};

export type PaginationDataControl<T> = PaginationData<T> & {
  paginationNavigateFn?: PaginationNavigateFn;
};
