import { apiClient } from "@/lib/axios";
import { SKETCH_HISTORY, type QueryConfig } from "@/lib/react-query";
import type { SketchHistoryListResponse } from "@/types/sketch";
import { queryOptions, useQuery } from "@tanstack/react-query";

export type UseSketchHistoryQueryOptions = {
  queryConfig?: QueryConfig<typeof getSketchHistoryQueryOption>;
};

export const getSketchHistoryList =
  async (): Promise<SketchHistoryListResponse> => {
    return apiClient.get<SketchHistoryListResponse>("/sketch-history");
  };

export const getSketchHistoryQueryOption = () => {
  return queryOptions({
    queryKey: [SKETCH_HISTORY.GET_LIST],
    queryFn: getSketchHistoryList,
  });
};

export const useSketchHistoryQuery = ({
  queryConfig,
}: UseSketchHistoryQueryOptions = {}) => {
  return useQuery({
    ...getSketchHistoryQueryOption(),
    ...queryConfig,
  });
};
