export type PageDirection = 'prev' | 'next';

export type FnPaginationNavigate = (page?: number) => void;

export interface PaginationData<T> {
  data?: T[];
  page: number;
}
export interface PaginationDataControl<T> extends PaginationData<T> {
  controlPaginationFn?: FnPaginationNavigate;
}
