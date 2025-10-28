import type { UseMutationOptions } from "@tanstack/react-query";

export const SKETCH_HISTORY = {
  GET_LIST: "SKETCH_HISTORY.GET_LIST",
  DELETE: "SKETCH_HISTORY.DELETE",
  DETAIL: "SKETCH_HISTORY.DETAIL",
  CREATE: "SKETCH_HISTORY.CREATE",
} as const;
// A lightweight override type to merge into query options returned by queryOptions()

export type QueryConfig<T extends (...args: unknown[]) => unknown> = Omit<
  ReturnType<T>,
  "queryKey" | "queryFn"
>;

export type ApiFnReturnType<
  FnType extends (...args: unknown[]) => Promise<unknown>
> = Awaited<ReturnType<FnType>>;

export type MutationConfig<
  MutationFnType extends (...args: unknown[]) => Promise<unknown>
> = UseMutationOptions<
  ApiFnReturnType<MutationFnType>,
  Error,
  Parameters<MutationFnType>[0]
>;
