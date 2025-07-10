import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// src/lib/apiRequest.ts

export async function apiRequest<T = any>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
  try {
    const response = await axios({
      method,
      url,
      data,
      headers: {
        "Content-Type": "application/json",
        ...(config?.headers || {}),
      },
      ...config,
    });

    return response;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "API request failed";
    throw new Error(message);
  }
}
