export enum CommonSortByColumn {
  name = "name",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  deletedAt = "deletedAt",
}
export interface ApiResponse<T> {
  data: T;
  error?: { message: string };
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Pageable {
  sort: Sort;
  offset: number;
  paged: boolean;
  pageSize: number;
  unpaged: boolean;
  pageNumber: number;
}

export interface DataListApiResponse<T> extends ApiResponse<T> {
  data: T[];
  page: number;
  total: number;
  per_page: number;
  error?: { message: string };
}
