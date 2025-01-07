"use client";

export const useGetPublicAssets = (path: string): string => {
  const domain = window.location.origin;

  return `${domain}/api/${path}`;
};
