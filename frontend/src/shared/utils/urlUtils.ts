export const useGetPublicAssets = (path: string): string => {
  const domain = process.env.NEXT_PUBLIC_API_BASE_URL;
  return `${domain}/${path}`;
};
