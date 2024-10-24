"use client";

import {
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
} from "../api/service.api";

export const useServiceMutation = () => {
  const {
    isPending: isDeletePending,
    error: deleteError,
    data: deleteData,
    isSuccess: isDeleteSuccess,
    mutateAsync: deleteMutateAsync,
  } = useDeleteServiceMutation();

  const {
    isPending: isUpdatePending,
    error: updateError,
    data: updateData,
    isSuccess: isUpdateSuccess,
    mutateAsync: updateMutateAsync,
  } = useUpdateServiceMutation();

  const {
    isPending: isCreatePending,
    error: createError,
    data: createData,
    isSuccess: isCreateSuccess,
    mutateAsync: createMutateAsync,
  } = useCreateServiceMutation();

  return {
    delete: {
      mutateAsync: deleteMutateAsync,
      isPending: isDeletePending,
      error: deleteError,
      isSuccess: isDeleteSuccess,
      data: deleteData,
    },
    update: {
      mutateAsync: updateMutateAsync,
      isPending: isUpdatePending,
      error: updateError,
      isSuccess: isUpdateSuccess,
      data: updateData,
    },
    create: {
      mutateAsync: createMutateAsync,
      isPending: isCreatePending,
      error: createError,
      isSuccess: isCreateSuccess,
      data: createData,
    },
  };
};
