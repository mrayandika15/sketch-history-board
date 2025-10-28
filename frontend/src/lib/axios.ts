import axios, { AxiosError } from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

type ApiResponse<T = unknown> = {
  success: boolean;
  status: number;
  message: string;
  data: T | null;
  meta: {
    timestamp: string;
    version: string;
    pagination?: unknown;
    filters?: Record<string, unknown>;
  };
  errors?: Array<{ code: string; message: string; details?: unknown }>;
};

function isApiResponse(x: any): x is ApiResponse<any> {
  return (
    x &&
    typeof x === "object" &&
    "success" in x &&
    "status" in x &&
    "meta" in x &&
    "message" in x
  );
}

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const http: AxiosInstance = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Request interceptor: ensure JSON headers; add hooks for future auth
http.interceptors.request.use((config) => {
  config.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(config.headers || {}),
  } as any;
  return config;
});

// Response interceptor: unwrap ApiResponse to return .data directly
http.interceptors.response.use(
  (response: AxiosResponse) => {
    const payload = response.data;
    if (isApiResponse(payload)) {
      return payload.data;
    }
    return payload;
  },
  (error: AxiosError) => {
    if (error.response) {
      const payload: any = error.response.data;
      if (isApiResponse(payload)) {
        return Promise.reject({
          status: payload.status,
          message: payload.message,
          errors: payload.errors ?? [],
        });
      }
      return Promise.reject({
        status: error.response.status,
        message: payload?.message || error.message || "Request error",
      });
    }
    return Promise.reject({
      status: 0,
      message: error.message || "Network error",
    });
  }
);

export async function get<T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  return http.get(url, config).then((res) => res as unknown as T);
}

export async function post<T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> {
  return http.post(url, data, config).then((res) => res as unknown as T);
}

export async function del<T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> {
  const cfg: AxiosRequestConfig = { ...(config || {}), data };
  return http.delete(url, cfg).then((res) => res as unknown as T);
}
