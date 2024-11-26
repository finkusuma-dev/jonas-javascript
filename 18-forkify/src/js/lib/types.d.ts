export type PageDirection = 'prev' | 'next';

export interface PaginationData<T> {
  data?: T[];
  page: number;
}
export interface PaginationDataControl<T> extends PaginationData<T> {
  controlPaginationFn?: (page?: number) => void;
}
