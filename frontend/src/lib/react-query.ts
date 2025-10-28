import type { UseMutationOptions } from "@tanstack/react-query";

export const SKETCH_HISTORY = {
  GET_LIST: "SKETCH_HISTORY.GET_LIST",
  DELETE: "SKETCH_HISTORY.DELETE",
  DETAIL: "SKETCH_HISTORY.DETAIL",
  CREATE: "SKETCH_HISTORY.CREATE",
} as const;
// A lightweight override type to merge into query options returned by queryOptions()

export type ApiFnReturnType<FnType extends (...args: any) => Promise<any>> =
  Awaited<ReturnType<FnType>>;

export type QueryConfig<T extends (...args: any[]) => any> = Omit<
  ReturnType<T>,
  "queryKey" | "queryFn"
>;

export type MutationConfig<
  MutationFnType extends (...args: any) => Promise<any>
> = UseMutationOptions<
  ApiFnReturnType<MutationFnType>,
  Error,
  Parameters<MutationFnType>[0]
>;
