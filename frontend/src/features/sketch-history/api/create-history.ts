import { apiClient } from "@/lib/axios";
import { SKETCH_HISTORY, type MutationConfig } from "@/lib/react-query";
import type { SketchHistory } from "@/types/sketch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CanvasPath } from "react-sketch-canvas";
import { toast } from "sonner";

export type CreateSketchHistoryInput = {
  name: string;
  data: CanvasPath[];
};

export const createSketchHistory = async (
  payload: CreateSketchHistoryInput
): Promise<SketchHistory> => {
  return apiClient.post<SketchHistory>("/sketch-history", payload);
};

export const useCreateSketchHistoryMutation = (
  config: MutationConfig<typeof createSketchHistory>
) => {
  const qc = useQueryClient();

  const { onSuccess, ...restConfig } = config || {};

  return useMutation({
    mutationKey: [SKETCH_HISTORY.CREATE],
    mutationFn: createSketchHistory,
    onSuccess: async (...args) => {
      await qc.invalidateQueries({ queryKey: [SKETCH_HISTORY.GET_LIST] });
      toast.success("Version saved successfully");
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
