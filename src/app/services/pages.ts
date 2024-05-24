export interface Page<T> {
  pageNr: number;
  pageSize: number;
  totalPages: number;
  values: T[];
}
