"use client";

import {
  useUpdateManagerQuery,
  useUpdatePhotoAndThemeQuery,
} from "../api/manager.api";

export const useManagerMutation = () => {
  const { isPending, error, data, isSuccess, mutateAsync } =
    useUpdateManagerQuery();

  return {
    mutateAsync,
    isPending,
    error,
    isSuccess,
    data,
  };
};

export const useManagerProfileMutation = () => {
  const { isPending, error, data, isSuccess, mutateAsync } =
    useUpdatePhotoAndThemeQuery();

  return {
    mutateAsync,
    isPending,
    error,
    isSuccess,
    data,
  };
};
