export type ControlPaginationFn = (page?: number) => void;

export type PaginateData<T> = {
  items?: T[];
  page: number;
};

export type PaginateDataControl<T> = PaginateData<T> & {
  controlPaginationFn?: ControlPaginationFn;
};
