import { apiClient } from "@/lib/axios";
import { SKETCH_HISTORY, type MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export type DeleteSketchHistoryInput = {
  ids: number[];
};

export type DeleteSketchHistoryResult = {
  count: number;
};

export const deleteSketchHistory = async (
  payload: DeleteSketchHistoryInput
): Promise<DeleteSketchHistoryResult> => {
  return apiClient.delete<DeleteSketchHistoryResult>(
    "/sketch-history",
    payload
  );
};

export const useDeleteSketchHistoryMutation = (
  config: MutationConfig<typeof deleteSketchHistory> = {} as any
) => {
  const qc = useQueryClient();

  const { onSuccess, ...restConfig } = config || {};

  return useMutation({
    mutationKey: [SKETCH_HISTORY.DELETE],
    mutationFn: deleteSketchHistory,
    onSuccess: async (...args) => {
      await qc.invalidateQueries({ queryKey: [SKETCH_HISTORY.GET_LIST] });
      toast.success(
        args[0].count
          ? `Deleted ${args[0].count} ${args[0].count > 1 ? "items" : "item"}`
          : "No items deleted"
      );
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
