"use client";

import {
  useChangePasswordQuery,
  useUpdateManagerQuery,
  useUpdatePhotoAndThemeQuery,
} from "@/app/(private)/detalhes/api/manager.api";

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

export const useChangePasswordMutation = () => {
  const { isPending, error, data, isSuccess, mutateAsync } =
    useChangePasswordQuery();

  return {
    mutateAsync,
    isPending,
    error,
    isSuccess,
    data,
  };
};
