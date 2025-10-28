import { apiClient } from "@/lib/axios";
import { type MutationConfig } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";

export type UploadFileInput = {
  file: File | Blob;
  /** Optional explicit filename; defaults to File.name if present */
  filename?: string;
};

// Uploads a file using multipart/form-data and returns the relative path string
export const uploadFile = async (payload: UploadFileInput): Promise<string> => {
  const form = new FormData();
  // The backend expects field name 'file'
  // If Blob without name, pass provided filename or fallback
  const fileToSend =
    payload.file instanceof File
      ? payload.file
      : new File([payload.file], payload.filename || "upload.bin");

  form.append("file", fileToSend);

  return apiClient.post<string>("/file-upload", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const useFileUploadMutation = (
  config: MutationConfig<typeof uploadFile> = {} as any
) => {
  const { onSuccess, ...restConfig } = config || {};

  return useMutation({
    mutationFn: uploadFile,
    // mutationKey is optional; omit to avoid polluting global keys
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};

export type DeleteFileInput = { path: string };

export const deleteFileUpload = async (
  payload: DeleteFileInput
): Promise<{ deleted: boolean }> => {
  return apiClient.delete<{ deleted: boolean }>("/file-upload", payload);
};

export const useFileDeleteMutation = (
  config: MutationConfig<typeof deleteFileUpload> = {} as any
) => {
  const { onSuccess, ...restConfig } = config || {};

  return useMutation({
    mutationFn: deleteFileUpload,
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};