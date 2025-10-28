export interface PaginationMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export type FilterMeta = Record<
  string,
  string | number | boolean | null | undefined
>;

export interface ResponseMeta {
  timestamp: string;
  version: string;
  pagination?: PaginationMeta;
  filters?: FilterMeta;
}

export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  status: number;
  message: string;
  data: T | null;
  meta: ResponseMeta;
  errors?: ApiError[];
}
