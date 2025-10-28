export const SKETCH_HISTORY = {
  GET_LIST: "SKETCH_HISTORY.GET_LIST",
} as const;

// Optional: keep compatibility with provided example
export const MEMBERSHIP = {
  GET_INFO: "MEMBERSHIP.GET_INFO",
} as const;

// A lightweight override type to merge into query options returned by queryOptions()
export type QueryConfig<T extends object> = Partial<T>;
